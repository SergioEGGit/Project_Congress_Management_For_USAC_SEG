const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const cursos = require('../../DB/cursos.json');




router.get('/', (req, res) => {
    res.json(cursos);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    var {json} = "";
    _.each(cursos, (curso, i) => {
        if(curso.id === id) {
            json = curso;
        }
    });
    res.json(json);
});

router.get('/one/:universidad', (req, res) => {
    const { universidad } = req.params;
    var {json} =  "";
    _.each(cursos, (curso, i) => {
        if(curso.universidad === universidad) {
            json = curso;
        }
    });
    res.json(json);
});

router.post('/', (req, res) => {
    const idnumb =  cursos.length + 1;
    const id = "" + idnumb;
    const {codigo, nombre, seccion, universidad, titular } = req.body;
    const newCurso = { id, ...req.body };
    if(id && codigo) {
        cursos.push(newCurso);
        res.json(cursos);

    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {codigo, nombre, seccion, universidad, titular } = req.body;
    if (id && codigo) {
        _.each(cursos, (curso, i) => {
            if (curso.id === id) {
                curso.codigo = codigo;
                curso.nombre = nombre;
                curso.seccion = seccion;
                curso.universidad = universidad;
                curso.titular = titular;
            }
        });
        res.json(cursos);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(cursos, (curso, i) => {
            if (curso.id === id) {
                cursos.splice(i, 1);
            }
        });
        res.json(cursos);
    }

});

module.exports = router;