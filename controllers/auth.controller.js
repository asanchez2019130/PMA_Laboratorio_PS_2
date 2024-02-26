const { generarJWT } = require("../helpers/generar-jwt");
const Student = require("../models/students");
const bycriptjs = require('bcryptjs');

const login = async (req, res) => {
    const {correo, password} = req.body;

    try {
        //Verificar que el correo exista
        const students = await Student.findOne({ correo });

        if (!students) {
            return res.status(400).json({
                msg: 'El correo no esta registrado'
            });
        }

        // Verificar si el user esta activo
        if (!students.estado) {
            return res.status(400).json({
                msg: 'El User no existe en la base de datos'
            });
        }

        // Verificar que la contraseña sea la correcta

        const validPassword = bycriptjs.compareSync(password, students.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }

        //
        const token = await generarJWT(students.id);


        res.status(200).json({
            msg: 'Login OK',
            students,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'comuniquese con el administrador'
        })
    }
    
}



module.exports = { login }