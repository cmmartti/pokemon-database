import fs from 'fs';
import csv from 'fast-csv';
import ProgressBar from 'progress';

import {tables, Table} from './tables';
import {knex} from './knex';

try {
    main();
} catch (e) {
    console.error(e);
    process.exit(1);
}

function error(...toLog) {
    console.error('Error:', ...toLog);
    process.exit(1);
}

// prettier-ignore
const availableTypes = ['string', 'integer', 'bigInteger', 'boolean', 'text', 'float', 'decimal', 'data', 'datetime', 'time', 'timestamp', 'binary', 'enum', 'enu', 'json', 'jsonb', 'uuid'];
// prettier-ignore
const stringTags = ['official', 'markdown', 'plaintext', 'latex', 'ripped'];

async function createTable({name, comment, columns}: Table) {
    await knex.schema.createTable(name, table => {
        if (comment) {
            table.comment(comment.replace(/'/g, "''"));
        }
        if (columns) {
            const primaryKeys: string[] = [];

            for (const [colName, attr] of Object.entries(columns)) {
                // Check that only one data type was specified
                const types = availableTypes.filter(type => !!attr[type]);
                if (types.length === 0) {
                    error(`${name}.${colName} does not have a type.`);
                } else if (types.length > 1) {
                    error(`${name}.${colName} cannot have multiple types: ${types}.`);
                }

                const typeName = types[0];
                const value = attr[typeName];
                const typeOptions = Array.isArray(value) ? value : [];

                // The actual column
                const column = table[typeName](colName, ...typeOptions);

                const {references, notNull, unique, index, primary, comment = ''} = attr;
                if (notNull) column.notNullable();
                if (index) column.index();
                if (unique) column.unique();
                if (references) column.references(references);
                if (primary) primaryKeys.push(colName); // Add to the list of primary keys

                const tags = stringTags.filter(tag => !!attr[tag]);
                if (tags || comment)
                    column.comment(
                        `${comment.replace(/'/g, "''")}${comment ? ' ' : ''}[${tags.join(
                            ', '
                        )}]`
                    );
            }

            // Set the primary keys
            if (primaryKeys.length > 0) table.primary(primaryKeys);
        }
    });
}

async function main() {
    process.stdout.write('Dropping tables (if they exist)...');
    for (const table of [...tables].reverse()) {
        const exists = await knex.schema.hasTable(table.name);
        if (exists) await knex.schema.dropTable(table.name);
    }
    process.stdout.write(' OK\n');

    process.stdout.write('Creating tables...');
    for (const table of tables) {
        try {
            await createTable(table);
        } catch (e) {
            error(e);
        }
    }
    process.stdout.write(' OK\n');

    process.stdout.write('Inserting data into tables...\n');
    for (const table of tables) {
        await insertRows(table);
    }

    process.stdout.write('done\n');
    process.exit(0);
}

async function insertRows({name, columns}: Table) {
    const filepath = `./data/${name}.csv`;
    const formattedFile = `${name}.csv `.padEnd(40, '—');

    // String values that contain newlines skew this value somewhat, but no matter
    const lines = await countFileLines(filepath);

    // https://github.com/visionmedia/node-progress
    const bar = new ProgressBar(
        `   ${formattedFile}→ [:bar] :current/:total rows (:eta s remaining)`,
        {
            complete: '=',
            incomplete: ' ',
            clear: true,
            width: 20,
            total: lines - 1, // don't count headernode
        }
    );
    bar.tick(0);

    return new Promise(resolve => {
        const csvStream = csv.fromPath(filepath, {
            headers: true,
            ignoreEmpty: true,
        });

        const totalColumns = Object.keys(columns).length;

        // Use a batch size that won't run into SQLite's 999 variable limit
        const batchSize = Math.floor(999 / totalColumns);
        // const batchSize = 1000;

        type CsvRow = {
            [rowName: string]: any;
        };

        let batch: CsvRow[] = [];
        let i = 0;
        csvStream.on('data', async row => {
            i++;

            const fields = Object.keys(row).length;
            if (totalColumns !== fields) {
                error(
                    `Fields in row ${i} of '${filepath}' do not match up with table columns (${fields} fields in file, ${totalColumns} columns in table)`
                );
            }

            const transformedRow = {};
            for (const [name, attr] of Object.entries(columns)) {
                if (!(name in row)) {
                    error(`File '${filepath}' is missing column '${name}'.`);
                }

                const value = row[name];
                // Empty strings in nullable fields really mean null
                if (!attr.notNull && value === '') {
                    transformedRow[name] = null;
                }
                // Booleans are stored in CSV files as 0/1; they need to be true/false
                else if (attr.boolean) {
                    transformedRow[name] = value == 1;
                }
                // Otherwise, keep as a string
                else transformedRow[name] = value;
            }
            batch.push(transformedRow);

            // TODO: Defer the insertion of rows that contain fields that refer to
            // another row in the same table until after that row has been inserted.
            // Not a problem right now because CSV files are ordered so this doesn't
            // happen, but it might present a problem in the future.
            // Currently, the only self-referential table is pokemon_species.

            // Insert a full batch
            if (batch.length === batchSize) {
                csvStream.pause(); // pause the stream to avoid running out of memory
                await knex.batchInsert(name, batch, batch.length).catch(e => error(e));
                bar.tick(batch.length);
                batch = [];
                csvStream.resume();
            }
        });
        csvStream.on('end', async () => {
            // Insert the last partial batch, if there is one
            if (batch.length > 0 && batch.length < batchSize) {
                await knex.batchInsert(name, batch, batchSize).catch(e => error(e));
                bar.tick(batch.length);
            }

            // Make sure the progress bar goes to 100%
            bar.tick(lines);

            console.log(`   ${formattedFile}→ OK (${i} rows)`);
            resolve();
        });
    });
}

function countFileLines(filepath): Promise<number> {
    return new Promise((resolve, reject) => {
        let lineCount = 0;
        fs.createReadStream(filepath)
            .on('data', buffer => {
                let idx = -1;
                lineCount--; // Because the loop will run once for idx = -1
                do {
                    idx = buffer.indexOf(10, idx + 1);
                    lineCount++;
                } while (idx !== -1);
            })
            .on('end', () => resolve(lineCount))
            .on('error', reject);
    });
}
