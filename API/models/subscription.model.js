/**
 *  Definiáljuk a Storage adatbázis modellt
 */
const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const Subscription = db.define('Subscription', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true
    },
    userID: {
        type: DataTypes.STRING,
        allowNull: true
    },
    storageID: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }

});

module.exports = { Subscription };