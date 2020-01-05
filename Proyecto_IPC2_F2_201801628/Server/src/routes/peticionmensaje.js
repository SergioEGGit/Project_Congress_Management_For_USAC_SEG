const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const peticionmensaje = require('../../DB/peticionmensaje.json');


router.get('/', (req, res) => {
    res.json(peticionmensaje);
});

router.post('/', (req, res) => {
    const idnumb =  peticionmensaje.length + 1;
    const id = "" + idnumb;
    const {peticion_r, peticion_d, estado} = req.body;
    const newPeticion = { id, ...req.body };
    if(id && estado) {
        peticionmensaje.push(newPeticion);
        res.json(peticionmensaje);
        let data = JSON.stringify(peticionmensaje);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\peticionmensaje.json', data)
    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {peticion_r, peticion_d, estado} = req.body;
    if (id) {
        _.each(peticionmensaje, (peticion, i) => {
            if (peticion.id === id) {
                peticion.peticion_r = peticion_r;
                peticion.peticion_d = peticion_d;
                peticion.estado = estado;
            }
        });
        res.json(peticionmensaje);
        let data = JSON.stringify(peticionmensaje);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\peticionmensaje.json', data)
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

module.exports = router;