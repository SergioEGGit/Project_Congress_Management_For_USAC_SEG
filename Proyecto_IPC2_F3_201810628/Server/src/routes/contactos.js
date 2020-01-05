const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const contactos = require('../../DB/contactos.json');




router.get('/', (req, res) => {
    res.json(contactos);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    var {json} = "";
    _.each(contactos, (contacto, i) => {
        if(contacto.id === id) {
            json = contacto;
        }
    });
    res.json(json);
});

router.get('/one/:nombre', (req, res) => {
    const { nombre } = req.params;
    var {json} = "";
    _.each(contactos, (contacto, i) => {
        if(contacto.nombre === nombre) {
            json = contacto;
        }
    });
    res.json(json);
});

router.post('/', (req, res) => {
    const idnumb =  contactos.length + 1;
    const id = "" + idnumb;
    const {nombre, telefono, email, direccion, rol, oportunidades, encargado } = req.body;
    const newContacto = { id, ...req.body };
    if(id && rol && oportunidades) {
        contactos.push(newContacto);
        res.json(contactos);
        let data = JSON.stringify(contactos);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\contactos.json', data)
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
        let data = JSON.stringify(contactos);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\contactos.json', data)
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
        let data = JSON.stringify(contactos);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\contactos.json', data)
    }

});

module.exports = router;