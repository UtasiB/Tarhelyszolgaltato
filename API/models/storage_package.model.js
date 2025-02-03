/**
 *  Definiáljuk a Storage adatbázis modellt
 */
const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Storage = db.define('Storage', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = { Storage };