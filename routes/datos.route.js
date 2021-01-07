/** =====================================================================
 *  DATOS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLERS
const { getDatos, createDatos, updateDatos } = require('../controllers/datos.controller');

const router = Router();

/** =====================================================================
 *  GET DATOS
=========================================================================*/
router.get('/', validarJWT, getDatos);
/** =====================================================================
 *  GET DATOS
=========================================================================*/
/** =====================================================================
 *  POST CREATE DATOS
=========================================================================*/
router.post('/', [
        validarJWT,
        check('name', 'El nombre es olbigatorio').not().isEmpty(),
        check('address', 'El nombre es olbigatorio').not().isEmpty(),
        check('phone', 'El nombre es olbigatorio').not().isEmpty(),
        check('nit', 'El nombre es olbigatorio').not().isEmpty(),
        check('tax', 'El nombre es olbigatorio').not().isEmpty(),
        validarCampos
    ],
    createDatos
);
/** =====================================================================
 *  POST CREATE DATOS
=========================================================================*/
/** =====================================================================
 *  PUT DATOS
=========================================================================*/
router.put('/:id', [
        validarJWT,
        check('name', 'El nombre es olbigatorio').not().isEmpty(),
        check('address', 'El nombre es olbigatorio').not().isEmpty(),
        check('phone', 'El nombre es olbigatorio').not().isEmpty(),
        check('nit', 'El nombre es olbigatorio').not().isEmpty(),
        check('tax', 'El nombre es olbigatorio').not().isEmpty(),
        validarCampos
    ],
    updateDatos
);
/** =====================================================================
 *  PUT DATOS
=========================================================================*/



// EXPORT
module.exports = router;