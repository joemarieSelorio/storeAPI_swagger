require('app-module-path').addPath(require('app-root-path').toString());

/**
 * @param {*} req - request to the server
 * @param {*} res - response of the server
 * @param {*} next - next function to be called
 */
async function getAllSupplies(req, res, next) {
  res.send({getAllSupplies: 'getAllSupplies'});
}
/**
 * @param {*} req - request to the server
 * @param {*} res - response of the server
 * @param {*} next - next function to be called
 */
async function getSupplyById(req, res, next) {
  res.send({getSupplyById: 'getSupplyById'});
}
/**
 * @param {*} req - request to the server
 * @param {*} res - response of the server
 * @param {*} next - next function to be called
 */
async function addNewSupply(req, res, next) {
  res.send({addNewSupply: 'addNewSupply'});
}

/**
 * @param {*} req - request to the server
 * @param {*} res - response of the server
 * @param {*} next - next function to be called
 */
async function deleteSupplyById(req, res, next) {
  res.send({deleteSupplyById: 'deleteSupplyById'});
}

module.exports = {
  getAllSupplies,
  getSupplyById,
  addNewSupply,
  deleteSupplyById,
};

