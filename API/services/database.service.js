const { Database } = require('../models/database.model');
const {DbUser} = require('../models/DBUser.model');

exports.createDatabase = async (dbname) => {
    const database = await Database.create({dbname});
    return database;
}

exports.createUser = async (username, password) => {
    const dbUser =  await DbUser.create({ username, password });
    return dbUser;

}

exports.deleteStorage = async (id) => {
    const storage = await Database.findByPk(id);
    if (!storage) throw new Error('Felhasználó nem található!');

    return await storage.destroy();
}
