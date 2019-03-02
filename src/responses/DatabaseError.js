require('app-module-path').addPath(require('app-root-path').toString());

const HttpError = require('api/responses/HttpError');

/**
 * Class to provide uniform instance/formatting for database error responses
 * @module DatabaseError
 */
class DatabaseError extends HttpError {
  /**
   * @constructor
   * @param {string} message - Custom error message
   */
  constructor(message = 'Database error') {
    super(500, 9995, message);
  }
}

module.exports = DatabaseError;
