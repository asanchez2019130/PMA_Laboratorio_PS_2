const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { cursoDelete, cursosPost, cursoGet, cursosPut, getCursosByid } = require('../controllers/cursos.controller');

const { existeCurso, existeCursoById } = require('../helpers/db-validator');

const router = Router();

router.get("/", cursoGet)

router.get(
    "/:id",
    [
        check("id", "El id no es un formato valido MongoDB").isMongoId(),
        check("id").custom(existeCurso),
        validarCampos
    ], getCursosByid);

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