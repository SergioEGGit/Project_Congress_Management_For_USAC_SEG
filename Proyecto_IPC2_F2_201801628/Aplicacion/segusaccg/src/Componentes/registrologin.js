import React, {Component} from 'react';
import './registrologin.css';
import axios from 'axios';
import Logo from '../Assets/login.jpg';

class registrologin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            identificacion: "",
            nombre: "",
            fechan: "",
            telefono:"",
            email: "",
            universidad: "",
            nacionalidad: "",
            us: "",
            pass: "",
            puesto: "",
            tipo: ""
        };
        this.clearData = this.clearData.bind(this);

    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state);
        axios.post('http://localhost:4000/api/usuarios', this.state)
            .then(response => {
                console.log(response);
                alert('Registrado Con Exito');
                window.location.assign('http://localhost:3000/login');
            })
            .catch(error => {
                console.log(error.response)
            });
        this.clearData();
    };

    clearData(){
        this.setState(
            {
                id: "",
                identificacion: "",
                nombre: "",
                fechan: "",
                telefono: "",
                email: "",
                universidad: "",
                nacionalidad: "",
                us: "",
                pass: "",
                puesto: "",
                tipo: ""
            }
        );
    }

    render() {
        const {identificacion, nombre, fechan, telefono, email, universidad, nacionalidad, us , pass, puesto ,tipo } = this.state;
        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="logo"/>
                <label id="lr" name="labeli">Registro</label>

                <label id="labelid" name="labelu">Identificacion:</label>
                <input name="identificacion" type="number" required="required" id="textfieldid" value={identificacion} onChange={this.changeHandler} placeholder="Identificacion"/>
                <label id="labeln" name="labelp">Nombre:</label>
                <input name="nombre" type="text" required="required" id="textfieldn" value={nombre} onChange={this.changeHandler} placeholder="Nombre"/>
                <label id="labelf" name="labelp">Fecha De Nacimiento:</label>
                <input name="fechan" type="date" required="required" id="textfieldf" value={fechan} onChange={this.changeHandler} placeholder="Fecha De Nacimiento"/>
                <label id="labelt" name="labelp">Teléfono:</label>
                <input name="telefono" type="number" required="required" id="textfieldt"  value={telefono} onChange={this.changeHandler} placeholder="Teléfono"/>
                <label id="labele" name="labelp">E-mail:</label>
                <input name="email" type="e-mail" required="required" id="textfielde" value={email} onChange={this.changeHandler} placeholder="E-mail"/>
                <label id="labelu" name="labelp">Universidad:</label>
                <input name="universidad" type="text" required="required" id="textfieldu" value={universidad} onChange={this.changeHandler} placeholder="Universidad"/>
                <label id="labelna" name="labelp">Nacionalidad:</label>
                <label id="labelus" name="labelp">Usuario:</label>
                <input name="us" type="text" required="required" id="textfieldus" value={us} onChange={this.changeHandler} placeholder="Usuario"/>
                <label id="labelpa" name="labelp">Contraseña:</label>
                <input name="pass" type="password" required="required" id="textfieldpa" value={pass} onChange={this.changeHandler} placeholder="Contraseña"/>
                <label id="labelti1" name="labelp">Tipo:</label>
                <select id ="comboti1" name="tipo" onChange={this.changeHandler} value={tipo}>
                    <option id ="comboti" value="Catedratico">Catedratico</option>
                    <option id ="comboti" value="Estudiante">Estudiante</option>
                </select>
                <input name="bur" type="button" id="bur" onClick={this.submitHandler} value="Registrarse"/>
                <input name="nacionalidad" type="text" id="textfieldna" value={nacionalidad} onChange={this.changeHandler} placeholder="Nacionalidad"/>
            </div>
        );
    }
}


export default  registrologin;