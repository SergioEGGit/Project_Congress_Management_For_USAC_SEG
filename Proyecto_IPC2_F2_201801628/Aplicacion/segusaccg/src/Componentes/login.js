import React, {Component} from 'react';
import Logo from '../Assets/login.jpg';
import './login.css';
import axios from "axios";
import Variables from './variables';






class login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: "",
            usuarios: []
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
        if(usuarios.us === user) {
            if(usuarios.pass === pass) {
                Variables.G_Id = usuarios.id;
                Variables.G_Usuario = usuarios.us;
                Variables.G_Tipo = usuarios.tipo;
                alert("Bienvendio ");
                if(usuarios.tipo === "Administrador") {
                     Variables.P_Login = true;
                     Variables.P_Home = false;
                     Variables.P_Registrous = false;
                }
                if(usuarios.tipo === "Colaborador") {
                    Variables.P_Login = true;
                    Variables.P_Home = false;
                    Variables.P_Registrous = true;
                }
                if(usuarios.tipo === "Catedratico") {
                    Variables.P_Login = true;
                    Variables.P_Home = false;
                    Variables.P_Registrous = true;
                }
                if(usuarios.tipo === "Estudiante") {
                    Variables.P_Login = true;
                    Variables.P_Home = false;
                    Variables.P_Registrous = true;
                }
                window.location.assign('http://localhost:3000/home');
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
               <label id="lri" name="lri">Ingreso</label>
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