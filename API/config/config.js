require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        force: process.env.FORCE == 'true' ? true : false,
        logging: process.env.LOGGING == 'true' ? true : false,
        alter: process.env.ALTER == 'true' ? true : false,
        
    },
    jwtSecret: process.env.JWT_SECRET    
}