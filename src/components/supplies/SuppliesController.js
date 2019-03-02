require('app-module-path').addPath(require('app-root-path').toString());
const {map, pick} = require('lodash');
const {createNewSupply, supplyList, getsupply, deleteSupply}
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
  const {id} = req.params;
  try {
    const supply = await getsupply({id});
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
 * @param {*} next  - next function to be called
 */
async function addNewSupply(req, res, next) {
  const {name, description, imageUrl, quantity} = req.params;
  try {
    const newSupply = await createNewSupply(name,
        description, imageUrl, quantity);
    res.locals.resObj = new HttpSuccess(200, 'Sucessfully added new Supply',
        {datails: pick(newSupply,
            ['name', 'description', 'imageUrl', 'quantity'])});
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
  const {id} = req.params.id;
  try {
    const removedSupply = await deleteSupply(id);
    if (!removedSupply) {
      return next(new HttpNotFoundError('Supply not found'));
    }
    res.locals.resObj = new HttpSuccess(200, 'deleted!');
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
};

