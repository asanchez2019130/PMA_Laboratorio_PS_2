const { response, json } = require('express');
const Cursos = require('../models/cursos');
const Student = require('../models/students')

const cursoGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, cursos] = await Promise.all([
        Cursos.countDocuments(query),
        Cursos.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    })
}

const cursosPost = async (req, res) => {
    const { nombre } = req.body;
    const cursos = new Cursos({ nombre });

    await cursos.save();
    res.status(200).json({
        cursos
    });
}

const cursoDelete = async (req, res) => {
    const { id } = req.params;
    await Cursos.findByIdAndUpdate(id, { estado: false });
    const cursos = await Cursos.findOne({ _id: id });

    res.status(200).json({
        msg: 'Curso eliminado exitosamente',
        cursos
    });
}

const cursosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;


    await Cursos.findByIdAndUpdate(id, resto);
    /*
        try {
            await Student.updateMany(
                { 'asignatura': id }, // Filtrar por asignaturas que tengan el nombre del curso que estamos editando
                { $set: { 'asignatura.$[elem]': nombre } }, // Actualizar el nombre del curso en el array
                { arrayFilters: [{ 'elem': id }] }
            );
        } catch (error) {
            console.error('Error al actualizar asignaturas en estudiantes:', error);
            // Manejar el error según sea necesario
            return res.status(500).json({ error: 'Error interno del servidor al actualizar asignaturas en estudiantes.' });
        }
    */
    const cursos = await Cursos.findOne({ _id: id });

    res.status(200).json({
        msg: 'Curso actualizado exitosamente',
        cursos
    });
}

module.exports = {
    cursoDelete,
    cursoGet,
    cursosPost,
    cursosPut
}