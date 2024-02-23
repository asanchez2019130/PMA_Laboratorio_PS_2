const { Schema, model } = require('mongoose');
const StudentSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    asignatura: {
        type: [String]
    },
    role: {
        type: String,
        default: "STUDENT_ROLE"
    }
})

module.exports = model('Student', StudentSchema)