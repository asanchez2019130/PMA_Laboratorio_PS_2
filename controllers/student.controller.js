const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Student = require('../models/students');
const { validarCursos, validarCursosDuplicados, validarCursosExistentes } = require('../middlewares/validar-cursos');


const studentGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, students] = await Promise.all([
        Student.countDocuments(query),
        Student.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate({
                path: 'asignatura',
                populate: {
                    path: 'curso',
                    model: 'Cursos',
                    select: 'estado' // seleccionar solo nombre y estado del curso
                }
            })
    ]);

    res.status(200).json({
        total,
        students
    });
}

const studentPost = async (req, res) => {
    const { nombre, correo, password, asignatura, role, estado } = req.body;
    const student = new Student({ nombre, correo, password, asignatura, role, estado });

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
    const { _id, password, correo, role, estado, ...resto } = req.body;

    await Student.findByIdAndUpdate(id, resto);

    const student = await Student.findOne({ _id: id });

    res.status(200).json({
        msg: 'Student actualizado exitosamente',
        student
    });
}

const asignarCursosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, correo, role, nombre, estado, ...resto } = req.body;

    await Student.findByIdAndUpdate(id, resto);

    const student = await Student.findOne({ _id: id });

    res.status(200).json({
        msg: 'Asignado a cursos exitosamente',
        student
    })

}

module.exports = {
    studentDelete,
    studentPost,
    studentsPut,
    asignarCursosPut,
    studentGet
}