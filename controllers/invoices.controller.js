const { response } = require('express');

// MODELS
const Invoice = require('../models/invoices.model');

/** =====================================================================
 *  GET INVOICE
=========================================================================*/
const getInvoices = async(req, res = response) => {

    try {

        const desde = Number(req.query.desde) || 0;

        const [invoices, total] = await Promise.all([

            Invoice.find()
            .populate('client', 'name')
            .populate('products.product', 'name')
            .populate('user', 'name')
            .skip(desde)
            .limit(10),

            Invoice.countDocuments()
        ]);

        res.json({
            ok: true,
            invoices,
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
 *  GET INVOICE
=========================================================================*/

/** =====================================================================
 *  CREATE INVOICE
=========================================================================*/
const createInvoice = async(req, res = response) => {

    const user = req.uid;

    try {

        const invoice = new Invoice(req.body);

        invoice.user = user;

        await invoice.save();

        // updateNumberInvoice(invoice);


        res.json({
            ok: true,
            invoice
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
 *  CREATE INVOICE
=========================================================================*/



// EXPORTS
module.exports = {
    getInvoices,
    createInvoice
};