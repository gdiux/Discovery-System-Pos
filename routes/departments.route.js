/** =====================================================================
 *  DEPARTMENTS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getDepartments, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/departments.controller');

const router = Router();

/** =====================================================================
 *  GET DEPARTMENTS
=========================================================================*/
router.get('/', validarJWT, getDepartments);
/** =====================================================================
 *  GET DEPARTMENTS
=========================================================================*/

/** =====================================================================
 *  CREATE DEPARTMENTS
=========================================================================*/
router.post('/', [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createDepartment
);
/** =====================================================================
 *  CREATE DEPARTMENTS
=========================================================================*/

/** =====================================================================
 *  UPDATE DEPARTMENTS
=========================================================================*/
router.put('/:id', [
        validarJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateDepartment
);
/** =====================================================================
 *  UPDATE DEPARTMENTS
=========================================================================*/

/** =====================================================================
 *  DELETE DEPARTMENTS
=========================================================================*/
router.delete('/:id', validarJWT, deleteDepartment);
/** =====================================================================
 *  DELETE DEPARTMENTS
=========================================================================*/

// EXPORTS
module.exports = router;