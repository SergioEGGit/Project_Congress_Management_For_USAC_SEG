const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const asignacionactividades = require('../../DB/asignacionactividad.json');


router.get('/', (req, res) => {
    res.json(asignacionactividades);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    var {json} = "";
    _.each(asignacionactividades, (asignacionactividad, i) => {
        if(asignacionactividad.id === id) {
            json = asignacionactividad;
        }
    });
    res.json(json);
});

router.post('/', (req, res) => {
    const idnumb =  asignacionactividades.length + 1;
    const id = "" + idnumb;
    const {id_actividad,actividad, tipo, participante, asistencia, puntuacion, comentario} = req.body;
    const newAsignacion = { id, ...req.body };
    if(id && actividad) {
        asignacionactividades.push(newAsignacion);
        res.json(asignacionactividades);
        let data = JSON.stringify(asignacionactividades);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F3_201801628\\Server\\DB\\asignacionactividad.json', data)
    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {id_actividad ,actividad, tipo, participante, asistencia, puntuacion, comentario} = req.body;
    if (id && actividad) {
        _.each(asignacionactividades, (asignacionactividad, i) => {
            if (asignacionactividad.id === id) {
                asignacionactividad.id_actividad = id_actividad;
                asignacionactividad.actividad = actividad;
                asignacionactividad.tipo = tipo;
                asignacionactividad.participante = participante;
                asignacionactividad.asistencia = asistencia;
                asignacionactividad.puntuacion = puntuacion;
                asignacionactividad.comentario = comentario;
            }
        });
        res.json(asignacionactividades);
        let data = JSON.stringify(asignacionactividades);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F3_201801628\\Server\\DB\\asignacionactividad.json', data)
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});


module.exports = router;