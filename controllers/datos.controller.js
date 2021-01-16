const { response } = require('express');

const Datos = require('../models/datos.model');

/** =====================================================================
 *  GET DATOS
=========================================================================*/
const getDatos = async(req, res) => {

    const datos = await Datos.find({}, 'name address phone nit tax logo');

    res.json({
        ok: true,
        datos
    });

};
/** =====================================================================
 *  GET DATOS
=========================================================================*/
/** =====================================================================
 *  CREATE DATOS
=========================================================================*/
const createDatos = async(req, res = response) => {

    try {

        const validarDatos = await Datos.find();

        console.log(validarDatos.length);

        if (validarDatos.length !== 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya se crearon los datos del sistema'
            });
        }

        const datos = new Datos(req.body);

        // SAVE DATOS
        await datos.save();

        res.json({
            ok: true,
            datos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
};
/** =====================================================================
 *  CREATE DATOS
=========================================================================*/

/** =====================================================================
 *  UPDATE DATOS
=========================================================================*/
const updateDatos = async(req, res = response) => {

    const eid = req.params.id;

    try {

        // SEARCH DATOS
        const datosDB = await Datos.findById(eid);
        if (!datosDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Error al actualizar los datos, ID incorrecto'
            });
        }
        // SEARCH DATOS

        // VALIDATE DATOS
        const campos = req.body;

        // UPDATE
        const datosUpdate = await Datos.findByIdAndUpdate(eid, campos, { new: true });

        res.json({
            ok: true,
            datos: datosUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }

};
/** =====================================================================
 *  UPDATE DATOS
=========================================================================*/
module.exports = {
    getDatos,
    createDatos,
    updateDatos
};