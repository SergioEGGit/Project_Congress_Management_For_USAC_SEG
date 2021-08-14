const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const comentarios = require('../../DB/comentario.json');


router.get('/', (req, res) => {
    res.json(comentarios);
});

router.post('/', (req, res) => {
    const idnumb =  comentarios.length + 1;
    const id = "" + idnumb;
    const { id_noticia, usuario_co, comentario, estado, descripcion} = req.body;
    const newComentario = { id, ...req.body };
    if(id && comentario) {
        comentarios.push(newComentario);
        res.json(comentarios);
        let data = JSON.stringify(comentarios);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F3_201801628\\Server\\DB\\comentario.json', data)
    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_noticia, usuario_co, comentario, estado, descripcion} = req.body;
    if (id && comentario) {
        _.each(comentarios, (come, i) => {
            if (come.id === id) {
                come.id_noticia = id_noticia;
                come.usuario_co = usuario_co;
                come.comentario = comentario;
                come.estado = estado;
                come.descripcion = descripcion;
            }
        });
        res.json(comentarios);
        let data = JSON.stringify(comentarios);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F3_201801628\\Server\\DB\\comentario.json', data)
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(comentarios, (come, i) => {
            if (come.id === id) {
                comentarios.splice(i, 1);
            }
        });
        res.json(comentarios);
        let data = JSON.stringify(comentarios);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F3_201801628\\Server\\DB\\comentario.json', data)
    }

});



module.exports = router;