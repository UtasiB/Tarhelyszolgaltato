/**
 *  Definiáljuk a USER adatbázis modellt
 */
const { DataTypes } = require('sequelize');
const db = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { resolve } = require('path');

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    domain: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = { User };