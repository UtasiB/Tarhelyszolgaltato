/**
 *  Adatbázis kapcsolat felépítése Sequelize-al 
 */

const { Sequelize } = require('sequelize');
const config = require('./config');

const db = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        dialect: 'mysql',
        logging: config.db.logging
    }
)

module.exports = db;

