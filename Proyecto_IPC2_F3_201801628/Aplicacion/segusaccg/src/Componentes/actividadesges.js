import React, {Component} from 'react';
import './actividadesges.css';
import axios from 'axios';
import Logo from "../Assets/login.jpg";
import {Table} from "react-bootstrap";
const $ = require("jquery");


class actividadesges extends Component {


    constructor(props) {

        super(props);

        this.state = {
            actividades: [],
            actividades1: [],
            id: "",
            fecha: "",
            hora_i: "",
            hora_f: "",
            lugar: "",
            tipo: "",
            cantidad: "",
            expositor: "",
            descripcion: ""
        };
        this.tablaclick = this.tablaclick.bind(this);
        this.clearData = this.clearData.bind(this);

    }

    clearData(){
        this.setState(
            {
                id: "",
                fecha: "",
                hora_i: "",
                hora_f: "",
                lugar: "",
                tipo: "",
                cantidad: "",
                expositor: "",
                descripcion: "",
            }
        );
    }


    componentDidMount()
    {
        axios.get('http://localhost:4000/api/actividades')
            .then(response => {
                console.log(response);
                this.setState({actividades: response.data})
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
            axios.get(`http://localhost:4000/api/actividades/${dato}`)
                .then(response => {
                    console.log(response);
                    _this.setState({actividades1: response.data})
                })
                .catch(error => {
                    console.log(error)
                });
            const   us  = _this.state.actividades1;
            _this.setState(
                {
                    id: us.id,
                    fecha: us.fecha,
                    hora_i: us.hora_i,
                    hora_f: us.hora_f,
                    lugar: us.lugar,
                    tipo: us.tipo,
                    cantidad: us.cantidad,
                    expositor: us.expositor,
                    descripcion: us.descripcion
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
        alert("Actividad Modificada Con Exito");
        axios.put(`http://localhost:4000/api/actividades/${this.state.id}`, this.state)
            .then(response => {
                console.log(response);
                axios.get('http://localhost:4000/api/actividades')
                    .then(response => {
                        console.log(response);
                        this.setState({actividades: response.data})
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
        alert("Actividad Eliminada Con Exito");
        axios.delete(`http://localhost:4000/api/actividades/${this.state.id}`)
            .then(response => {
                console.log(response);
                axios.get('http://localhost:4000/api/actividades')
                    .then(response => {
                        console.log(response);
                        this.setState({actividades: response.data})
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
        const {actividades, fecha , hora_i, hora_f, lugar, tipo, cantidad, expositor, descripcion} = this.state;

        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="lop"/>
                <label id="lcap" name="labeli">Actividades</label>
                <label id="pi" name="labeli">Actividades</label>
                <label id="plco" name="labelu">Fecha:</label>
                <input name="fecha" type="date" required="required" id="pico" placeholder="Fecha" onChange={this.changeHandler} value={fecha}/>
                <label id="pln" name="labelp">Hora I:</label>
                <input name="hora_i" type="time" required="required" id="pin" placeholder="Hora Inicio" onChange={this.changeHandler} value={hora_i}/>
                <label id="pln456" name="labelp">Hora F:</label>
                <input name="hora_f" type="time" required="required" id="pin456" placeholder="Hora Final" onChange={this.changeHandler} value={hora_f}/>

                <label id="pld456" name="labelp">Lugar:</label>
                <input name="lugar" type="text" required="required" id="pid456" placeholder="Lugar" onChange={this.changeHandler} value={lugar}/>
                <label id="plc" name="labelp">Tipo:</label>
                <select id ="pic" name="tipo" onChange={this.changeHandler} value={tipo}>
                    <option id ="pic" value="Conferencia">Conferencia</option>
                    <option id ="pic" value="Taller">Taller</option>
                    <option id ="pic" value="Visita Tecnica">Visita Tecnica</option>
                </select>
                <label id="ple" name="labelp">Cantiadad:</label>
                <input name="cantidad" type="number" required="required" id="pie" placeholder="Cantidad" onChange={this.changeHandler} value={cantidad}/>
                <label id="plu" name="labelp">Expositor:</label>
                <input name="expositor" type="text" required="required" id="piu" placeholder="Expositor" onChange={this.changeHandler} value={expositor}/>
                <label id="ples" name="labelp">Descripción:</label>
                <textarea name="descripcion" type="text" required="required" id="pcombo" placeholder="Descripcion" onChange={this.changeHandler}  value={descripcion}/>

                <input name="buttoni" type="button" id="pbc22" onClick={this.submitModificar} value="Modificar"/>
                <input name="buttonr" type="button" id="pbg22" onClick={this.submitEliminar} value="Eliminar"/>





                <div id="tablep">
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





            </div>

        );
    }





}


export default  actividadesges;