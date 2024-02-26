const { validationResult } = require('express-validator');

const Cursos = require('../models/cursos')


const validarCursos = async (req, res, next) => {
    const { asignatura } = req.body;
    const error = validationResult(req);
    const cursosDuplicados = asignatura.filter((curso, index) => asignatura.indexOf(curso) !== index);
    const cursosExistentes = await Cursos.find({ nombre: { $in: asignatura } });

    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }


    //
    if (!Array.isArray(asignatura) || asignatura.length > 3) {
        return res.status(400).json({ errors: [{ msg: 'Solo te puedes asignar a 3 cursos como limite' }] });
    }


    //
    if (cursosDuplicados.length > 0) {
        return res.status(400).json({
            msg: `No te pudes asignar a un curso dos veces: ${cursosDuplicados.join(', ')}`
        })
    }


    //

    if (cursosExistentes.length !== asignatura.length) {
        const cursosInexistentes = asignatura.filter(curso => !cursosExistentes.find(c => c.nombre === curso));
        return res.status(400).json({
            msg: `Los siguientes cursos no existen : ${cursosInexistentes.join(', ')}`
        })
    }

    next();

}


module.exports = { validarCursos }