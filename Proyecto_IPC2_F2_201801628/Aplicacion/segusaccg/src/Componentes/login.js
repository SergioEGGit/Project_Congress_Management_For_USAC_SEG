import React, {Component} from 'react';
import Logo from '../Assets/login.jpg';
import './login.css';
import axios from "axios";



class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: "",
            usuarios: [],
            id: "1",
            id_miembro: "",
            tipo_miembro: "",
            nombre_miembro: "",
            universidad_miembro: "",
            P_Login: false,
            P_Logout: true,
            P_RegistroU: true,
            P_RegistroP: true,
            P_RegistroCu: true,
            P_RegistroCo: true,
            P_RegistroA: true,
            P_Cargamasiva: true,
            P_Perfil: true,
            P_Inventario: true,
            P_AsignacionCo: true,
            P_AsignacionCu: true
        };

        this.handleOnchangeU = this.handleOnchangeU.bind(this);
        this.handleOnchangeP = this.handleOnchangeP.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearData = this.clearData.bind(this);
    }

    handleOnchangeU(event) {
        this.setState({user: event.target.value});
        const user = event.target.value;
        axios.get(`http://localhost:4000/api/usuarios/${user}`)
            .then(response => {
                this.setState({usuarios: response.data});
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            });
    }
    handleOnchangeP(event) {
        this.setState({pass: event.target.value});
    }

    clearData(){
        this.setState({user: "", pass: ""});
    }

    handleSubmit(event) {

        const  { usuarios }  = this.state;
        const user = this.state.user;
        const pass = this.state.pass;
        var id = this.state.id_miembro;
        var tipo = this.state.tipo_miembro;
        var nombre = this.state.nombre_miembro;
        var universidad = this.state.universidad_miembro;
        var Login = this.state.P_Login;
        var Logout = this.state.P_Logout;
        var RegistroU = this.state.P_RegistroU;
        var RegistroP = this.state.P_RegistroP;
        var RegistroCu = this.state.P_RegistroCu;
        var RegistroCo = this.state.P_RegistroCo;
        var RegistroA = this.state.P_RegistroA;
        var Cargamasiva = this.state.P_Cargamasiva;
        var Perfil = this.state.P_Perfil;
        var Inventario = this.state.P_Inventario;
        var AsignacionCo = this.state.P_AsignacionCo;
        var AsignacionCu = this.state.P_AsignacionCu;

        if(usuarios.us === user) {
            if(usuarios.pass === pass) {
                alert("Bienvendio " + usuarios.us);
                id = usuarios.id;
                tipo = usuarios.tipo;
                nombre = usuarios.nombre;
                universidad = usuarios.universidad;
                if(usuarios.tipo === "Administrador") {
                    Login = true;
                    Logout = false;
                    RegistroU = false;
                    RegistroP = false;
                    RegistroCu = false;
                    RegistroCo = false;
                    RegistroA  = false;
                    Cargamasiva = false;
                    Perfil = false;
                    Inventario = false;
                    AsignacionCo = false;
                    AsignacionCu = false;
                }
                if(usuarios.tipo === "Colaborador") {
                    Login = true;
                    Logout = false;
                    RegistroU = true;
                    RegistroP = true;
                    RegistroCu = true;
                    RegistroCo = true;
                    RegistroA  = true;
                    Cargamasiva = true;
                    Perfil = false;
                    Inventario = false;
                    AsignacionCo = false;
                    AsignacionCu = false;
                }
                if(usuarios.tipo === "Catedratico") {
                    Login = true;
                    Logout = false;
                    RegistroU = true;
                    RegistroP = true;
                    RegistroCu = true;
                    RegistroCo = true;
                    RegistroA  = true;
                    Cargamasiva = true;
                    Perfil = false;
                    Inventario = true;
                    AsignacionCo = true;
                    AsignacionCu = true;
                }
                if(usuarios.tipo === "Estudiante") {
                    Login = true;
                    Logout = false;
                    RegistroU = true;
                    RegistroP = true;
                    RegistroCu = true;
                    RegistroCo = true;
                    RegistroA  = true;
                    Cargamasiva = true;
                    Perfil = false;
                    Inventario = true;
                    AsignacionCo = true;
                    AsignacionCu = false;
                }
                window.location.assign('http://localhost:3000/home');
                axios.put('http://localhost:4000/api/variables/1', {
                    id_miembro: id,
                    tipo_miembro: tipo,
                    nombre_miembro: nombre,
                    universidad_miembro: universidad,
                    P_Login: Login,
                    P_Logout: Logout,
                    P_RegistroU: RegistroU,
                    P_RegistroP: RegistroP,
                    P_RegistroCu: RegistroCu,
                    P_RegistroCo: RegistroCo,
                    P_RegistroA: RegistroA,
                    P_Cargamasiva: Cargamasiva,
                    P_Perfil: Perfil,
                    P_Inventario: Inventario,
                    P_AsignacionCo: AsignacionCo,
                    P_AsignacionCu: AsignacionCu
                })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error.response)
                    });




                this.clearData();
            } else {
                alert("Su Contraseña Es Incorrecta");
                this.clearData();
            }
        } else {
            alert("Su Usuario No Existe En El Sistema");
            this.clearData();
        }
        event.preventDefault();
    }

    render() {

        return (
           <div className="cont" id="cont">
               <img src={Logo} alt="" width="96" height="100" id="log"/>
               <label id="lri" name="lri" >Ingreso</label>
               <label id="lru" name="lru">Usuario:</label>
               <input name="inu" type="text" required="required" id="inu"  value={this.state.user} onChange={this.handleOnchangeU} placeholder="Usuario"/>
               <label id="lrc" name="lrc">Contraseña:</label>
               <input name="bri" type="button" id="bri" onClick={this.handleSubmit} value="Ingresar "/>
               <input type="button" name="brr" id="brr" value="Registrarse"/>
               <input name="inp" type="password" required="required" id="inp" value={this.state.pass} onChange={this.handleOnchangeP} placeholder="Contraseña"/>

           </div>
        );
    }
}


export default  login;