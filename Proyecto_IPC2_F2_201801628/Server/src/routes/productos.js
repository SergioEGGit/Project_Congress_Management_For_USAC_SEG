const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const productos = require('../../DB/productos.json');

router.get('/', (req, res) => {
    res.json(productos);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    var {json} = "";
    _.each(productos, (producto, i) => {
        if(producto.id === id) {
            json = producto;
        }
    });
    res.json(json);
});

router.post('/', (req, res) => {
    const idnumb =  productos.length + 1;
    const id = "" + idnumb;
    const { codigo , nombre, descripcion, cantidad, encargado, ubicacion, estado } = req.body;
    const newUProducto = { id, ...req.body };
    if(id && codigo) {
        productos.push(newUProducto);
        res.json(productos);

    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { codigo , nombre, descripcion, cantidad, encargado, ubicacion, estado } = req.body;
    if (id && nombre) {
        _.each(productos, (producto, i) => {
            if (producto.id === id) {
                producto.codigo = codigo;
                producto.nombre = nombre;
                producto.descripcion = descripcion;
                producto.cantidad = cantidad;
                producto.encargado = encargado;
                producto.ubicacion = ubicacion;
                producto.estado = estado;
            }
        });
        res.json(productos);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(productos, (producto, i) => {
            if (producto.id === id) {
                productos.splice(i, 1);
            }
        });
        res.json(productos);
    }

});

module.exports = router;