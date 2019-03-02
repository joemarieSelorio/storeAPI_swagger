const {forEach} = require('lodash');

/**
 * Class to provide uniform instance/formatting for HTTP success responses
 * @module HttpSuccess
 */
class HttpSuccess {
  /**
   * @constructor
   * @param {number} status - HTTP status code
   * @param {string} message - Error description
   * @param {object} additionalData - Other data to be added in response
   */
  constructor(status = 200,
      message = 'Operation completed successfully',
      additionalData) {
    this.timestamp = new Date();
    this.status = status;
    this.message = message;

    const tempData = {};
    if (Array.isArray(additionalData)) {
      this.data = additionalData;
    } else if (typeof additionalData === 'object') {
      forEach(additionalData, (value, key) => {
        tempData[key] = value;
      });
      this.data = tempData;
    }
  }
}

module.exports = {
  HttpSuccess,
  respond: (res, data) => {
    res.status(data.status).json(data);
  },
};
