const { errorType } = require("../core/custom-error");

module.exports.sendErrorResponse = (res, message, error, stack) =>
    res.status(getHttpCode(error)).send({ message, error, stack });

function getHttpCode(err) {
    switch (err.domainErrorType) {
        case errorType.InvalidParameters:
            return 400;
        default:
            return 500;
    }
}