const { response } = require('express');

const Caja = require('../models/cajas.model');

/** =====================================================================
 *  GET CAJA
=========================================================================*/
const getCajas = async(req, res = response) => {

    try {

        const [cajas, total] = await Promise.all([
            Caja.find()
            .populate('cajero', 'name'),
            Caja.countDocuments()
        ]);

        res.json({
            ok: true,
            cajas,
            total
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};
/** =====================================================================
 *  GET CAJA
=========================================================================*/

/** =====================================================================
 *  CREATE CAJA
=========================================================================*/
const createCaja = async(req, res = response) => {

    const name = req.body.name;

    try {

        // VALIDATE DEPARTMENT
        const validateCaja = await Caja.findOne({ name });
        if (validateCaja) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una caja con este nombre'
            });
        }

        // SAVE DEPARTMENT
        const caja = new Caja(req.body);
        await caja.save();

        res.json({
            ok: true,
            caja
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** =====================================================================
 *  CREATE CAJA
=========================================================================*/
/** =====================================================================
 *  UPDATE CAJA
=========================================================================*/
const updateCaja = async(req, res = response) => {

    const caid = req.params.id;

    try {

        // SEARCH DEPARTMENT
        const cajaDB = await Caja.findById({ _id: caid });
        if (!cajaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna caja con este ID'
            });
        }
        // SEARCH DEPARTMENT

        // VALIDATE DEPARTMENT
        const { name, ...campos } = req.body;
        if (cajaDB.name !== name) {
            const cajaDepartment = await Caja.findOne({ name });
            if (cajaDepartment) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una caja con este nombre'
                });
            }
        }

        // UPDATE
        campos.name = name;
        const cajaUpdate = await Caja.findByIdAndUpdate(caid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            caja: cajaUpdate
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};

/** =====================================================================
 *  UPDATE CAJA
=========================================================================*/

/** =====================================================================
 *  DELETE CAJA
=========================================================================*/
const deleteCaja = async(req, res = response) => {

    const caid = req.params.id;

    try {

        // SEARCH CAJA
        const cajaDB = await Caja.findById({ _id: caid });
        if (!cajaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun usuario con este ID'
            });
        }
        // SEARCH CAJA

        // CHANGE STATUS
        if (cajaDB.status === true) {
            cajaDB.status = false;
        } else {
            cajaDB.status = true;
        }
        // CHANGE STATUS

        const cajaUpdate = await Caja.findByIdAndUpdate(caid, cajaDB, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            caja: cajaUpdate
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};


/** =====================================================================
 *  DELETE DEPARTMENT
=========================================================================*/

// EXPORTS
module.exports = {
    getCajas,
    createCaja,
    updateCaja,
    deleteCaja
};