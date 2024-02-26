const mongoose = require('mongoose');
const Curso = require('../models/cursos');
const Student = require('../models/students');

const verificarAsignaturas = async (req, res, next) => {

    try {

        const cursosInactivos = await Curso.find({ estado: false });

        for (const curso of cursosInactivos) {
            await Student.updateMany(
                { 'asignatura': curso._id },
                { $pull: { 'asignatura': curso._id } }
            );
        }
        next();
    } catch (e) {
        console.error('Error al verificar asignaturas: ', error);
        res.status(500).json({
            error: 'Error interno del servidor al verificar asignaturas'
        })
    }

}

module.exports = verificarAsignaturas;