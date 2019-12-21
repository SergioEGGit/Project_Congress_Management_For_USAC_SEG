const { Router } = require('express');
const router = Router();
const _ = require('underscore');

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

router.post('/', (req, res) => {
    const id = usuarios.length + 1;
    const { nombre, pass } = req.body;
    const newUser = {id, ...req.body};
    if (id && nombre && pass) {
        usuarios.push(newUser);
        res.json(usuarios);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, pass } = req.body;
    if (id && nombre && pass) {
        _.each(usuarios, (usuario, i) => {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                usuario.pass = pass;
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