'use strict';

require('app-module-path').addPath(require('app-root-path').toString());

const HttpError = require('./HttpError');
const {compact, map} = require('lodash');

/**
 * Class to provide uniform instance/formatting for validation error responses
 * @module ValidationError
 */
class ValidationError extends HttpError {
  /**
   * @constructor
   * @param {string} message - Custom error message
   * @param {arrray} errorArr - AJV validation errors array,
   * see https://github.com/epoberezkin/ajv#validation-errors
   */
  constructor(message = 'Validation error', errorArr) {
    super(new Date(), 400, 9997, message);
    if (errorArr) {
      this.errors = compact(map(errorArr, (obj) => {
        return {
          code: obj.code,
          message: obj.message,
          path: obj.path[0] || null,
        };
      }));
    }
  }
}

module.exports = ValidationError;
