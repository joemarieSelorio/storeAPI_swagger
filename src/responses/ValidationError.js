require('app-module-path').addPath(require('app-root-path').toString());

const HttpError = require('api/responses/HttpError');
const {compact, map} = require('lodash');

/**
 * Class to provide uniform instance/formatting for validation error responses
 * @module ValidationError
 */
class ValidationError extends HttpError {
  /**
   * @constructor
   * @param {string} message - Custom error message
   * @param {arrray} errorArr - Joi validation errors array
   */
  constructor(message = 'Validation error', errorArr) {
    super(400, 9997, message);

    if (errorArr) {
      this.errors = compact(map(errorArr, (obj) => {
        return {
          [obj.context.key]: obj.message,
        };
      }));
    }
  }
}

module.exports = ValidationError;
