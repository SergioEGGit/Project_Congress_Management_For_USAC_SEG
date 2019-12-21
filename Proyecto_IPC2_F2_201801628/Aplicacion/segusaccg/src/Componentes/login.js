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
                Variables.G_Usuario = usuarios.us;
                Variables.G_Id = usuarios.id;
                Variables.G_Tipo = usuarios.tipo;
                alert("Bienvenido " + Variables.G_Usuario);
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
               <img src={Logo} alt="" width="96" height="100" id="logo"/>
               <label id="labeli" name="labeli">Ingreso</label>
               <label id="labelu" name="labelu">Usuario:</label>
               <input name="textfieldu" type="text" required="required" id="textfieldu"  value={this.state.user} onChange={this.handleOnchangeU} placeholder="Usuario"/>
               <label id="labelp" name="labelp">Contraseña:</label>
               <input name="textfieldp" type="password" required="required" id="textfieldp" value={this.state.pass} onChange={this.handleOnchangeP} placeholder="Contraseña"/>
               <input name="buttoni" type="button" id="buttoni" onClick={this.handleSubmit} value="Ingresar "/>
               <input type="button" name="buttonr" id="buttonr" value="Registrarse"/>
           </div>
        );
    }
}


export default  login;