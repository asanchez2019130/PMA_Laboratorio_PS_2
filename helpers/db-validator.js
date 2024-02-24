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

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

const existenteTeacher = async (correo = '') => {
    const existenteTeacher = await Teacher.findOne({ correo });
    if (existenteTeacher) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

const existeTeacherById = async (id = '') => {
    const existeTeacherById = await Teacher.findOne({ id });
    if (existeTeacherById) {
        throw new Error(`El Teacher con el id ${id} no existe`);
    }
}

module.exports = {
    existeStudent,
    existeStudentById,
    existeCurso,
    existeCursoById,
    existeTeacherById,
    existenteEmail,
    existenteTeacher
}