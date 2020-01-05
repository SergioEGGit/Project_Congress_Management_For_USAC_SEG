import React, {Component} from "react";
import axios from "axios";
import Logo from "../Assets/login.jpg";
import {Table} from "react-bootstrap";
const $ = require("jquery");

class asignaractividades extends Component {


    constructor(props) {

        super(props);

        this.state = {
            actividades: [],
            variables: [],
            id_actividad: "",
            actividad: "",
            tipo: "",
            participante: "",
            asistencia: "pendiente",
            puntuacion: "0",
            comentario: ""

        };
        this.tablaclick = this.tablaclick.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response);
                this.setState({variables: response.data});
                const {variables} = this.state;
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
        $('table tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let id = $(this).find('td:eq(0)').html();
            let actividad = $(this).find('td:eq(6)').html();
            let tipo = $(this).find('td:eq(5)').html();
            alert("Actividad Seleccionada Con Exito");
            const variables = _this.state.variables;
            _this.setState(
                {
                    id_actividad: id,
                    actividad: actividad,
                    tipo: tipo,
                    participante: variables.nombre_miembro,
                    asistencia: "pendiente",
                    puntuacion: "-",
                    cometnario: ""
                });
        });

        event.preventDefault();
    }


    submitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/asignacionactividades', {
            id_actividad: this.state.id_actividad,
            actividad: this.state.actividad,
            tipo: this.state.tipo,
            participante: this.state.participante,
            asistencia: this.state.asistencia,
            puntuacion: this.state.puntuacion,
            comentario: this.state.comentario
        })
            .then(response => {
                console.log(response);
                alert('Asignación Realizada Con Exito');
            })
            .catch(error => {
                console.log(error.response)
            });
    };



    render() {
        const  {actividades}  = this.state;
        return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="loop"/>
                <label id="curso" name="labeli">Asignación De Actividades</label>
                <input name="buttoni" type="button" id="as" onClick={this.submitHandler} value="Asignar"/>

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
                            <th width="60">Descripción</th>
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
                                            <td>{actividad.descripcion}</td>
                                            <td>{actividad.expositor}</td>
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


export default  asignaractividades;