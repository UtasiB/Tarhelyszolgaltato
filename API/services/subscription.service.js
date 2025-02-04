const { Subscription } = require('../models/subscription.model');
const { generateToken} = require('../utils/token');

exports.createSubscription = async (date) => {
    const subscription = await Subscription.create({date});
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
