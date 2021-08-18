const { DomainError, errorType } = require("../core/custom-error")

const makeSparkPost = ({ name, age }) => {
    if (validate(name, age)) {
        return { name, age };
    }
}

const validate = (name, age) => {
    if (!name || name === '') throw new DomainError('name is invalid', errorType.InvalidParameters);
    if (!age || isNaN(age) || parseInt(age) < 0) throw new DomainError('age is invalid', errorType.InvalidParameters);

    return true;
}

module.exports = { makeSparkPost };