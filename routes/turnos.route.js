/** =====================================================================
 *  TURNOS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getTurnos, createTurno, getTurnoId } = require('../controllers/turnos.controller');

const router = Router();

/** =====================================================================
 *  GET TURNOS
=========================================================================*/
router.get('/', validarJWT, getTurnos);
/** =====================================================================
 *  GET TURNOS
=========================================================================*/

/** =====================================================================
 *  GET TURNOS FOR BY ID
=========================================================================*/
router.get('/:id', validarJWT, getTurnoId);
/** =====================================================================
 *  GET TURNOS FOR BY ID
=========================================================================*/

/** =====================================================================
 *  CREATE TURNO
=========================================================================*/
router.post('/', [
        validarJWT,
        check('caja', 'Debes de seleccionar una caja').not().isEmpty(),
        validarCampos
    ],
    createTurno
);
/** =====================================================================
 *  CREATE TURNO
=========================================================================*/

/** =====================================================================
 *  UPDATE TURNO
=========================================================================*/
// router.put('/:id', [
//         validarJWT,
//         check('name', 'El nombre es obligatorio').not().isEmpty(),
//         validarCampos
//     ],
//     updateCaja
// );
/** =====================================================================
 *  UPDATE TURNO
=========================================================================*/

/** =====================================================================
 *  DELETE TURNO
=========================================================================*/
// router.delete('/:id', validarJWT, deleteCaja);
/** =====================================================================
 *  DELETE TURNO
=========================================================================*/

// EXPORTS
module.exports = router;