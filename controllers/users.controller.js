const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users.model');

/** =====================================================================
 *  GET USERS
=========================================================================*/
const getUsers = async(req, res) => {

    const users = await User.find({}, 'usuario name role');

    res.json({
        ok: true,
        users
    });

};
/** =====================================================================
 *  GET USERS
=========================================================================*/
/** =====================================================================
 *  CREATE USERS
=========================================================================*/
const createUsers = async(req, res = response) => {

    const { usuario, name, password, role } = req.body;

    try {

        const validarUsuario = await User.findOne({ usuario });

        if (validarUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existen alguien con este nombre de usuario'
            });
        }

        const user = new User(req.body);

        // ENCRYPTAR PASSWORD
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // SAVE USER
        await user.save();

        res.json({
            ok: true,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
};
/** =====================================================================
 *  CREATE USERS
=========================================================================*/

/** =====================================================================
 *  UPDATE USER
=========================================================================*/
const updateUser = async(req, res = response) => {

    const uid = req.params.id;

    try {

        // SEARCH USER
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun usuario con este ID'
            });
        }
        // SEARCH USER

        // VALIDATE USER
        const { password, usuario, ...campos } = req.body;
        if (userDB.usuario !== usuario) {
            const validarUsuario = await findOne({ usuario });
            if (validarUsuario) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con este nombre'
                });
            }
        }

        // UPDATE
        campos.usuario = usuario;
        const userUpdate = await User.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            user: userUpdate
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }



};
/** =====================================================================
 *  UPDATE USER
=========================================================================*/
/** =====================================================================
 *  DELETE USER
=========================================================================*/
const deleteUser = async(req, res = response) => {

    const uid = req.params.id;

    try {

        // SEARCH USER
        const userDB = await User.findById(uid);
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun usuario con este ID'
            });
        }
        // SEARCH USER

        // DELETE USER
        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            user: 'Usuario eliminado exitosamente!'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }

};
/** =====================================================================
 *  DELETE USER
=========================================================================*/



module.exports = {
    getUsers,
    createUsers,
    updateUser,
    deleteUser
};