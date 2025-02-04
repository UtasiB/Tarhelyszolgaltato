const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/database.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');


// create new storage
router.post('/create-database', databaseController.create_database);

// update storage
router.patch('/create-user',  databaseController.create_user);

// delete storage
router.delete('/grant-privilege',  databaseController.grant_privilege);

module.exports = router;