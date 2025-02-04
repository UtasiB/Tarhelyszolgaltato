/**
 *  Definiáljuk a Storage adatbázis modellt
 */
const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Database = db.define('Database', {
    dbname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

});

module.exports = { Database };