

const generatePassword = () => {
    return Math.random().toString(36).slice(-8); // Example password generator
};

exports.create_database = async (req, res, next) => {
    const { dbname } = req.body;
    if (!dbname) {
        return res.status(400).json({ message: 'Database name is required!' });
    }

    try {
        await db.sequelize.query(`CREATE DATABASE \`${dbname}\``);
        res.status(200).json({ message: 'Database created successfully!' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
    

exports.create_user = async (req, res, next) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: 'Username is required!' });
    }
    const password = generatePassword();
    
    try {
        await db.sequelize.query(`CREATE USER '${username}'@'localhost' IDENTIFIED BY '${password}'`);
        res.status(200).json({ message: 'User created successfully!', password });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

exports.grant_privilege = async (req, res, next) => {
    const { username, dbname, privileges } = req.body;
    if (!username || !dbname || !privileges) {
        return res.status(400).json({ message: 'Missing data!' });
    }

    try {
        // Using `sequelize.query` to execute the GRANT command
        await db.sequelize.query(`GRANT ${privileges} ON \`${dbname}\`.* TO '${username}'@'localhost'`);
        res.status(200).json({ message: `Granted ${privileges} to ${username} on ${dbname}!` });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}




