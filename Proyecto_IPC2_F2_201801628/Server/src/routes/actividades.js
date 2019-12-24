const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
    const {fecha, hora, lugar, tipo, cantidad, expositor, descripcion } = req.body;
    const newactividad = { id, ...req.body };
    if(id && fecha) {
        actividades.push(newactividad);
        res.json(actividades);

    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {fecha, hora, lugar, tipo, cantidad, expositor, descripcion } = req.body;
    if (id && fecha) {
        _.each(actividades, (actividad, i) => {
            if (actividad.id === id) {
                actividad.fecha = fecha;
                actividad.hora = hora;
                actividad.lugar = lugar;
                actividad.tipo = tipo;
                actividad.cantidad = cantidad;
                actividad.expositor = expositor;
                actividad.descripcion = descripcion;
            }
        });
        res.json(actividades);
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
    }

});

module.exports = router;