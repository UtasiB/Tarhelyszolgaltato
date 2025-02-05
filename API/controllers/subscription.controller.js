const subscriptionService = require('../services/subscription.service');

exports.create = async (req, res, next) => {
   try{
    const { date, userID, storageID} = req.body;
    if(!date || !userID || !storageID){
        return res.status(400).json({success: false, message: 'Hiányzó adatok!'});
    }
    const subscription = await subscriptionService.createSubscription(date, userID, storageID);
    res.status(201).json({success: true, subscription: subscription});
   }
    catch(err){
         next(err);
    }

    
}

exports.update= async (req, res, next) => {
    try{
        const id = req.params.id;
        const { date } = req.body;
        if(!date){
            return res.status(400).json({success: false, message: 'Hiányzó adatok!'});
        }
        const subscription = await subscriptionService.updateSubscription(id, date);
        res.status(200).json({success: true, subscription: subscription});
    }
    catch(err){
        next(err);
    }
}

exports.delete = async (req, res, next) => {
    try{
        const id = req.params.id;
        await subscription.deleteSubscription(id);
        res.status(200).json({success: true, message: 'Felhasználó törölve!'});
    }
    catch(err){
        next(err);
    }
}

exports.getAllSubscriptions = async (_req, res, next) => {
    try{
        const subscriptions = await subscriptionService.getAllSubscriptions();
        res.status(200).json({success: true, subscriptions: subscriptions});
    }
    catch(err){
        next(err);
    }
}

exports.getSubscriptionByUserId = async (req, res, next) => {
    try{
        const userID = req.params.id;
        const subscription = await subscriptionService.getSubscriptionById(userID);
        res.status(200).json({success: true, subscription: subscription});

    }   
    catch(err){
        next(err);
    }
}




