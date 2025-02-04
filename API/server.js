/**
 * SERVER - alap függőségek importálása, szerver indítása
 */
const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const db = require('./config/database');
const routes = require('./routers/index');
const errorMiddleware = require('./middlewares/error.middleware');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// útvonalak lekezelése
app.use('/api', routes);
app.use(errorMiddleware);




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