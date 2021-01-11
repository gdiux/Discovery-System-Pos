const { response } = require('express');

const Product = require('../models/products.model');

/** =====================================================================
 *  GET PRODUCTS
=========================================================================*/
const getProducts = async(req, res = response) => {

    try {

        const products = await Product.find()
            .populate('kit.product', 'name');

        res.json({
            ok: true,
            products
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
 *  GET PRODUCTS
=========================================================================*/

/** =====================================================================
 *  CREATE PRODUCT
=========================================================================*/
const createProduct = async(req, res = response) => {

    const { code, name } = req.body;

    try {

        // VALIDATE CODE
        const validateCode = await Product.findOne({ code });
        if (validateCode) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un producto con este codigo de barras'
            });
        }

        // // VALIDATE NAME
        const validateName = await Product.findOne({ name });
        if (validateName) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un producto con este nombre'
            });
        }

        // SAVE PRODUCT
        const product = new Product(req.body);
        await product.save();

        res.json({
            ok: true,
            product
        });


    } catch (error) {
        console.log(erro);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado, porfavor intente nuevamente'
        });
    }

};
/** =====================================================================
 *  CREATE PRODUCT
=========================================================================*/

/** =====================================================================
 *  UPDATE PRODUCT
=========================================================================*/
const updateProduct = async(req, res = response) => {

    const pid = req.params.id;

    try {

        // SEARCH PRODUCT
        const productDB = await Product.findById({ _id: pid });
        if (!productDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun producto con este ID'
            });
        }
        // SEARCH PRODUCT

        // VALIDATE CODE && NAME
        const { code, name, ...campos } = req.body;
        // CODE
        if (productDB.code !== code) {
            const validateCode = await Product.findOne({ code });
            if (validateCode) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un producto con este codigo de barras'
                });
            }
        }
        // NAME
        if (productDB.name !== name) {
            const validateName = await Product.findOne({ name });
            if (validateName) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un producto con este nombre'
                });
            }
        }

        // UPDATE
        campos.code = code;
        campos.name = name;
        const productUpdate = await Product.findByIdAndUpdate(pid, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            product: productUpdate
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
 *  UPDATE PRODUCT
=========================================================================*/



// EXPORTS
module.exports = {
    getProducts,
    createProduct,
    updateProduct
};