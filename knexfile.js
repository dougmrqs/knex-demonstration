// Update with your config settings.
require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? '.env.test' : '.env'
});

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    },
    seeds: {
      directory: `${__dirname}/src/database/seeds`
    }
  },
  onUpdateTrigger(table) {
    return `
      CREATE TRIGGER ${table}_updated_at
      BEFORE UPDATE ON ${table}
      FOR EACH ROW
      EXECUTE PROCEDURE on_update_timestamp();
    `
  }
};
