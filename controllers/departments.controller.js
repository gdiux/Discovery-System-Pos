const { response } = require('express');

const Department = require('../models/departments.model');

/** =====================================================================
 *  GET DEPARTMENTS
=========================================================================*/
const getDepartments = async(req, res = response) => {

    try {

        const [departments, total] = await Promise.all([
            Department.find(),
            Department.countDocuments()
        ]);

        res.json({
            ok: true,
            departments,
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
 *  GET DEPARTMENTS
=========================================================================*/

/** =====================================================================
 *  CREATE DEPARTMENTS
=========================================================================*/
const createDepartment = async(req, res = response) => {

    const name = req.body.name;

    try {

        // VALIDATE DEPARTMENT
        const validateDepartment = await Department.findOne({ name });
        if (validateDepartment) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un departamento con este nombre'
            });
        }

        // SAVE DEPARTMENT
        const department = new Department(req.body);
        await department.save();

        res.json({
            ok: true,
            department
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
 *  CREATE DEPARTMENTS
=========================================================================*/
/** =====================================================================
 *  UPDATE DEPARTMENT
=========================================================================*/
const updateDepartment = async(req, res = response) => {

    const did = req.params.id;

    try {

        // SEARCH DEPARTMENT
        const departmentDB = await Department.findById({ _id: did });
        if (!departmentDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun departamento con este ID'
            });
        }
        // SEARCH DEPARTMENT

        // VALIDATE DEPARTMENT
        const { name, ...campos } = req.body;
        if (departmentDB.name !== name) {
            const validateDepartment = await Department.findOne({ name });
            if (validateDepartment) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un departamento con este nombre'
                });
            }
        }

        // UPDATE
        campos.name = name;
        const departmentUpdate = await Department.findByIdAndUpdate(did, campos, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            department: departmentUpdate
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
 *  UPDATE DEPARTMENT
=========================================================================*/

/** =====================================================================
 *  DELETE DEPARTMENT
=========================================================================*/
const deleteDepartment = async(req, res = response) => {

    const did = req.params.id;

    try {

        // SEARCH DEPARTMENT
        const departmentDB = await Department.findById({ _id: did });
        if (!departmentDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun usuario con este ID'
            });
        }
        // SEARCH DEPARTMENT

        // CHANGE STATUS
        if (departmentDB.status === true) {
            departmentDB.status = false;
        } else {
            departmentDB.status = true;
        }
        // CHANGE STATUS

        const departmentUpdate = await Department.findByIdAndUpdate(did, departmentDB, { new: true, useFindAndModify: false });

        res.json({
            ok: true,
            department: departmentUpdate
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
 *  DELETE DEPARTMENT
=========================================================================*/

// EXPORTS
module.exports = {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
};