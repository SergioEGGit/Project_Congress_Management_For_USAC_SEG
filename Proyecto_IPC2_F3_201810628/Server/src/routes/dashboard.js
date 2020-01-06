const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const dashboards = require('../../DB/dashboard.json');


router.get('/', (req, res) => {
    res.json(dashboards);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    var {json} = "";
    _.each(dashboards, (dashboard, i) => {
        if(dashboard.id === id) {
            json = dashboard;
        }
    });
    res.json(json);
});

router.post('/', (req, res) => {
    const idnumb =  dashboards.length + 1;
    const id = "" + idnumb;
    const {encabezado} = req.body;
    const newdashboard = { id, ...req.body };
    if(id && encabezado) {
        dashboards.push(newdashboard);
        res.json(dashboards);
        let data = JSON.stringify(dashboards);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\dashboard.json', data)
    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {encabezado} = req.body;
    if (id && encabezado) {
        _.each(dashboards, (dashboard, i) => {
            if (dashboard.id === id) {
                dashboard.encabezado = encabezado;
            }
        });
        res.json(dashboards);
        let data = JSON.stringify(dashboards);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\dashboard.json', data)
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(dashboards, (dashboard, i) => {
            if (dashboard.id === id) {
                dashboards.splice(i, 1);
            }
        });
        res.json(dashboards);
        let data = JSON.stringify(dashboards);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\dashboard.json', data)
    }

});


module.exports = router;