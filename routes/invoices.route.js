/** =====================================================================
 *  INVOICE ROUTER
=========================================================================*/
const { Router } = require('express');
const { check } = require('express-validator');

// MIDDLEWARES
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// CONTROLLER
const { getInvoices, createInvoice } = require('../controllers/invoices.controller');

const router = Router();

/** =====================================================================
 *  GET INVOICES
=========================================================================*/
router.get('/', validarJWT, getInvoices);
/** =====================================================================
 *  GET INVOICES
=========================================================================*/

/** =====================================================================
 *  CREATE INVOICE
=========================================================================*/
router.post('/', [

        validarJWT,
        check('client', 'EL ID del cliente debe ser correcto').isMongoId(),
        check('type', 'Tienes que especificar que metodo de pago uso').not().isEmpty(),
        check('amount', 'El monto es obligatorio').not().isEmpty(),
        check('products', 'No ha seleccionado ningun producto').not().isEmpty(),
        validarCampos

    ],
    createInvoice);
/** =====================================================================
*  CREATE INVOICE
=========================================================================*/








// EXPORT
module.exports = router;