import React, {Component} from 'react';
import './registrous.css';
import axios from 'axios';
import Logo from '../Assets/login.jpg';

class registrous extends Component {

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
        this.setState({[e.target.name]: e.target.value});
    };

    submitHandler = e => {
        e.preventDefault();
        const {us} = this.state;
        axios.get(`http://localhost:4000/api/usuarios/${us}`, this.state)
            .then(response => {
                console.log(response);
                if(response.data.us === undefined){
                    alert('Usuario Agreado Con Exito');
                    console.log(this.state);
                    axios.post('http://localhost:4000/api/usuarios', this.state)
                        .then(response => {
                            console.log(response);
                        })
                        .catch(error => {
                            console.log(error.response)
                        });
                    this.clearData();
                } else {
                    alert('El Usuario Existe En El Sistema');
                    this.setState({us: ""});
                }
            })
            .catch(error => {
                console.log(error.response)
            });
    };


    gestionar() {
        window.location.assign('http://localhost:3000/gestionarus');
    }

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
                <label id="labeli" name="labeli">Registro De Usuarios</label>

                <label id="labelid" name="labelu">Identificacion:</label>
                <input name="identificacion" type="number" required="required" id="textfieldid" value={identificacion} onChange={this.changeHandler} placeholder="Identificacion"/>
                    <label id="labeln" name="labelp">Nombre:</label>
                    <input name="nombre" type="text" required="required" id="textfieldn" value={nombre} onChange={this.changeHandler} placeholder="Nombre"/>
                        <label id="labelf" name="labelp">Fecha De Nacimiento:</label>
                        <input name="fechan" type="date" required="required" id="textfieldf" value={fechan} onChange={this.changeHandler} placeholder="Fecha De Nacimiento"/>
                            <label id="labelt" name="labelp">Teléfono:</label>
                            <input name="telefono" type="number" required="required" maxLength="9" id="textfieldt"  value={telefono} onChange={this.changeHandler} placeholder="Teléfono"/>
                                <label id="labele" name="labelp">E-mail:</label>
                                <input name="email" type="e-mail" required="required" id="textfielde" value={email} onChange={this.changeHandler} placeholder="E-mail"/>
                                    <label id="labelu" name="labelp">Universidad:</label>
                                    <input name="universidad" type="text" required="required" id="textfieldu" value={universidad} onChange={this.changeHandler} placeholder="Universidad"/>
                                        <label id="labelna" name="labelp">Nacionalidad:</label>
                                        <label id="labelus" name="labelp">Usuario:</label>
                                        <input name="us" type="text" required="required" id="textfieldus" value={us} onChange={this.changeHandler} placeholder="Usuario"/>
                                            <label id="labelpa" name="labelp">Contraseña:</label>
                                            <input name="pass" type="password" required="required" id="textfieldpa" value={pass} onChange={this.changeHandler} placeholder="Contraseña"/>
                                                <label id="labelp" name="labelp">Puesto:</label>
                                                <input name="puesto" type="text" required="required" id="textfieldp" value={puesto} onChange={this.changeHandler} placeholder="Puesto"/>
                                                    <label id="labelti" name="labelp">Tipo:</label>
                                                    <select id ="comboti" name="tipo" onChange={this.changeHandler} value={tipo}>
                                                        <option id ="comboti" value="Administrador">Administrador</option>
                                                        <option id ="comboti" value="Colaborador">Colaborador</option>
                                                        <option id ="comboti" value="Catedratico">Catedratico</option>
                                                        <option id ="comboti" value="Estudiante">Estudiante</option>
                                                    </select>
                                                    <input name="buttoni" type="button" id="buttoni" onClick={this.submitHandler} value="Crear"/>
                                                        <input type="button" name="buttonr" id="buttonr" onClick={this.gestionar} value="Gestionar"/>
                                                            <input name="nacionalidad" type="text" id="textfieldna" value={nacionalidad} onChange={this.changeHandler} placeholder="Nacionalidad"/>
            </div>
        );
    }
}


export default  registrous;


