import React, {Component} from 'react';
import './asignarcursoses.css';
import axios from 'axios';
import {Table} from "react-bootstrap";
import Logo from "../Assets/login.jpg";
const $ = require("jquery");

class peticionmensaje extends Component {


    constructor(props) {

        super(props);

        this.state = {
            peticion: [],
            peticion1: [],
            variables: [],
            peticion_r: "",
            peticion_d: "",
            estado: "",
            peticion_r2: "",
            peticion_d2: "",
            estado2: "",
            usuarios: [],
            peticionmensaje: [],
            id_put: []

        };
        this.tablaclick = this.tablaclick.bind(this);
        this.tablaclick2 = this.tablaclick2.bind(this);
    }

    componentDidMount() {

        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                this.setState({variables: response.data});
                let user = response.data.nombre_miembro;
                axios.get('http://localhost:4000/api/usuarios')
                    .then(response => {
                        console.log(response);
                        const arreglo = response.data.filter(d => d.tipo === "Estudiante" && d.us !== user);
                        console.log(arreglo);
                        this.setState({usuarios: arreglo})
                    })
                    .catch(error => {
                        console.log(error)
                    });

                axios.get('http://localhost:4000/api/peticionmensaje')
                    .then(response => {
                        console.log(response);
                        const arreglo = response.data.filter(d => d.peticion_d === user && d.estado === "pendiente");
                        console.log(arreglo);
                        this.setState({peticionmensaje: arreglo})
                    })
                    .catch(error => {
                        console.log(error)
                    });
            });

    }

    tablaclick(event){
        let _this = this;
        const {variables} = this.state;
        $('table tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let dato = $(this).find('td:eq( 1 )').html();
            console.log(dato);
            _this.setState(
                {
                    peticion_r: variables.nombre_miembro,
                    peticion_d: dato,
                    estado: "pendiente"
                });
        });
        event.preventDefault();
    }

    tablaclick2(event){
        let _this = this;
        const {variables} = this.state;
        $('table tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let dato = $(this).find('td:eq( 1 )').html();
            let id = $(this).find('td:eq( 0 )').html();
            console.log(dato);
            console.log(id);
            _this.setState(
                {
                    peticion_r2: variables.nombre_miembro,
                    peticion_d2: dato,
                    peticion_r: dato,
                    peticion_d: variables.nombre_miembro,
                    estado2: "aprobada",
                    estado: "aprobada",
                    id_put: id
                });
        });
        event.preventDefault();
    }


    submitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/peticionmensaje', {
            peticion_r: this.state.peticion_r,
            peticion_d: this.state.peticion_d,
            estado: this.state.estado
        })
            .then(response => {
                console.log(response);
                alert('Solicitud Envidada Con Exito');
            })
            .catch(error => {
                console.log(error.response)
            });
    };

    submitAceptar = e => {
        e.preventDefault();

        axios.put(`http://localhost:4000/api/peticionmensaje/${this.state.id_put}`, {
            peticion_r: this.state.peticion_r,
            peticion_d: this.state.peticion_d,
            estado: this.state.estado2
        })
            .then(response => {
                console.log(response);
                alert('Solicitud Aceptada Con Exito');
                axios.post('http://localhost:4000/api/peticionmensaje', {
                    peticion_r: this.state.peticion_r2,
                    peticion_d: this.state.peticion_d2,
                    estado: this.state.estado2
                })
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error.response)
                    });

            })
            .catch(error => {
                console.log(error.response)
            });
    };



    render() {
        const  {usuarios, peticionmensaje}  = this.state;
        return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="loop"/>
                <label id="curso" name="labeli">Petición De Mensajes</label>
                <label id="curso22" name="labeli">Peticiones Pendientes</label>
                <input name="buttoni" type="button" id="as11" onClick={this.submitHandler} value="Enviar Solicitud"/>
                <input name="buttoni" type="button" id="asas11" onClick={this.submitAceptar} value="Aceptar Solicitud"/>
                <div id="tabs">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Usuario</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            usuarios.length ?
                                usuarios.map(
                                    usuario =>

                                        <tr key={usuario.id} onClick={this.tablaclick}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.us}</td>
                                         </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>


                <div id="tabs2">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Usuario</th>
                            <th width="60">Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            peticionmensaje.length ?
                                peticionmensaje.map(
                                    peticion =>

                                        <tr key={peticion.id} onClick={this.tablaclick2}>
                                            <td>{peticion.id}</td>
                                            <td>{peticion.peticion_r}</td>
                                            <td>{peticion.estado}</td>
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
export default  peticionmensaje;