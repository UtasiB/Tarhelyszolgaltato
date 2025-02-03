const userService = require('../services/user.service');

exports.register = async (req, res, next) => {
   try{
    const { name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({success: false, message: 'Hiányzó adatok!'});
    }
    const role = 'user';
    const user = await userService.registerUser(name, email, password, role);
    res.status(201).json({success: true, user: user});
   }
    catch(err){
         next(err);
    }
}

exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({success: false, message: 'Hiányzó adatok!'});
        }
        const user = await userService.loginUser(email, password);
        res.status(200).json({success: true, user: user});
    }
    catch(err){
        next(err);
    }
}

exports.getAllUsers = async (_req, res, next) => {
    try{
        const users = await userService.getAllUsers();
        res.status(200).json({success: true, users: users});
    }
    catch(err){
        next(err);
    }
}

exports.getUserById = async (req, res, next) => {
    try{
        const id = req.params.id;
        const user = await userService.getUserById(id);
        res.status(200).json({success: true, user: user});
    }
    catch(err){
        next(err);
    }
}


exports.updateUser = async (req, res, next) => {
    try{
        const id = req.params.id;
        const { name, email, phone, address } = req.body;
        if(!name || !email){
            return res.status(400).json({success: false, message: 'Hiányzó adatok!'});
        }
        const user = await userService.updateUser(id, name, email, phone, address);
        res.status(200).json({success: true, user: user});
    }
    catch(err){
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try{
        const id = req.params.id;
        await userService.deleteUser(id);
        res.status(200).json({success: true, message: 'Felhasználó törölve!'});
    }
    catch(err){
        next(err);
    }
}

exports.getProfile = async (req, res, next) => {
    try{
        const id = req.user.id;
        const user = await userService.getProfile(id);
        res.status(200).json({success: true, user: user});
    }catch(err){
        next(err);
    }
}


