const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const geins = require('../../DB/gastoseingresos.json');




router.get('/', (req, res) => {
    res.json(geins);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    var {json} = "";
    _.each(geins, (gein, i) => {
        if(gein.id === id) {
            json = gein;
        }
    });
    res.json(json);
});

router.post('/', (req, res) => {
    const idnumb =  geins.length + 1;
    const id = "" + idnumb;
    const {codigo, descripcion, total, fecha, tipo ,subtipo} = req.body;
    const newgein = { id, ...req.body };
    if(id && codigo) {
        geins.push(newgein);
        res.json(geins);
        let data = JSON.stringify(geins);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\gastoseingresos.json', data)

    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {codigo, descripcion, total, fecha, tipo, subtipo } = req.body;
    if (id && codigo) {
        _.each(geins, (gein, i) => {
            if (gein.id === id) {
                gein.codigo = codigo;
                gein.descripcion = descripcion;
                gein.total = total;
                gein.fecha = fecha;
                gein.tipo = tipo;
                gein.subtipo = subtipo
            }
        });
        res.json(geins);
        let data = JSON.stringify(geins);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\gastoseingresos.json', data)
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(geins, (gein, i) => {
            if (gein.id === id) {
                geins.splice(i, 1);
            }
        });
        res.json(geins);
        let data = JSON.stringify(geins);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\gastoseingresos.json', data)
    }

});



module.exports = router;