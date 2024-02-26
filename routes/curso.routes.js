const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { cursoDelete, cursosPost, cursoGet, cursosPut, getCursosByid } = require('../controllers/cursos.controller');

const { existeCurso, existeCursoById } = require('../helpers/db-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get("/", cursoGet)

router.put(
    "/:id",
    [
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursosPut);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursoDelete);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos
    ], cursosPost);

module.exports = router;