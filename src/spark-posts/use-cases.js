const { DomainError, errorType } = require("../core/custom-error");
const { makeSparkPost } = require("./spark-post");

const createGetByName = ({repo}) => {
    if (!repo) {
        throw new DomainError('SparkPost getByName repository not set', errorType.ConfigError);
    }

    return async (name) => await repo.getByName(name);
}

const createUpdateByName = ({repo}) => {
    if (!repo || !repo.getByName) {
        throw new DomainError('SparkPost repository not set', errorType.ConfigError);
    }

    return async (name, { age }) => await repo.updateByName(name, makeSparkPost({ name, age }));
}

const createInsert = ({ repo }) => {
    if (!repo || !repo.getByName) {
        throw new DomainError('SparkPost repository not set', errorType.ConfigError);
    }

    return async ({ name, age }) => await repo.insert(makeSparkPost({ name, age }));
}

module.exports = { createGetByName, createInsert, createUpdateByName };