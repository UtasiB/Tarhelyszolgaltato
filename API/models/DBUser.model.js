/**
 *  Definiáljuk a Storage adatbázis modellt
 */
const { DataTypes } = require('sequelize');
const db = require('../config/database');

const DBUser = db.define('DBUser', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    }

});

module.exports = { DBUser };