const { response } = require('express');

const User = require('../models/users.model');
const Client = require('../models/clients.model');
const Department = require('../models/departments.model');
const Product = require('../models/products.model');
const Caja = require('../models/cajas.model');

/** =====================================================================
 *  SEARCH FOR TABLE
=========================================================================*/
const search = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');

    let data = [];
    let total;

    switch (tabla) {

        case 'users':

            // data = await User.find({ name: regex });
            [data, total] = await Promise.all([
                User.find({
                    $or: [
                        { usuario: regex },
                        { name: regex },
                        { role: regex },
                        { address: regex }
                    ]
                }),
                User.countDocuments()
            ]);
            break;

        case 'clients':

            // data = await Client.find({ name: regex });
            [data, total] = await Promise.all([
                Client.find({
                    $or: [
                        { name: regex },
                        { cedula: regex },
                        { phone: regex },
                        { email: regex },
                        { city: regex },
                        { Department: regex }
                    ]
                }),
                Client.countDocuments()
            ]);
            break;
        case 'products':

            // data = await Client.find({ name: regex });
            [data, total] = await Promise.all([
                Product.find({
                    $or: [
                        { code: regex },
                        { name: regex },
                        { type: regex }
                    ]
                }),
                Product.countDocuments()
            ]);
            break;

        case 'departments':

            // data = await Department.find({ name: regex });
            [data, total] = await Promise.all([
                Department.find({ name: regex }),
                Department.countDocuments()
            ]);
            break;

        case 'caja':

            // data = await Department.find({ name: regex });
            [data, total] = await Promise.all([
                Caja.find({
                    $or: [
                        { description: regex },
                        { name: regex }
                    ]
                }),
                Caja.countDocuments()
            ]);
            break;

        default:
            res.status(400).json({
                ok: false,
                msg: 'Error en los parametros de la busquedad'
            });
            break;

    }

    res.json({
        ok: true,
        resultados: data,
        total
    });

};
/** =====================================================================
 *  SEARCH FOR TABLE
=========================================================================*/


// EXPORTS
module.exports = {
    search
};