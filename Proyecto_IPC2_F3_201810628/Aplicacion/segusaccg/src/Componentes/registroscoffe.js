import React, {Component} from "react";
import './registrocoffe.css';
import axios from "axios";
import Logo from "../Assets/login.jpg";
import {Table} from "react-bootstrap";
const $ = require("jquery");


class controlasistencia extends Component {


    constructor(props) {

        super(props);

        this.state = {
            actividades: [],
            variables: [],
            actividad: "",
            tipo: "",
            participante: "",
            asistencia: "pendiente",
            usuarios: [],
            estudiante: ""

        };
        this.tablaclick = this.tablaclick.bind(this);
        this.tablaclick2 = this.tablaclick2.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/gastoseingresos')
            .then(response => {
                console.log(response);
                const arreglo = response.data.filter(d => d.subtipo === "Venta Entradas");
                this.setState({usuarios: arreglo});
            })
            .catch(error => {
                console.log(error)
            })

    }


    tablaclick(event){
        let _this = this;
        $('#tabs12121221 tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let dato = $(this).find('td:eq( 0 )').html();
            axios.get('http://localhost:4000/api/asignacionactividades')
                .then(response => {
                    const arreglo = response.data.filter(d => d.id_actividad === dato);
                    _this.setState({usuarios: arreglo})
                })
                .catch(error => {
                    console.log(error)
                })
        });
        event.preventDefault();
    }

    tablaclick2(event){
        let _this = this;
        const {usuarios} = this.state;
        $('#t2abs12121221 tr').on('click',function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let dato = $(this).find('td:eq( 3 )').html();



        });
        event.preventDefault();
    }


    render() {
        const  {actividades, usuarios}  = this.state;
        let i = 0;
        return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="loop"/>
                <label id="curso" name="labeli">Control De Entregas</label>

                <div id="t1212">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Codigo</th>
                            <th width="60">Fecha</th>
                            <th width="60">Estudiante</th>
                            <th width="60">Descripción</th>
                            <th width="60">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            usuarios.length ?
                                usuarios.map(
                                    usuario =>
                                        <tr key={usuario.id} onClick={this.tablaclick}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.codigo}</td>
                                            <td>{usuario.fecha}</td>
                                            <td>{usuario.estudiante}</td>
                                            <td>{usuario.descripcion}</td>
                                            <td>{usuario.total}</td>
                                        </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>

                <div id="t2abs12121221">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Asignación</th>
                            <th width="60">Actividad</th>
                            <th width="60">Participante</th>
                            <th width="60">Asistencia</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            usuarios.length ?
                                usuarios.map(
                                    usuario =>
                                        <tr key={i += 1} onClick={this.tablaclick2}>
                                            <td>{i}</td>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.id_actividad}</td>
                                            <td>{usuario.participante}</td>
                                            <td>{usuario.asistencia}</td>
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


export default  controlasistencia;