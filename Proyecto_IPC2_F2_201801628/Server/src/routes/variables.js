const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const variables = require('../../DB/variables.json');




router.get('/:id', (req, res) => {
    const { id } = req.params;
    var {json} = "";
    _.each(variables, (variable, i) => {
        if(variable.id === id) {
            json = variable;
        }
    });
    res.json(json);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {id_miembro,tipo_miembro, nombre_miembro, universidad_miembro, P_Login, P_Logout, P_RegistroU,P_RegistroP, P_RegistroCu, P_RegistroCo, P_RegistroA, P_Cargamasiva, P_Perfil, P_Inventario, P_AsignacionCo, P_AsignacionCu, P_AsignacionCa, P_Noticias, P_Actividades, P_Gastos } = req.body;
    if (id) {
        _.each(variables, (variable, i) => {
            if (variable.id === id) {
                variable.id_miembro = id_miembro;
                variable.tipo_miembro = tipo_miembro;
                variable.nombre_miembro = nombre_miembro;
                variable.universidad_miembro = universidad_miembro;
                variable.P_Login = P_Login;
                variable.P_Logout = P_Logout;
                variable.P_RegistroU = P_RegistroU;
                variable.P_RegistroP = P_RegistroP;
                variable.P_RegistroCu = P_RegistroCu;
                variable.P_RegistroCo = P_RegistroCo;
                variable.P_RegistroA = P_RegistroA;
                variable.P_Cargamasiva = P_Cargamasiva;
                variable.P_Perfil = P_Perfil;
                variable.P_Inventario = P_Inventario;
                variable.P_AsignacionCo = P_AsignacionCo;
                variable.P_AsignacionCu = P_AsignacionCu;
                variable.P_AsignacionCa = P_AsignacionCa;
                variable.P_Noticias = P_Noticias;
                variable.P_Actividades = P_Actividades;
                variable.P_Gastos = P_Gastos;
            }
        });
        res.json(variables);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});


module.exports = router;