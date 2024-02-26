const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacher')
const Student = require('../models/students');

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(400).json({
            msg: 'no hay token'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const student = await Student.findById(uid);

        if (!student) {
            return res.status(400).json({
                msg: 'El teacher no existe'
            })
        }

        if (!student.estado) {
            return res.status(400).json({
                msg: 'Token no valido, student con estado false'
            })
        }

        req.student = student;

        next();

    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}

module.exports = { validarJWT }