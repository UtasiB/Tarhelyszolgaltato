const storageService = require('../services/storage.service');

exports.create = async (req, res, next) => {
   try{
    const { name, price, description} = req.body;
    if(!name || !price || !description){
        return res.status(400).json({success: false, message: 'Hiányzó adatok!'});
    }
    const storage = await storageService.createStorage(name, price, description);
    res.status(201).json({success: true, storage: storage});
   }
    catch(err){
         next(err);
    }
}

exports.update = async (req, res, next) => {
    try{
        const id = req.params.id;
        const { name, price, description } = req.body;
        if(!name || !price || !description){
            return res.status(400).json({success: false, message: 'Hiányzó adatok!'});
        }
        const storage = await storageService.updateStorage(id, name, price, description);
        res.status(200).json({success: true, storage: storage});
    }
    catch(err){
        next(err);
    }
}

exports.delete = async (req, res, next) => {
    try{
        const id = req.params.id;
        await storage.deleteStorage(id);
        res.status(200).json({success: true, message: 'Felhasználó törölve!'});
    }
    catch(err){
        next(err);
    }
}

exports.getAllStorages = async (_req, res, next) => {
    try{
        const storages = await storageService.getAllStorages();
        res.status(200).json({success: true, storages: storages});
    }
    catch(err){
        next(err);
    }
}

exports.getStorageById = async (req, res, next) => {
    try{
        const id = req.params.id;
        const storage = await storageService.getStorageById(id);
        res.status(200).json({success: true, storage: storage});
    }
    catch(err){
        next(err);
    }
}





