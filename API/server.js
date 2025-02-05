/**
 * SERVER - alap függőségek importálása, szerver indítása
 */
const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const db = require('./config/database');
const routes = require('./routers/index');
const errorMiddleware = require('./middlewares/error.middleware');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const transporter = require('./config/nodemailer');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// útvonalak lekezelése
app.use('/api', routes);
app.use(errorMiddleware);




const generatePassword = () => {
    return Math.random().toString(36).slice(-8); // Example password generator
};
const password = generatePassword();
let Password = "";

// create database
app.post('/api/databases/create-database', (req, res, next) => {
    try{
        const { dbname } = req.body;
        if (!dbname) {
            return res.status(400).json({ message: 'Database name is required!' });
        }
    
        const sql = `CREATE DATABASE \`${dbname}\``;
    
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: err });
            }
            res.status(200).json({ message: 'Database created successfully!', data: results });
        });
    }
    catch(err){
        next(err);
    }
   
});

// create user for database
app.post('/api/databases/create-user', async (req, res, next) => {
    try{
        const { username} = req.body;
        if (!username) {
            return res.status(400).json({ message: 'Username is required!' });
        }
        const sql = `CREATE USER '${username}'@'localhost' IDENTIFIED BY '${password}'`;
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ message: err });
            }
            res.status(200).json({ message: 'User created successfully!', data: results, password });
        });
    }
    catch(err){
        next(err);
    }
    Password = password;

   module.exports.Password = password;

   
    // send mail 
   /* const info = await transpor   ter.sendMail({
        from: "smtp.gmail.com", // sender address
        to: `${transporter.auth.user}`, // list of receivers
        subject: "Password", // Subject line
        text: `Your pasword for your database is: ${Password} `, // plain text body
        html: `<b>Your password for your database is: ${Password} </b>`, // html body
    });

    res.status(200).json({ message: 'Email sent!', data: info });
    */
});




// grant priviliges to user
app.post('/api/databases/grant-privileges', (req, res, next) => {
    try{

    const { username, dbname, privileges } = req.body;
    if (!username || !dbname || !privileges) {
        return res.status(400).json({ message: 'Missing data!' });
    }
    const sql = `USE ${dbname}; GRANT ${privileges} ON \`${dbname}\`.* TO '${username}'@'localhost'`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: err });
        }
        res.status(200).json({ message: `Granted ${privileges} to ${username} on ${dbname}!`, data: results });
    });
    }
    catch(err){
        next(err);
    }
    
});

// ORM adatbázis szinkronizáció
db.sync({alter: config.db.alter, force: config.db.force})
    .then(()=>{
        console.log(`Database synced successfully.`);
    })
    .catch((err)=>{
        console.log(`Database sync error: ` + err);
    });

// szerver indítása    
app.listen(config.port, ()=>{
    console.log(`Server running on http://${config.db.host}:${config.port}`);
});