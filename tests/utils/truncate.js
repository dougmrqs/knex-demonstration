const knex = require('../../src/database');
const knexCleaner = require('knex-cleaner');

module.exports = async () => {
    await knexCleaner.clean(knex).then(function () {
        // your database is now clean
    });
};