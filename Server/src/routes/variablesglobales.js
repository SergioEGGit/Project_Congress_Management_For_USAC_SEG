const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const variablesglobales = require('../../DB/variablesglobales.json');

router.get('/:id', (req, res) => {
    const { id } = req.params;
    let {json} = "";
    _.each(variablesglobales, (variablesglobal, i) => {
        if(variablesglobal.id === id) {
            json = variablesglobal;
        }
    });
    res.json(json);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {id_noticia_comentario} = req.body;
    if (id) {
        _.each(variablesglobales, (variablesglobal, i) => {
            if (variablesglobal.id === id) {
                variablesglobal.id_noticia_comentario = id_noticia_comentario;
               }
        });
        res.json(variablesglobales);
        let data = JSON.stringify(variablesglobales);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F3_201801628\\Server\\DB\\variablesglobales.json', data)
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});


module.exports = router;