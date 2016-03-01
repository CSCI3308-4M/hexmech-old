var HttpStatus = require('http-status-codes');

function httpError(code){
    err = new Error(HttpStatus.getStatusText(code));
    err.status = code;
    return err;
};

module.exports = httpError;
