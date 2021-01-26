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

// READ BODY
app.use(express.json());

// DataBase
dbConection();

// RUTAS
app.use('/api/datos', require('./routes/datos.route'));
app.use('/api/users', require('./routes/users.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/clients', require('./routes/clients.route'));
app.use('/api/departments', require('./routes/departments.route'));
app.use('/api/products', require('./routes/products.route'));
app.use('/api/uploads', require('./routes/uploads.route'));
app.use('/api/search', require('./routes/search.route'));

app.listen(process.env.PORT, () => {
    console.log('Servidor Corriendo en el Puerto', process.env.PORT);
});