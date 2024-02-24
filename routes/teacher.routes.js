const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { teacherDelete, teacherPost, teacherPut } = require('../controllers/teacher.controller');
const { existenteTeacher, existeTeacherById } = require('../helpers/db-validator')


const router = Router();

router.put(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeTeacherById),
        validarCampos
    ], teacherPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeTeacherById),
        validarCampos
    ], teacherDelete);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("correo", "Este no es un correo valido").isEmail(),
        //check("correo").custom(existenteTeacher),
        check("password", "el password debe de ser mayor a 6 caracteres").isLength({ min: 6 }),
        validarCampos
    ], teacherPost);

module.exports = router;
