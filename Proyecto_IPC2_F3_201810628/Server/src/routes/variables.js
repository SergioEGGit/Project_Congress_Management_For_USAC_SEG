const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

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
    const {id_miembro,tipo_miembro, nombre_miembro, universidad_miembro, P_Login, P_Logout, P_RegistroU,P_RegistroP, P_RegistroCu, P_RegistroCo, P_RegistroA, P_Cargamasiva, P_Perfil, P_Inventario, P_AsignacionCo, P_AsignacionCu, P_AsignacionCa, P_Noticias, P_Actividades, P_Gastos, P_Reportes, P_Reportescate, P_AsignacionAct, P_Denuncias, P_Puntuacion, P_ControlAsi, P_Dashboard, P_Coffe } = req.body;
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
                variable.P_Reportes = P_Reportes;
                variable.P_Reportescate = P_Reportescate;
                variable.P_AsignacionAct = P_AsignacionAct;
                variable.P_Denuncias = P_Denuncias;
                variable.P_Puntuacion = P_Puntuacion;
                variable.P_ControlAsi = P_ControlAsi;
                variable.P_Dashboard = P_Dashboard;
                variable.P_Coffe = P_Coffe;
            }
        });
        res.json(variables);
        let data = JSON.stringify(variables);
        fs.writeFileSync('C:\\ProyectoSergioEG201801628\\Proyecto_IPC2_F2_201801628\\Server\\DB\\variables.json', data)
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});


module.exports = router;