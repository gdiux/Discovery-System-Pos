//Env
require('dotenv').config();

const express = require('express');
const cors = require('cors');

//Conection DB
const { dbConection } = require('./database/config');

// Crear el servidor
const app = express();

// CORS
app.use(cors());

// DataBase
dbConection();

// RUTAS
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });

});



app.listen(process.env.PORT, () => {
    console.log('Servidor Corriendo en el Puerto', process.env.PORT);
});