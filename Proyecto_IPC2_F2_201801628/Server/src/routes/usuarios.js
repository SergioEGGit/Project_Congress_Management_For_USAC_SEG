const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const usuarios = require('../../DB/usuarios.json');

router.get('/', (req, res) => {
    res.json(usuarios);
});

router.get('/:us', (req, res) => {
   const { us } = req.params;
   var {json} = "";
   _.each(usuarios, (usuario, i) => {
        if(usuario.us === us) {
            json = usuario;
        }
   });
    res.json(json);
});

router.get('/one/:id', (req, res) => {
    const { id } = req.params;
    var {json} = "";
    _.each(usuarios, (usuario, i) => {
        if(usuario.id === id) {
            json = usuario;
        }
    });
    res.json(json);
});

router.post('/', (req, res) => {
    const idnumb =  usuarios.length + 1;
    const id = "" + idnumb;
    const { identificacion , nombre, fechan, telefono, email, universidad, nacionalidad, us, pass, puesto, tipo } = req.body;
    const newUser = { id, ...req.body };
    if(id && identificacion && us && pass) {
        usuarios.push(newUser);
        res.json(usuarios);

    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { identificacion, nombre, fechan, telefono, email, universidad, nacionalidad, us, pass, puesto, tipo } = req.body;
    if (id && us && pass) {
        _.each(usuarios, (usuario, i) => {
            if (usuario.id === id) {
                usuario.identificacion = identificacion;
                usuario.nombre = nombre;
                usuario.fechan = fechan;
                usuario.telefono = telefono;
                usuario.email = email
                usuario.universidad = universidad;
                usuario.nacionalidad = nacionalidad;
                usuario.us = us;
                usuario.pass = pass;
                usuario.puesto = puesto;
                usuario.tipo = tipo;
            }
        });
        res.json(usuarios);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(usuarios, (usuario, i) => {
            if (usuario.id === id) {
                usuarios.splice(i, 1);
            }
        });
        res.json(usuarios);
    }
});



module.exports = router;