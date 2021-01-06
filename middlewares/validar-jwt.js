/**
 * VALIDATE JWT
 */

const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    // READ TOKEN
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No existen token, debe de iniciar session'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRET_SEED_JWT);

        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token invalido'
        });

    }

};


module.exports = {
    validarJWT
};