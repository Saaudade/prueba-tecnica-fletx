const { body } = require('express-validator');
const { 
    create, 
    getAll, 
    update, 
    remove, 
    findByDate, 
    findByWord } = require('../controllers/efemeride.controller');
const { validarCampos } = require('../middlewares/validar-campos');

module.exports = function (router) {
    router.post(
        "/efemeride",
        [
            body('fecha', 'La fecha es obligatoria').not().isEmpty(),
            body('categoria', 'La Categoria es obligatoria').not().isEmpty(),
            body('texto', 'El Texto es obligatorio').not().isEmpty(),
            body('imagen', 'La Imagen es obligatorio').not().isEmpty(),
            validarCampos
        ],
        create,
    );

    router.get(
        "/efemerides",
        getAll
    );

    router.get(
        "/efemerideByDate/fecha/:fecha",
        findByDate
    );

    router.get(
        "/efemerideByWord/word/:word",
        findByWord
    );

    router.put(
        "/efemerides/fecha/:fecha",
        update
    );

    router.delete(
        "/efemerides/fecha/:fecha",
        remove
    );
}