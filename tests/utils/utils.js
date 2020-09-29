const knex = require('../../src/database');

knex.migrate.rollback({ all: true }).then(() => {console.log('done')});