const userService = require('../services/user.service');
let Email = "";

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
        console.log(user)
        res.status(200).json({success: true, user: user, token: user.token});
        Email = email;
       
    }
    catch(err){
        next(err);
    }
}

module.exports.Email = Email;

  
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
        const { name, email} = req.body;
        if(!name || !email){
            return res.status(400).json({success: false, message: 'Hiányzó adatok!'});
        }
        const user = await userService.updateUser(id, name, email);
        res.status(200).json({success: true, user: user});
    }
    catch(err){
        next(err);
    }

}

exports.updateDomain = async (req, res, next) => {
    try{
        const id = req.params.id;
        const { domain } = req.body;
        if(!domain){
            return res.status(400).json({success: false, message: 'Hiányzó adatok!'});
        }
        const user = await userService.updateDomain(id, domain);
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
        if (!req.user || !req.user.id) {
            return res.status(400).json({ success: false, message: 'User ID is missing!' });
        }

        const id = req.user.id;
       
        const user = await userService.getProfile(id);
        
        res.status(200).json({success: true, user: user, token: req.headers.authorization.split(' ')[1]});
    } catch(err){
        next(err);
    }
}