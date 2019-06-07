# Pokémon Database



## Setup

### A. Building the database

Tested on Postgres and SQLite, but should work on any database that is supported by [Knex](https://knexjs.org/).

1. Open `src/knex.ts` and enter your database configuration.
2. Run `npm run build:db`.

### B. Generating TypeScript types

If you edit the database schema (`src/tables.ts` file), you will need to regenerate the TypeScript types using the `build:types` script. This script uses [schemats](https://github.com/SweetIQ/schemats), which only supports MySQL or Postgres databases.

Steps:

1. If you haven't already, build a Postgres or MySQL database in step A.
2. Run `npm run build:types`.
