const { Subscription } = require('../models/subscription.model');
const { generateToken} = require('../utils/token');

exports.createSubscription = async (date, userID, storageID) => {
    const subscription = await Subscription.create({date, userID, storageID});
    return subscription;
}

exports.updateSubscription = async (id, date) => {
    const subscription = await Subscription.findByPk(id);
    if (!subscription) throw new Error('Felhasználó nem található!');

    subscription.date = date;

    return await subscription.save();
}

exports.deleteSubscription = async (id) => {
    const subscription = await Subscription.findByPk(id);
    if (!subscription) throw new Error('Felhasználó nem található!');

    return await subscription.destroy();
}

exports.getAllSubscriptions = async () => {
    return await Subscription.findAll();
}

exports.getSubscriptionById = async (userID) => {
    if(!userID){
        throw new Error('Hiányzó azonosító!');
    }
    return await Subscription.findOne({where: {userID: userID}});
    
}

