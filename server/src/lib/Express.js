const express = require('express');
const bodyParser = require('body-parser');
const routers = require('../routes');
const app = express();
const HttpStatus = require('http-status');
const validate = require('express-validation');
const APIError = require('./APIError');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', routers);

app.use((err, req, res, next) => {
  if (err instanceof validate.ValidationError) {
    const msg = err.errors.map(error => error.messages.join('.')).join(' and ');
    const e = new APIError(HttpStatus.BAD_REQUEST, `${msg}`);
    return next(e);
  } else if (!(err instanceof APIError)) {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const e = new APIError(status, err.message);
    return next(e);
  }
  return next(err);
});

module.exports = app;
