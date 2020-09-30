const knex = require('../database')

module.exports = {
    async index(req, res) {
        results = await knex('users')
            .where('deleted_at', null);
        return res.json(results);
    },

    async create(req, res, next) {
        try {
            const { username } = req.body;
            await knex('users').insert({ username });
            return res.status(201).send();
        }
        catch (error) {
            if (error.code === '23505') {
                error.status = 409
            }
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { username } = req.body;
            await knex('users')
                .update({ username })
                .where({ id });
            return res.sendStatus(200);
        }
        catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            // NOTE:
            // This delete route only 'soft deletes' the user. It means it just marks the user as
            // deleted, instead of removing it from the table. To hard delete it, method .del()
            // shall be applied.
            await knex('users')
                .where({ id })
                .update('deleted_at', new Date());
            return res.sendStatus(200);
        }
        catch (error) {
            next(error);
        }
    }
};