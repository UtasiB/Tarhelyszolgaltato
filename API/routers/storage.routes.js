const express = require('express');
const router = express.Router();
const storageController = require('../controllers/storage.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');


// create new storage
router.post('/create', storageController.create);

// update storage
router.patch('/:id', authMiddleware, storageController.update);

// delete storage
router.delete('/:id',  storageController.delete);

// get all storages
router.get('/', storageController.getAllStorages);

// get storage by id
router.get('/:id', storageController.getStorageById);

module.exports = router;