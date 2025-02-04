/**
 * Ez gyűjti össze a különböző modulok útvonalait egy modulba
 */

const express = require('express');
const router = express.Router();

// importáljuk az egyes modulok útvonalait
const userRoutes = require('./user.routes');

const subscriptionRoutes = require('./subscription.routes');

const storageRoutes = require('./storage.routes');

const databaseRoutes = require('./database.routes');

// regisztráljuk az útvonalakat
router.use('/users', userRoutes);

router.use('/subscriptions', subscriptionRoutes);

router.use('/storages', storageRoutes);

router.use('/databases', databaseRoutes);



module.exports = router;
