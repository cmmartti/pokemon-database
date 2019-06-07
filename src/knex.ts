import Knex from 'knex';

const postgres = {
    client: 'postgresql',
    connection: {
        database: 'graphql_pokeapi',
        user: 'root',
        password: 'pokeapi',
        port: 5432,
        host: 'localhost',
    },
    pool: {
        min: 2,
        max: 10,
    },
};

const sqlite = {
    client: 'sqlite3',
    connection: {
        filename: './db.sqlite3',
    },
    useNullAsDefault: true,
};

export const config = postgres;

export const knex = Knex(config);
