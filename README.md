## Knex usage demo

Here is a simple CRUD envolving two tables: _users_ and _projects_.
This project addresses _migrations_, _seeds_, _relationship_ between tables and some trigger functions written in PLPGSQL.

It is based on the Rocketseat's _Masterclass #13_ as seen on YouTube:
https://www.youtube.com/watch?v=U7GjS3FuSkA


### Knex cheat sheet

Create a timestamped migration
`npx knex migrate:make migration_name`
Run all migrations to the latest
`npx knex migrate:latest`
Rollback one migration (or all, with `--all`)
`npx knex migrate:rollback`
Create a seed
`npx knex seed:make seed_name`
Run all seeds (to run a single seed file, add `--specific file_name.js`)
`npx knex seed:run`