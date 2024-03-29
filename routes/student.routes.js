const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { studentDelete, studentPost, studentsPut, asignarCursosPut, studentGet } = require('../controllers/student.controller')
const { existeStudent, existeStudentById } = require('../helpers/db-validator');
const { validarCursos } = require('../middlewares/validar-cursos');
const verificarAsignaturas = require('../middlewares/validar-asignaturas');

const router = Router();

router.put(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeStudentById),
        validarCursos
    ], studentsPut,verificarAsignaturas);


router.put(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeStudentById),
        validarCursos
    ], asignarCursosPut,verificarAsignaturas);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeStudentById),
        validarCursos
    ], studentDelete,verificarAsignaturas);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "el password debe de ser mayor a 6 caracteres").isLength({ min: 6 }),
        //check("asignatura", "Asignaturas es obligatorio"),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existeStudent),
        validarCampos
    ], studentPost);

router.get("/", studentGet);

module.exports = router;