const Student = require('../models/students');
const Cursos = require('../models/cursos');

// - - - - - - Students

const existeStudent = async (correo = '') => {
    const existeStudent = await Student.findOne({ correo });
    if (existeStudent) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

const existeStudentById = async (id = '') => {
    const existeStudentById = await Student.findOne({ id });
    if (existeStudentById) {
        throw new Error(`El student con el id ${id} no existe`);
    }
}

// - - - - - - Cursos

const existeCurso = async (nombre = '') => {
    const existeCurso = await Cursos.findOne({ nombre });
    if (existeCurso) {
        throw new Error(`El curso ${nombre} ya fue registrado`)
    }
}

const existeCursoById = async (id = "") => {
    const exiteCursoById = await Cursos.findOne({ id });
    if (exiteCursoById) {
        throw new Error(`El Curso con el id ${id} no existe`);
    }
}

module.exports = { existeStudent, existeStudentById, existeCurso, existeCursoById }