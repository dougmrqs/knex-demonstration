const request = require('supertest');
const app = require('../../src/app');
const knex = require('../../src/database');
const knexCleaner = require('knex-cleaner');


describe('Project Controller Operations', () => {

    beforeEach(() => knexCleaner.clean(knex, {
        mode: 'truncate',
        restartIdentity: true,
        ignoreTables: ['knex_migrations', 'knex_migrations_lock']
    }).then(() => { }));

    afterAll(async (done) => {
        await knex.destroy();
    });

    describe('Project creation', () => {
        it('should create a new project entry', async () => {
            const user = { username: 'dummy' };

            let response = await request(app)
                .post('/users')
                .send(user);

            // console.log(`User creation status: ${response.status}`);
            expect(response.status).toBe(201);

            const query = knex('users')
                .where({ username: user.username })
                .select('users.id');

            const results = await query;
            // console.log(results);

            expect(results).toHaveLength(1);

            const project = {
                title: "Project",
                user_id: results[0].id
            };

            // console.log(project)
            response = await request(app)
                .post('/projects')
                .send(project);

            expect(response.status).toBe(201);
        });

        it('should not create a new project if it has no user_id', async () => {
            const project = {
                // user_id: 1,
                title: "Project"
            };
            const response = await request(app)
                .post('/projects')
                .send(project);

            expect(response.status).toBe(500);
        });
    });

    describe('Project listing', () => {
        it('should return a list of projects', async () => {
            const response = await request(app)
                .get('/projects');

            expect(response.status).toBe(200);
        });

        it('should return a list of projects of a given user', async () => {
            const user = { username: 'dummy' };

            let response = await request(app)
                .post('/users')
                .send(user);

            // console.log(`User creation status: ${response.status}`);
            expect(response.status).toBe(201);

            const query = knex('users')
                .where({ username: user.username })
                .select('users.id');

            const results = await query;
            // console.log(results);

            expect(results).toHaveLength(1);

            const project = {
                title: "Project",
                user_id: results[0].id
            };

            // console.log(project)
            response = await request(app)
                .post('/projects')
                .send(project);

            expect(response.status).toBe(201);

            response = await request(app)
                .get(`/projects?user_id=${results[0].id}`)

            expect(response.status).toBe(200);
        });
    });
});