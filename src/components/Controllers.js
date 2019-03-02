'use strict';
require('app-module-path').addPath(require('app-root-path').toString());

const {getAllSupplies, getSupplyById, deleteSupplyById,
  addNewSupply} = require('src/components/supplies/SuppliesController');
const {addNewRating} = require('src/components/ratings/RatingsController');

module.exports = {
  getAllSupplies,
  getSupplyById,
  addNewSupply,
  deleteSupplyById,
  addNewRating,
};
