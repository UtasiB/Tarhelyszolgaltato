const { Storage } = require('../models/storage_package.model');
const { generateToken} = require('../utils/token');
const { Subscription } = require('../models/subscription.model');
const { User } = require('../models/user.model');

exports.createStorage = async (name, price, description) => {
    const storage = await Storage.create({name, price, description});
    
    Subscription.hasMany(Storage, { foreignKey: 'storageID' });
    Storage.belongsTo(Subscription, { foreignKey: 'storageID' })

    Subscription.hasMany(User, { foreignKey: 'userID' });
    User.belongsTo(Subscription, { foreignKey: 'userID' });

    return storage;
}

exports.updateStorage= async (id, name, price, description) => {
    const storage = await Storage.findByPk(id);
    if (!storage) throw new Error('Felhasználó nem található!');

    storage.name = name;
    storage.price = price;
    storage.description = description;

    return await storage.save();
}

exports.deleteStorage = async (id) => {
    const storage = await Storage.findByPk(id);
    if (!storage) throw new Error('Felhasználó nem található!');

    return await storage.destroy();
}

exports.getAllStorages = async () => {
    return await Storage.findAll();
}
