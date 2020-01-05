const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const mensajes = require('../../DB/mensajes.json');


router.get('/', (req, res) => {
    res.json(mensajes);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    var {json} = "";
    _.each(mensajes, (mensaje, i) => {
        if(mensaje.id === id) {
            json = mensaje;
        }
    });
    res.json(json);
});

router.post('/', (req, res) => {
    const idnumb =  mensajes.length + 1;
    const id = "" + idnumb;
    const { usuario_remitente, usuario_destinatario, asunto, cuerpo } = req.body;
    const newMensaje = { id, ...req.body };
    if(id && asunto && cuerpo) {
        mensajes.push(newMensaje);
        res.json(mensajes);
        let data = JSON.stringify(mensajes);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\mensajes.json', data)
    } else {
        res.status(500).json({error: 'Hubo Algun Error'});
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { usuario_remitente, usuario_destinatario, asunto, cuerpo } = req.body;
    if (id && asunto && cuerpo) {
        _.each(mensajes, (mensaje, i) => {
            if (mensaje.id === id) {
                mensaje.usuario_remitente = usuario_remitente;
                mensaje.usuario_destinatario = usuario_destinatario;
                mensaje.asunto = asunto;
                mensaje.cuerpo = cuerpo
            }
        });
        res.json(mensajes);
        let data = JSON.stringify(mensajes);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\mensajes.json', data)
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(mensajes, (mensaje, i) => {
            if (mensaje.id === id) {
                mensajes.splice(i, 1);
            }
        });
        res.json(mensajes);
        let data = JSON.stringify(mensajes);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\mensajes.json', data)
    }

});



module.exports = router;