const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

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
    const idnumb = cursos.length + 1;
    const id = "" + idnumb;
    const {codigo, nombre, seccion, universidad, titular, peticion} = req.body;
    const newCurso = {id, ...req.body};
    if(id && codigo && universidad) {
        cursos.push(newCurso);
        res.json(cursos);
        let data = JSON.stringify(cursos);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\cursos.json', data)
    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {codigo, nombre, seccion, universidad, titular, peticion } = req.body;
    if (id && codigo) {
        _.each(cursos, (curso, i) => {
            if (curso.id === id) {
                curso.codigo = codigo;
                curso.nombre = nombre;
                curso.seccion = seccion;
                curso.universidad = universidad;
                curso.titular = titular;
                curso.peticion = peticion
            }
        });
        res.json(cursos);
        let data = JSON.stringify(cursos);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\cursos.json', data)
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
        let data = JSON.stringify(cursos);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\cursos.json', data)
    }

});

module.exports = router;