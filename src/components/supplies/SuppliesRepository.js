
require('app-module-path').addPath(require('app-root-path').toString());
const MysqlService = require('src/services/MysqlService');
require('dotenv').config();
const service = new MysqlService();

/**
 * @todo create new supply
 * @param {string} name - name of the supply
 * @param {string} description - description of the supply
 * @param {string} imageUrl - image URL of the supply
 * @param {integer} quantity - quantity of the supply
 */
const createNewSupply = async (name, description, imageUrl, quantity) => {
  const data = {
    name,
    description,
    imageUrl,
    quantity,
  };

  try {
    return await service.insertIntoTable(process.env.SUPPLIES_TABLE, data);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @todo - retrive all supplies in the database
 * @param {string} id - id of the object
 */
const supplyList = async () => {
  try {
    const fields = ['name', 'description', 'imageUrl', 'quantity'];
    return await service.getTableContents(process.env.SUPPLIES_TABLE, fields);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @todo - retrieve specific supply using its unique id
 * @param {*} id - id of the supply
 */
const getsupply = async (id) => {
  const fields = ['id', 'name', 'description', 'imageUrl', 'quantity'];
  try {
    return await service.getTableRow(process.env.SUPPLIES_TABLE, id, fields);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @todo - delete specific supply
 * @param {*} id - id of the supply
 */
const deleteSupply = async (id) => {
  try {
    return await service.deleteRow(process.env.SUPPLIES_TABLE, id);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @param {*} supplyId - id of the supply
 */
const getRating = async (supplyId) => {
  const fields = ['id', 'user', 'rating', 'supplyId'];
  try {
    return await service
        .getContents(supplyId, process.env.RATINGS_TABLE, fields);
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @todo create new supply
 * @param {string} user - user who rates the supply
 * @param {string} rating - ratings of the user
 * @param {string} supplyId - id of the supply
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
  createNewSupply,
  supplyList,
  getsupply,
  deleteSupply,
  getRating,
  createNewRating,
  deleteRating,
};

