import React, {Component} from 'react';
import './gestionarus.css';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Logo from "../Assets/login.jpg";
const $ = require("jquery");


class gestionarus extends Component {


    constructor(props) {

        super(props);

        this.state = {
            usuarios: [],
            usuarios1: [],
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
        };
        this.tablaclick = this.tablaclick.bind(this);
        this.clearData = this.clearData.bind(this);

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


      componentDidMount()
    {
        axios.get('http://localhost:4000/api/usuarios')
            .then(response => {
                console.log(response);
                this.setState({usuarios: response.data})
            })
            .catch(error => {
                console.log(error)
            });


    }

    tablaclick(event){
        let _this = this;
    $('table tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            var dato = $(this).find('td:first').html();
            console.log(dato);
        axios.get(`http://localhost:4000/api/usuarios/one/${dato}`)
            .then(response => {
                console.log(response);
                _this.setState({usuarios1: response.data})
            })
            .catch(error => {
                console.log(error)
            });
        const   us  = _this.state.usuarios1;
        _this.setState(
            {
                id: us.id,
                identificacion: us.identificacion,
                nombre: us.nombre,
                fechan: us.fechan,
                telefono: us.telefono,
                email: us.email,
                universidad: us.universidad,
                nacionalidad: us.nacionalidad,
                us: us.us,
                pass: us.pass,
                puesto: us.puesto,
                tipo: us.tipo
            });
        });

        event.preventDefault();
     }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };


    submitModificar = e => {
        e.preventDefault();
        console.log(this.state);
        axios.put(`http://localhost:4000/api/usuarios/${this.state.id}`, this.state)
            .then(response => {
                console.log(response);
                alert("Usuario Modificado Con Exito");
                axios.get('http://localhost:4000/api/usuarios')
                    .then(response => {
                        console.log(response);
                        this.setState({usuarios: response.data})
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error.response)
            });
        this.clearData();

    };

    submitEliminar = e => {
        e.preventDefault();
        console.log(this.state);
        axios.delete(`http://localhost:4000/api/usuarios/${this.state.id}`)
            .then(response => {
                console.log(response);
                alert("Usuario Eliminado Con Exito");
                axios.get('http://localhost:4000/api/usuarios')
                    .then(response => {
                        console.log(response);
                        this.setState({usuarios: response.data})
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error.response)
            });
        this.clearData();

    };


    render() {
        const {usuarios, identificacion, nombre, fechan, telefono, email, universidad, nacionalidad, us , pass, puesto ,tipo } = this.state;
        return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="l"/>
                <label id="lcap" name="labeli">Usuarios</label>
                <label id="lbi" name="labeli">Gestión De Usuarios</label>
                <label id="lbid" name="labelu">Identificacion:</label>
                <input name="identificacion" type="number" required="required" id="ipid" placeholder="Identificacion" onChange={this.changeHandler} value={identificacion}/>
                <label id="lbn" name="labelp">Nombre:</label>
                <input name="nombre" type="text" required="required" id="ipn" placeholder="Nombre" onChange={this.changeHandler} value={nombre}/>
                <label id="lbf" name="labelp">Fecha De Nacimiento:</label>
                <input name="fechan" type="date" required="required" id="ipf" placeholder="Fecha De Nacimiento" onChange={this.changeHandler} value={fechan}/>
                <label id="lbt" name="labelp">Teléfono:</label>
                <input name="telefono" type="number" required="required" id="ipt" placeholder="Teléfono" onChange={this.changeHandler}  value={telefono}/>
                <label id="lbe" name="labelp">E-mail:</label>
                <input name="email" type="e-mail" required="required" id="ipe" placeholder="E-mail" onChange={this.changeHandler} value={email}/>
                <label id="lbu" name="labelp">Universidad:</label>
                <input name="universidad" type="text" required="required" id="ipu" placeholder="Universidad" onChange={this.changeHandler} value={universidad}/>
                <label id="lbna" name="labelp">Nacionalidad:</label>
                <label id="lbus" name="labelp">Usuario:</label>
                <input name="us" type="text" required="required" id="ipus" placeholder="Usuario" onChange={this.changeHandler} value={us}/>
                <label id="lbpa" name="labelp">Contraseña:</label>
                <input name="pass" type="password" required="required" id="ippa" placeholder="Contraseña" onChange={this.changeHandler} value={pass}/>
                <label id="lbp" name="labelp">Puesto:</label>
                <input name="puesto" type="text" required="required" id="ipp" placeholder="Puesto" onChange={this.changeHandler} value={puesto}/>
                <label id="lbti" name="labelp">Tipo:</label>
                <select name="tipo" id ="comti" onChange={this.changeHandler} value={tipo}>
                    <option id ="comboti" value="Administrador">Administrador</option>
                    <option id ="comboti" value="Colaborador">Colaborador</option>
                    <option id ="comboti" value="Catedratico">Catedratico</option>
                    <option id ="comboti" value="Estudiante">Estudiante</option>
                </select>
                <input name="buttoni" type="button" id="bumo" onClick={this.submitModificar} value="Modificar"/>
                <input name="buttonr" type="button" id="buel" onClick={this.submitEliminar} value="Eliminar"/>
                <input name="nacionalidad" type="text" id="ipna" placeholder="Nacionalidad" onChange={this.changeHandler} value={nacionalidad}/>




                <div id="tablep">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Identificación</th>
                            <th width="60">Nombre</th>
                            <th width="80">Fecha Nac.</th>
                            <th width="60">Teléfono</th>
                            <th width="60">Email</th>
                            <th width="60">Universidad</th>
                            <th width="60">Nacionalidad</th>
                            <th width="60">Usuario</th>
                            <th width="60">Puesto</th>
                            <th width="60">Tipo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            usuarios.length ?
                                usuarios.map(
                                    usuario =>
                                        <tr key={usuario.id} onClick={this.tablaclick}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.identificacion}</td>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.fechan}</td>
                                            <td>{usuario.telefono}</td>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.universidad}</td>
                                            <td>{usuario.nacionalidad}</td>
                                            <td>{usuario.us}</td>
                                            <td>{usuario.puesto}</td>
                                            <td>{usuario.tipo}</td>
                                        </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }





}


export default  gestionarus;