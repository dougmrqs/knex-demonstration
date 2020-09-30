const request = require('supertest')
const app = require('../../src/app')
const knex = require('../../src/database');
const knexCleaner = require('knex-cleaner');


describe('User Controller Operations', () => {

    beforeEach(() => knexCleaner.clean(knex, {
        mode: 'truncate',
        restartIdentity: true,
        ignoreTables: ['knex_migrations', 'knex_migrations_lock']
    }).then(() => { }));

    afterAll(async (done) => {
        await knex.destroy();
    });

    describe('Create user', () => {
        it('should create a new user entry', async () => {
            const user = { username: 'Dummy' };

            const response = await request(app)
                .post('/users')
                .send(user);

            expect(response.status).toBe(201);
        });

        it('should not create if username is not unique', async () => {
            const user = { username: 'Dummy' };

            await request(app)
                .post('/users')
                .send(user);

            const response = await request(app)
                .post('/users')
                .send(user);

            expect(response.status).toBe(409);
        });
    });

    describe('User listing', () => {
        it('should return a list of registered users', async () => {
            const response = await request(app)
                .get('/users');

            expect(response.status).toBe(200);
        });
    });

    describe('User updating', () => {
        it('should update username', async () => {
            const user = { username: 'Dummy' };

            await request(app)
                .post('/users')
                .send(user);

            const response = await request(app)
                .put('/users/1')
                .send({ username: 'Mummy' });

            expect(response.status).toBe(200);
        });
    });

    describe('User deleting', () => {
        it('should delete a given user', async () => {
            const user = { username: 'Dummy' };

            await request(app)
                .post('/users')
                .send(user);

            const response = await request(app)
                .delete('/users/1')

            expect(response.status).toBe(200);
        });
    });
});