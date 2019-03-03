require('app-module-path').addPath(require('app-root-path').toString());
const {map, pick} = require('lodash');
const {createNewSupply, supplyList, getsupply, getRating,
  deleteSupply, createNewRating, deleteRating}
  = require('src/components/supplies/SuppliesRepository');
const HttpError = require('src/responses/HttpError');
const HttpNotFoundError = require('src/responses/NotFoundError');
const {HttpSuccess, respond} = require('src/utilities/WriterUtil');
// const logger = require('src/utilities/Logger');
/**
 * @todo - retrieve list of all supplies in the database
 * @param {*} req - request to the server
 * @param {*} res - response fprom the server
 * @param {*} next  - next function to be called
 */
async function getSupplyList(req, res, next) {
  try {
    const supplies = await supplyList();
    const supplySummary = map(supplies, (row)=>{
      return {
        id: row.id,
        details: {
          id: row.id,
          name: row.name,
          description: row.description,
          imageUrl: row.imageUrl,
          quantity: row.quantity,
        },
      };
    });
    respond(res, new HttpSuccess(200, 'Success', supplySummary));
    return next();
  } catch (error) {
    return next(new HttpError(500, 9999, error.message));
  }
}
/**
 * @todo - retrieve specific supply in the database via id
 * @param {*} req - request to the server
 * @param {*} res - response from the server
 * @param {*} next  - next function to be called
 */
async function getSupplyById(req, res, next) {
  const {id} = req.swagger.params;
  try {
    const supply = await getsupply({id: id.value});
    if (!supply) {
      return next(new HttpNotFoundError('Supplies Not Found'));
    }
    respond(res, new HttpSuccess(200, 'Success', {datails: pick(supply,
        ['name', 'description', 'imageUrl', 'quantity'])}));
    return next();
  } catch (error) {
    return next(new HttpError(500, 9999, error.message));
  }
}

/**
 * @todo - add new supply to the database
 * @param {*} req - request to the server
 * @param {*} res - response from the server
 * @param {*} next  - nextcle function to be called
 */
async function addNewSupply(req, res, next) {
  const {name, description, imageUrl, quantity} = req.body;
  try {
    const newSupply = await createNewSupply(name,
        description, imageUrl, quantity);
    respond(res, new HttpSuccess(200, 'Success', {datails: pick(newSupply,
        ['id', 'name', 'description', 'imageUrl', 'quantity'])}));
    return next();
  } catch (error) {
    return next(new HttpError(500, 9999, error.message));
  }
}
/**
 * @todo - add new supply to the database
 * @param {*} req - request to the server
 * @param {*} res - response from the server
 * @param {*} next  - next function to be called
 */
async function deleteSupplyById(req, res, next) {
  const {id} = req.swagger.params;
  const supplyId = id;
  try {
    const supply = await getsupply({id: id.value});
    if (!supply) {
      return next(new HttpNotFoundError('Supply not found'));
    }
    await deleteRating({supplyId: supplyId.value});
    await deleteSupply({id: id.value});
    respond(res, new HttpSuccess(200, 'Successfully deleted the supply',
        {datails: pick(supply,
            ['name', 'description', 'imageUrl', 'quantity'])}));
    return next();
  } catch (error) {
    return next(new HttpError(500, 9999, error.message));
  }
}

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

/**
 * @todo - retrieve specific ratings in the database via supplyId
 * @param {*} req - request to the server
 * @param {*} res - response from the server
 * @param {*} next  - next function to be called
 */
async function getRatingById(req, res, next) {
  const {supplyId} = req.swagger.params;
  try {
    const ratings = await getRating({supplyId: supplyId.value});
    const ratingSummary = map(ratings, (row)=>{
      return {
        id: row.id,
        details: {
          user: row.user,
          rating: row.rating,
          supplyId: row.supplyId,
        },
      };
    });
    respond(res, new HttpSuccess(200, 'Success', ratingSummary));
    return next();
  } catch (error) {
    return next(new HttpError(500, 9999, error.message));
  }
}

module.exports = {
  getSupplyList,
  getSupplyById,
  addNewSupply,
  deleteSupplyById,
  addNewRating,
  getRatingById,
};

