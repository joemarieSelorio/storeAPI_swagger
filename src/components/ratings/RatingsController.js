require('app-module-path').addPath(require('app-root-path').toString());
const {pick} = require('lodash');
const {createNewRating} = require('src/components/ratings/RatingsRepository');
const HttpError = require('src/responses/HttpError');
const {HttpSuccess, respond} = require('src/utilities/WriterUtil');

/**
 * @param {*} req - request to the server
 * @param {*} res - response of the server
 * @param {*} next - next function to be called
 */
async function addNewRating(req, res, next) {
  const {user, rating, supplyId} = req.body;
  try {
    const newRating = createNewRating(user, rating, supplyId);
    respond(res, new HttpSuccess(200, 'Success', {datails: pick(newRating,
        ['id', 'name', 'description', 'imageUrl', 'quantity'])}));
    return next();
  } catch (error) {
    return next(new HttpError(500, 9999, error.message));
  }
}
module.exports = {
  addNewRating,
};

