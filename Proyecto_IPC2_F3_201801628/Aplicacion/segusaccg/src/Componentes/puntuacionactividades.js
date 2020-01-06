import React, {Component} from 'react';
import './asignarcursoses.css';
import axios from 'axios';
import {Table} from "react-bootstrap";
import Logo from "../Assets/login.jpg";
const $ = require("jquery");
const moment = require("moment");

class puntuacionactividades extends Component {


    constructor(props) {

        super(props);

        this.state = {
            actividades: [],
            cursos1: [],
            variables: [],
            codigo: "",
            nombre: "",
            seccion: "",
            universidad:"",
            titular: "",
            estudiante: "",
            curso: "",
            secciona: ""

        };
        this.tablaclick = this.tablaclick.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response);
                this.setState({variables: response.data});
                const {variables} = this.state;
                axios.get('http://localhost:4000/api/asignacionactividades')
                    .then(response => {
                        const arreglo = response.data.filter(d => d.participante === variables.nombre_miembro);

                        this.setState({actividades: arreglo})
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
        $('table tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let id = $(this).find('td:eq(0)').html();
            let id_actividad = $(this).find('td:eq(1)').html();
            let actividad = $(this).find('td:eq(2)').html();
            let tipo = $(this).find('td:eq(3)').html();
            let participante = $(this).find('td:eq(4)').html();
            let asistencia = $(this).find('td:eq(5)').html();

            if(asistencia === "pendiente") {
                alert("No Asistio A Esta Actividad Por Lo Que No Puede Puntearla");
            } else {
                axios.get(`http://localhost:4000/api/actividades/${id_actividad}`)
                    .then(response => {
                        let horaFinal = response.data.hora_f;
                        let horaActual = moment().format('HH:mm');
                        if(horaActual < horaFinal){
                            alert("Aún No Puede Puntear Esta Actividad, Puede Puntearla Hasta Las " + horaFinal);
                        }
                        if(horaActual >= horaFinal){
                            let punteo = prompt("Coloque Un Número Del 1 al 10 Para Puntear La Actividad", "");
                            if(punteo !== null){
                                if(punteo !== "") {
                                    if(punteo > 10) {
                                        alert("Debe Colocar Una Número Del Uno Al 10");
                                    } else {
                                        let comentario = prompt("Coloque La Razón De Su Calificación", "");
                                        if(comentario !== null) {
                                            if(comentario !== ""){
                                                axios.put(`http://localhost:4000/api/asignacionactividades/${id}`, {
                                                    id_actividad: id_actividad,
                                                    actividad: actividad,
                                                    tipo: tipo,
                                                    participante: participante,
                                                    asistencia: asistencia,
                                                    puntuacion: punteo,
                                                    comentario: comentario
                                                })
                                                    .then(response => {
                                                        console.log(response);
                                                        alert('Proceso Terminado Con Exito');
                                                        axios.get('http://localhost:4000/api/variables/1')
                                                            .then(response => {
                                                                console.log(response);
                                                                _this.setState({variables: response.data});
                                                                const {variables} = _this.state;
                                                                axios.get('http://localhost:4000/api/asignacionactividades')
                                                                    .then(response => {
                                                                        const arreglo = response.data.filter(d => d.participante === variables.nombre_miembro);

                                                                        _this.setState({actividades: arreglo})
                                                                    })
                                                                    .catch(error => {
                                                                        console.log(error)
                                                                    })

                                                            })
                                                            .catch(error => {
                                                                console.log(error)
                                                            })
                                                    })
                                                    .catch(error => {
                                                        console.log(error.response)
                                                    });
                                            } else {
                                                alert("No Puede Dejar Vacio Este Campo");
                                            }
                                        } else {

                                        }
                                    }
                                } else {
                                    alert("Debe De colocar Una Puntuacion");
                                }
                            } else {

                            }
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }

        });

        event.preventDefault();
    }

    render() {
        const  {actividades}  = this.state;
        return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="loop"/>
                <label id="curso" name="labeli">Puntuacion De Actividades</label>

               <div id="tabs">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Id_Actividad</th>
                            <th width="60">Actividad</th>
                            <th width="60">Tipo</th>
                            <th width="80">Participante</th>
                            <th width="60">Asistencia</th>
                            <th width="60">Puntuación</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            actividades.length ?
                                actividades.map(
                                    actividad =>

                                        <tr key={actividad.id} onClick={this.tablaclick}>
                                            <td>{actividad.id}</td>
                                            <td>{actividad.id_actividad}</td>
                                            <td>{actividad.actividad}</td>
                                            <td>{actividad.tipo}</td>
                                            <td>{actividad.participante}</td>
                                            <td>{actividad.asistencia}</td>
                                            <td>{actividad.puntuacion}</td>
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


export default  puntuacionactividades;