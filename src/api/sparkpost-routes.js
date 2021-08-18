const { sendErrorResponse } = require('./error-response');
const { DomainError, errorType } = require('../core/custom-error');
const { createGetByName, createInsert, createUpdateByName } = require('../spark-posts/use-cases');
const _ = require('lodash');

module.exports.register = (app, repo) => {
    const getByName = createGetByName(repo);
    const insert = createInsert(repo);
    const update = createUpdateByName(repo);

    app.get('/sparkpost/:name', async (req, res) => {
        try {
            if (_.isEmpty(req.params.name)) 
                throw new DomainError('name is required', errorType.InvalidParameters);
            
            return res.send(await getByName(req.params.name));
        } catch (err) {
            return sendErrorResponse(res, err.message, err, err.stack);
        }
    });

    app.post('/sparkpost', async (req, res) => {
        try {
            const reqObj = _.pick(req.body, ['name', 'age']);

            if (_.isEmpty(reqObj.name)) 
                throw new DomainError('name is required', errorType.InvalidParameters);
            if (!_.isInteger(reqObj.age))
                throw new DomainError('age is invalid', errorType.InvalidParameters);
            
            return res.send(await insert(reqObj));
        } catch (err) {
            return sendErrorResponse(res, err.message, err, err.stack);
        }
    });

    app.put('/sparkpost', async (req, res) => {
        try {
            const reqObj = _.pick(req.body, ['name', 'age']);

            if (_.isEmpty(reqObj.name)) 
                throw new DomainError('name is required', errorType.InvalidParameters);
            if (!_.isInteger(reqObj.age))
                throw new DomainError('age is invalid', errorType.InvalidParameters);
            
            return res.send(await update(reqObj.name, reqObj));
        } catch (err) {
            return sendErrorResponse(res, err.message, err, err.stack);
        }
    });
}
