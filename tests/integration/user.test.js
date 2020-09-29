const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/database');
const knexCleaner = require('knex-cleaner');

describe('User Controller Operations', () => {

    beforeAll(async () => {
        await knex.migrate.rollback(all = true);
        await knex.migrate.latest();
    });

    beforeEach(async () => await knexCleaner.clean(knex, {
        mode: 'truncate',
        ignoreTables: ['knex_migrations', 'knex_migrations_lock']
    }));

    it('should create a new user entry', async () => {
        const user = { username: 'Dummy' };

        const response = await request(app)
            .post('/users')
            .send(user);

        expect(response.status).toBe(201);
    });

    it('should return a list of registered users', async () => {
        // const user = { username: 'Dummy' };
        const response = await request(app)
            .get('/users');
        expect(response.status).toBe(200);
    });

    it('should not create if username is not unique', async () => {
        const user = { username: 'Dummy' };

        let response = await request(app)
            .post('/users')
            .send(user);

        response = await request(app)
            .post('/users')
            .send(user);

        expect(response.status).toBe(409);
    });

    it('should update username', async () => {
        const user = { username: 'Dummy' };

        let response = await request(app)
            .post('/users')
            .send(user);

        response = await request(app)
            .put('/users/1')
            .send({ username: 'Mummy' });

        expect(response.status).toBe(200);
    });

    it('should delete a given user', async () => {
        const user = { username: 'Dummy' };

        let response = await request(app)
            .post('/users')
            .send(user);

        response = await request(app)
            .delete('/users/1')

        expect(response.status).toBe(200);
    });

    afterAll(async (done) => {
        await knex.migrate.rollback(all = true);
        await knex.destroy();
        done();
    });
})