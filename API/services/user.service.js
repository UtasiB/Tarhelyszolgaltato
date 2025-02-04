const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateToken} = require('../utils/token');

exports.registerUser = async (name, email, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({name, email, password: hashedPassword, role});
    return user;
}

exports.loginUser = async (email, password) => {
    const user = await User.findOne({where: { email }});
    if (!user) throw new Error('Nem regisztrált felhasználó!');
    if (! await bcrypt.compare(password, user.password)) throw new Error('Hibás jelszó!');

    const token = generateToken({ id: user.id, name: user.name, email: user.email});

    return { token }; 
}

exports.getAllUsers = async () => {
    return await User.findAll({
        attributes: {exclude: ['password']}
    });
}

exports.getUserById = async (id) => {
    return await User.findByPk(id, {
        attributes: {exclude: ['password']}
    });
}

exports.updateUser = async (id, name, email, domain) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Felhasználó nem található!');

    user.name = name;
    user.email = email;
    user.domain = domain;

    return await user.save();
}

exports.deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Felhasználó nem található!');

    return await user.destroy();
}

exports.getProfile = async (id) => {
    try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (err) {
        throw err;
    }
};