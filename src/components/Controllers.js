'use strict';
require('app-module-path').addPath(require('app-root-path').toString());

const {getSupplyList, getSupplyById, addNewSupply,
  deleteSupplyById, getRatingById,
  addNewRating} = require('src/components/supplies/SuppliesController');

module.exports = {
  getSupplyList,
  getSupplyById,
  addNewSupply,
  deleteSupplyById,
  addNewRating,
  getRatingById,
};
