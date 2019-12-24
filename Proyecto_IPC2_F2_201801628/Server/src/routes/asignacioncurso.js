const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
    const {estudiante, curso, secciona} = req.body;
    const newAsignacion = { id, ...req.body };
    if(id && estudiante) {
        asignacioncursos.push(newAsignacion);
        res.json(asignacioncursos);

    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {nombre, telefono, email, direccion, rol, oportunidades, encargado } = req.body;
    if (id && nombre) {
        _.each(contactos, (contacto, i) => {
            if (contacto.id === id) {
                contacto.nombre = nombre;
                contacto.telefono = telefono;
                contacto.email = email;
                contacto.direccion = direccion;
                contacto.rol = rol;
                contacto.oportunidades = oportunidades;
                contacto.encargado = encargado;
            }
        });
        res.json(contactos);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(contactos, (contacto, i) => {
            if (contacto.id === id) {
                contactos.splice(i, 1);
            }
        });
        res.json(contactos);
    }

});

module.exports = router;