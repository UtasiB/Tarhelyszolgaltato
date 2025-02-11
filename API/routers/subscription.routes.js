const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');


// create new subscription
router.post('/create', subscriptionController.create);

// update subscription
router.patch('/:id', authMiddleware, subscriptionController.update);

// delete subscription
router.delete('/:id', authMiddleware, subscriptionController.delete);

// get all subscriptions
router.get('/', subscriptionController.getAllSubscriptions);



// get subscription by id
router.get('/:id', subscriptionController.getSubscriptionByUserId);



module.exports = router;