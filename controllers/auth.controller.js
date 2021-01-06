const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users.model');
const { generarJWT } = require('../helpers/jwt');

/** =====================================================================
 *  LOGIN
=========================================================================*/
const login = async(req, res = response) => {

    const { usuario, password } = req.body;

    try {

        // VALIDATE USER
        const userDB = await User.findOne({ usuario });
        if (!userDB) {

            return res.status(404).json({
                ok: false,
                msg: 'El usuario o la contraseña es incorrecta'
            });

        }
        // VALIDATE USER

        // PASSWORD
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o la contraseña es incorrecta'
            });
        }

        // JWT - JWT
        const token = await generarJWT(userDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }


};
/** =====================================================================
 *  LOGIN
=========================================================================*/



module.exports = {
    login
};