require('app-module-path').addPath(require('app-root-path').toString());
const knex = require('knex')(require('knexfile'));
require('dotenv').config();
/**
 * Mysql Adapter Service
 */
class MysqlService {
  /**
   * @param {string} table - mysql table
   * @param {string} properties - Object details
   */
  async insertIntoTable(table, properties) {
    await knex(table).insert(properties);
    return properties;
  }
  /**
   * @param {string} table - mysql table
   * @param {fields} fields - object details
   */
  async getTableContents(table, fields) {
    return await knex.select(...fields,).from(table);
  }
  /**
   * @param {string} table - mysql table
   * @param {object} prop  - id of the object
   * @param {Array} fields - object details
   */
  async getTableRow(table, prop, fields) {
    return await knex.where(prop).select(...fields).first()
        .from(table);
  }
  /**
   * @param {string} table - mysql table
   * @param {object} id - id of the object
   */
  async deleteRow(table, id) {
    return await knex(table).where(id).del();
  }
}

module.exports = MysqlService;
