const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const asignacioncursos = require('../../DB/asignacioncurso.json');


router.get('/', (req, res) => {
    res.json(asignacioncursos);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    var {json} = "";
    _.each(asignacioncursos, (asignacioncurso, i) => {
        if(asignacioncurso.id === id) {
            json = asignacioncurso;
        }
    });
    res.json(json);
});

router.get('/:estudiante', (req, res) => {
    const { estudiante } = req.params;
    var {json} = "";
    _.each(asignacioncursos, (asignacioncurso, i) => {
        if(asignacioncurso.estudiante === estudiante) {
            json = asignacioncurso;
        }
    });
    res.json(json);
});


router.post('/', (req, res) => {
    const idnumb =  asignacioncursos.length + 1;
    const id = "" + idnumb;
    const {estudiante, curso, secciona, titulara} = req.body;
    const newAsignacion = { id, ...req.body };
    if(id && estudiante) {
        asignacioncursos.push(newAsignacion);
        res.json(asignacioncursos);
        let data = JSON.stringify(asignacioncursos);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F3_201801628\\Server\\DB\\asignacioncurso.json', data)
    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});


module.exports = router;