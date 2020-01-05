const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const actividades = require('../../DB/actividades.json');




router.get('/', (req, res) => {
    res.json(actividades);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    var {json} = "";
    _.each(actividades, (actividad, i) => {
        if(actividad.id === id) {
            json = actividad;
        }
    });
    res.json(json);
});

router.post('/', (req, res) => {
    const idnumb =  actividades.length + 1;
    const id = "" + idnumb;
    const {fecha, hora_i, hora_f, lugar, tipo, cantidad, expositor, descripcion, puntuacion } = req.body;
    const newactividad = { id, ...req.body };
    if(id && fecha) {
        actividades.push(newactividad);
        res.json(actividades);
        let data = JSON.stringify(actividades);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\actividades.json', data)

    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {fecha, hora_i ,hora_f , lugar, tipo, cantidad, expositor, descripcion, puntuacion } = req.body;
    if (id && fecha) {
        _.each(actividades, (actividad, i) => {
            if (actividad.id === id) {
                actividad.fecha = fecha;
                actividad.hora_i = hora_i;
                actividad.hora_f = hora_f;
                actividad.lugar = lugar;
                actividad.tipo = tipo;
                actividad.cantidad = cantidad;
                actividad.expositor = expositor;
                actividad.descripcion = descripcion;
                actividad.puntuacion = puntuacion;
            }
        });
        res.json(actividades);
        let data = JSON.stringify(actividades);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\actividades.json', data)
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(actividades, (actividad, i) => {
            if (actividad.id === id) {
                actividades.splice(i, 1);
            }
        });
        res.json(actividades);
        let data = JSON.stringify(actividades);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\actividades.json', data)
    }

});

module.exports = router;