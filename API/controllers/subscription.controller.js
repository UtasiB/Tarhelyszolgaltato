const subscriptionService = require('../services/subscription.service');

exports.create = async (req, res, next) => {
   try{
    const { date} = req.body;
    if(!date){
        return res.status(400).json({success: false, message: 'Hiányzó adatok!'});
    }
    const subscription = await subscriptionService.createSubscription(date);
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




