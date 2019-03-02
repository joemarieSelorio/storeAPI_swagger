'use strict';
require('app-module-path').addPath(require('app-root-path').toString());

const {getSupplyList, getSupplyById, addNewSupply,
  deleteSupplyById} = require('src/components/supplies/SuppliesController');
const {addNewRating} = require('src/components/ratings/RatingsController');

module.exports = {
  getSupplyList,
  getSupplyById,
  addNewSupply,
  deleteSupplyById,
  addNewRating,
};
