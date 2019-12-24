const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

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
    const {codigo, descripcion, total, fecha, tipo } = req.body;
    const newgein = { id, ...req.body };
    if(id && codigo) {
        geins.push(newgein);
        res.json(geins);

    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {codigo, descripcion, total, fecha, tipo } = req.body;
    if (id && codigo) {
        _.each(geins, (gein, i) => {
            if (gein.id === id) {
                gein.codigo = codigo;
                gein.descripcion = descripcion;
                gein.total = total;
                gein.fecha = fecha;
                gein.tipo = tipo;
            }
        });
        res.json(geins);
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
    }

});

module.exports = router;