
require('app-module-path').addPath(require('app-root-path').toString());
const MysqlService = require('src/services/MysqlService');
require('dotenv').config();
const service = new MysqlService();

/**
 * @param {*} user - user who rates the supply
 * @param {*} rating - rating of the user
 * @param {*} supplyId - id of the supply
 */
const createNewRating = async (user, rating, supplyId) => {
  const data = {
    user,
    rating,
    supplyId,
  };
  try {
    return await service.insertIntoTable(process.env.RATINGS_TABLE, data);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @param {*} supplyId - id of the supply
 */
const deleteRating= async (supplyId) => {
  try {
    return await service.deleteRow(process.env.RATINGS_TABLE, supplyId);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createNewRating,
  deleteRating,
};
