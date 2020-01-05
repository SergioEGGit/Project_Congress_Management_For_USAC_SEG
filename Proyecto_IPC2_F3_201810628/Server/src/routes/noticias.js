const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const noticias = require('../../DB/noticias.json');


router.get('/', (req, res) => {
    res.json(noticias);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    var {json} = "";
    _.each(noticias, (noticia, i) => {
        if(noticia.id === id) {
            json = noticia;
        }
    });
    res.json(json);
});

router.post('/', (req, res) => {
    const idnumb =  noticias.length + 1;
    const id = "" + idnumb;
    const { id_miembro_p, nombre_miembro_p, titulo, descripcion } = req.body;
    const newNoticia = { id, ...req.body };
    if(id && titulo) {
        noticias.push(newNoticia);
        res.json(noticias);
        let data = JSON.stringify(noticias);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\noticias.json', data)
    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_miembro_p, nombre_miembro_p, titulo, descripcion } = req.body;
    if (id && titulo) {
        _.each(noticias, (noticia, i) => {
            if (noticia.id === id) {
                noticia.id_miembro_p = id_miembro_p;
                noticia.nombre_miembro_p = nombre_miembro_p;
                noticia.titulo = titulo;
                noticia.descripcion = descripcion
            }
        });
        res.json(noticias);
        let data = JSON.stringify(noticias);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\noticias.json', data)
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(noticias, (noticia, i) => {
            if (noticia.id === id) {
                noticias.splice(i, 1);
            }
        });
        res.json(noticias);
        let data = JSON.stringify(noticias);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\noticias.json', data)
    }

});



module.exports = router;