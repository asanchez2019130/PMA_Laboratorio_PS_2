const { response, json } = require('express');
const Cursos = require('../models/cursos');

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