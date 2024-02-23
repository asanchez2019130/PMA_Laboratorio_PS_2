const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Student = require('../models/students');

const studentPost = async (req, res) => {
    const { nombre, correo, password, asignatura } = req.body;

    const student = new Student({ nombre, correo, password, asignatura });

    const salt = bcryptjs.genSaltSync();
    student.password = bcryptjs.hashSync(password, salt);

    await student.save();
    res.status(200).json({
        student
    })

}

const studentDelete = async (req, res) => {
    const { id } = req.params;
    await Student.findByIdAndUpdate(id, { estado: false })
    const student = await Student.findOne({ _id: id });

    res.status(200).json({
        msg: 'Student Eliminado Exitosamente',
        student
    })
}

const studentsPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, correo, role, ...resto } = req.body;

    await Student.findByIdAndUpdate(id, resto);

    const student = await Student.findOne({ _id: id });

    res.status(200).json({
        msg: 'Student actualizado exitosamente',
        student
    });
}

const asignarCursosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, correo, role, nombre, ...resto } = req.body;

    await Student.findByIdAndUpdate(id, resto);

    const student = await Student.findOne({ _id: id });

    res.status(200).json({
        msg : 'Asignado a cursos exitosamente',
        student
    })

}

module.exports = {
    studentDelete,
    studentPost,
    studentsPut,
    asignarCursosPut
}