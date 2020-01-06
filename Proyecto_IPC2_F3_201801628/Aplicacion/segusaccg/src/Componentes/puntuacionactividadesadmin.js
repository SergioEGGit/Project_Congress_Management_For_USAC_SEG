import React, {Component} from 'react';
import './asignarcursoses.css';
import axios from 'axios';
import {Table} from "react-bootstrap";
import Logo from "../Assets/login.jpg";
const $ = require("jquery");
const moment = require("moment");

class puntuacionactividadesadmin extends Component {


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
        axios.get('http://localhost:4000/api/actividades')
            .then(response => {
                console.log(response);
                this.setState({actividades: response.data});
            })
            .catch(error => {
                console.log(error)
            });
        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response);
                this.setState({variables: response.data});
            })
            .catch(error => {
                console.log(error)
            })


    }

    tablaclick(event){
        let _this = this;
        const {variables} = this.state;
        $('table tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let id = $(this).find('td:eq(0)').html();
            let actividad = $(this).find('td:eq(8)').html();
            let tipo = $(this).find('td:eq(5)').html();
            axios.get(`http://localhost:4000/api/actividades/${id}`)
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
                                            axios.post('http://localhost:4000/api/asignacionactividades', {
                                                id_actividad: id,
                                                actividad: actividad,
                                                tipo: tipo,
                                                participante: variables.nombre_miembro,
                                                asistencia: "asistio",
                                                puntuacion: punteo,
                                                comentario: comentario
                                            })
                                                .then(response => {
                                                    console.log(response);
                                                    alert('Asignación Realizada Con Exito');
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
                            <th width="60">Fecha</th>
                            <th width="60">Hora Inicio</th>
                            <th width="60">Hora Final</th>
                            <th width="60">Lugar</th>
                            <th width="60">Tipo</th>
                            <th width="60">Cantidad</th>
                            <th width="60">Expositor</th>
                            <th width="60">Actividad</th>
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
                                            <td>{actividad.descripcion}</td>
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


export default puntuacionactividadesadmin;