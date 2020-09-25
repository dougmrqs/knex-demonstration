const { onUpdateTrigger } = require("../../../knexfile");

exports.up = async function (knex) {
    return knex.schema.createTable('projects', (table) => {
        table.increments('id');
        table.text('title');

        // relationship
        table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE');

        table.timestamp(true, true);
    }).then(() => knex.raw(onUpdateTrigger('projects')));
};

exports.down = async function (knex) {
    return knex.schema.dropTable('projects');
};
