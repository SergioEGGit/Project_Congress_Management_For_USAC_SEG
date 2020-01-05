import React, {Component} from "react";
import './controlasistencia.css';
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
            usuarios: []

        };
        this.tablaclick = this.tablaclick.bind(this);
        this.tablaclick2 = this.tablaclick2.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response);
                this.setState({variables: response.data});
                axios.get('http://localhost:4000/api/actividades')
                    .then(response => {
                        this.setState({actividades: response.data})
                    })
                    .catch(error => {
                        console.log(error)
                    })

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
         $('#t2abs12121221 tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let id_arreglo = $(this).find('td:eq( 0 )').html();
            let id_asignacion = $(this).find('td:eq( 1 )').html();
            let reply = window.confirm("Desea Marcar La Asistencia De Este Estudiante A La Actividad");
            if(reply) {
                axios.put(`http://localhost:4000/api/asignacionactividades/${id_asignacion}`, {
                    id_actividad: usuarios[id_arreglo - 1].id_actividad,
                    actividad: usuarios[id_arreglo - 1].actividad,
                    tipo: usuarios[id_arreglo - 1].tipo,
                    participante: usuarios[id_arreglo - 1].participante,
                    asistencia: "asistio",
                    puntuacion: usuarios[id_arreglo - 1].puntuacion,
                    comentario: usuarios[id_arreglo - 1].comentario
                })
                    .then(response => {
                        console.log(response);
                       alert('Proceso Terminado Con Exito');
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
             } else {

             }
        });

        event.preventDefault();
    }


    render() {
        const  {actividades, usuarios}  = this.state;
        let i = 0;
        return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="loop"/>
                <label id="curso" name="labeli">Control De Asistencia</label>

                <div id="tabs12121221">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Fecha</th>
                            <th width="60">Hora</th>
                            <th width="60">Lugar</th>
                            <th width="60">Tipo</th>
                            <th width="60">Cantidad</th>
                            <th width="60">Expositor</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            actividades.length ?
                                actividades.map(
                                    actividad =>
                                        <tr key={actividad.id} onClick={this.tablaclick}>
                                            <td>{actividad.id}</td>
                                            <td>{actividad.fecha}</td>
                                            <td>{actividad.hora_i}</td>
                                            <td>{actividad.hora_f}</td>
                                            <td>{actividad.lugar}</td>
                                            <td>{actividad.tipo}</td>
                                            <td>{actividad.cantidad}</td>
                                            <td>{actividad.expositor}</td>
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