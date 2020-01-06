const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const fs = require('fs');



const coffebreak = require('../../DB/coffebreak.json');

router.get('/', (req, res) => {
    res.json(coffebreak);

});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    var {json} = "";
    _.each(coffebreak, (coffe, i) => {
        if(coffe.id === id) {
            json = coffe;
        }
    });
    res.json(json);
});

router.post('/',   (req, res) => {
    const idnumb =  coffebreak.length + 1;
    const id = "" + idnumb;
    const { fecha_entrega, estudiante, coffe, insumo, almuerzo} = req.body;
    const newUProducto = { id, ...req.body };
    if(id && fecha_entrega) {
        coffebreak.push(newUProducto);
        res.json(coffebreak);

        let data = JSON.stringify(coffebreak);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F3_201801628\\Server\\DB\\coffebreak.json', data)


    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { fecha_entrega, estudiante, coffe, insumo, almuerzo} = req.body;
    if (id && fecha_entrega) {
        _.each(coffebreak, (coffes, i) => {
            if (coffes.id === id) {
                coffes.fecha_entrega = fecha_entrega;
                coffes.estudiante = estudiante;
                coffes.coffe = coffe;
                coffes.insumo = insumo;
                coffes.almuerzo = almuerzo;
            }
        });
        res.json(coffebreak);
        let data = JSON.stringify(coffebreak);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F3_201801628\\Server\\DB\\coffebreak.json', data)
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(coffebreak, (coffe, i) => {
            if (coffe.id === id) {
                coffebreak.splice(i, 1);
            }
        });
        res.json(coffebreak);
        let data = JSON.stringify(coffebreak);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F3_201801628\\Server\\DB\\coffebreak.json', data)
    }

});

module.exports = router;