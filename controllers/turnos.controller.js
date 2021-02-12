const { response } = require('express');
const Caja = require('../models/cajas.model');
const Turno = require('../models/turnos.model');

/** =====================================================================
 *  GET TURNOS
=========================================================================*/
const getTurnos = async(req, res = response) => {

    try {

        const [turnos, total] = await Promise.all([
            Turno.find()
            .populate('cajero', 'name')
            .populate('caja', 'name'),
            Turno.countDocuments()
        ]);

        res.json({
            ok: true,
            turnos,
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
 *  GET TURNOS
=========================================================================*/
/** =====================================================================
 *  GET TURNO FOR BY ID
=========================================================================*/
const getTurnoId = async(req, res = response) => {

    const tid = req.params.id;

    try {

        // SEARCH TURNO
        const turnoDB = await Turno.findById({ _id: tid })
            .populate('cajero', 'name')
            .populate('caja', 'name');
        // SEARCH TURNO        

        res.json({
            ok: true,
            turno: turnoDB
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
 *  GET TURNO FOR BY ID
=========================================================================*/

/** =====================================================================
 *  CREATE TURNO
=========================================================================*/
const createTurno = async(req, res = response) => {

    const caid = req.body.caja;

    try {

        // SEARCH CAJA
        const cajaDB = await Caja.findById({ _id: caid });
        if (!cajaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ninguna caja con este ID'
            });
        }
        // SEARCH CAJA      

        // SAVE TURNO
        const turno = new Turno(req.body);
        turno.cajero = req.uid;
        await turno.save();

        // UPDATE CAJA
        cajaDB.cerrada = false;
        cajaDB.turno = turno._id;
        cajaDB.cajero = req.uid;
        const cajaUpdate = await Caja.findByIdAndUpdate(caid, cajaDB, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            turno
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
 *  CREATE TURNO
=========================================================================*/
/** =====================================================================
 *  UPDATE CAJA
=========================================================================*/
// const updateCaja = async(req, res = response) => {

//     const caid = req.params.id;

//     try {

//         // SEARCH DEPARTMENT
//         const cajaDB = await Caja.findById({ _id: caid });
//         if (!cajaDB) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'No existe ninguna caja con este ID'
//             });
//         }
//         // SEARCH DEPARTMENT

//         // VALIDATE NAME
//         // const { name, ...campos } = req.body;
//         // if (cajaDB.name !== name) {
//         //     const cajaDepartment = await Caja.findOne({ name });
//         //     if (cajaDepartment) {
//         //         return res.status(400).json({
//         //             ok: false,
//         //             msg: 'Ya existe una caja con este nombre'
//         //         });
//         //     }
//         // }

//         // UPDATE
//         campos.name = name;
//         const cajaUpdate = await Caja.findByIdAndUpdate(caid, campos, { new: true, useFindAndModify: false });

//         res.json({
//             ok: true,
//             caja: cajaUpdate
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             msg: 'Error inesperado, porfavor intente nuevamente'
//         });
//     }

// };

/** =====================================================================
 *  UPDATE CAJA
=========================================================================*/

/** =====================================================================
 *  DELETE CAJA
=========================================================================*/
// const deleteCaja = async(req, res = response) => {

//     const caid = req.params.id;

//     try {

//         // SEARCH CAJA
//         const cajaDB = await Caja.findById({ _id: caid });
//         if (!cajaDB) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'No existe ningun usuario con este ID'
//             });
//         }
//         // SEARCH CAJA

//         // CHANGE STATUS
//         if (cajaDB.status === true) {
//             cajaDB.status = false;
//         } else {
//             cajaDB.status = true;
//         }
//         // CHANGE STATUS

//         const cajaUpdate = await Caja.findByIdAndUpdate(caid, cajaDB, { new: true, useFindAndModify: false });

//         res.json({
//             ok: true,
//             caja: cajaUpdate
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             msg: 'Error inesperado, porfavor intente nuevamente'
//         });
//     }

// };


/** =====================================================================
 *  DELETE DEPARTMENT
=========================================================================*/

// EXPORTS
module.exports = {
    getTurnos,
    createTurno,
    getTurnoId
};