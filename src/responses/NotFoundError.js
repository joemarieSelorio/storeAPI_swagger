require('app-module-path').addPath(require('app-root-path').toString());

const HttpError = require('src/responses/HttpError');

/**
 * Class to provide uniform instance/formatting for not found error responses
 * @module NotFoundError
 */
class NotFoundError extends HttpError {
  /**
   * @constructor
   * @param {string} message - Custom error message
   */
  constructor(message = 'Not found error') {
    super(404, 9996, message);
  }
}

module.exports = NotFoundError;
