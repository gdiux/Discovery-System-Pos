/** =====================================================================
 *  CLIENTS ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getClients, createClient, updateClient, deleteClient } = require('../controllers/clients.controller');

const router = Router();

/** =====================================================================
 *  GET CLIENTS
=========================================================================*/
router.get('/', validarJWT, getClients);
/** =====================================================================
 *  GET CLIENTS
=========================================================================*/

/** =====================================================================
 *  CREATE CLIENT
=========================================================================*/
router.post('/', [
        validarJWT,
        check('name', 'El nombre es olbigatorio').not().isEmpty(),
        check('cedula', 'La Cedula es olbigatoria').not().isEmpty(),
        validarCampos
    ],
    createClient
);
/** =====================================================================
 *  CREATE CLIENT
=========================================================================*/

/** =====================================================================
 *  UPDATE CLIENT
=========================================================================*/
router.put('/:id', [
        validarJWT,
        check('name', 'El nombre es olbigatorio').not().isEmpty(),
        check('cedula', 'La Cedula es olbigatoria').not().isEmpty(),
        check('email', 'El email es olbigatorio').isEmail(),
        validarCampos
    ],
    updateClient
);
/** =====================================================================
 *  UPDATE CLIENT
=========================================================================*/

/** =====================================================================
 *  DELETE CLIENT
=========================================================================*/
router.delete('/:id', validarJWT, deleteClient);
/** =====================================================================
 *  DELETE CLIENT
=========================================================================*/

// EXPORTS
module.exports = router;