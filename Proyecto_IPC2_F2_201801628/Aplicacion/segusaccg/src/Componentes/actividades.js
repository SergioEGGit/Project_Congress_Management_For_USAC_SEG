import React, {Component} from 'react';
import './actividades.css';
import axios from 'axios';
import Logo from "../Assets/login.jpg";
import {Table} from "react-bootstrap";


class actividades extends Component {


    constructor(props) {

        super(props);

        this.state = {
            id: "",
            fecha: "",
            hora: "",
            lugar: "",
            tipo: "",
            cantidad: "",
            expositor: "",
            descripcion: "",
            actividades: []
        }

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
            })

    }

    clearData(){
        this.setState(
            {
                id: "",
                fecha: "",
                hora: "",
                lugar: "",
                tipo: "",
                cantidad: "",
                expositor: "",
                descripcion: ""
            }
        );
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state.codigo);
        axios.post('http://localhost:4000/api/actividades', {
            fecha: this.state.fecha,
            hora: this.state.hora,
            lugar: this.state.lugar,
            tipo: this.state.tipo,
            cantidad: this.state.cantidad,
            expositor: this.state.expositor,
            descripcion: this.state.descripcion
        })
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


    gestionar() {
        window.location.assign('http://localhost:3000/actividadesges');
    }

    render() {
        const {actividades, fecha , hora, lugar, tipo, cantidad, expositor, descripcion} = this.state;

        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="lop"/>
                <label id="lcap" name="labeli">Actividades</label>
                <label id="pi" name="labeli">Actividades</label>
                <label id="plco" name="labelu">Fecha:</label>
                <input name="fecha" type="date" required="required" id="pico" placeholder="Fecha" onChange={this.changeHandler} value={fecha}/>
                <label id="pln" name="labelp">Hora:</label>
                <input name="hora" type="time" required="required" id="pin" placeholder="Hora
                " onChange={this.changeHandler} value={hora}/>
                <label id="pld" name="labelp">Lugar:</label>
                <input name="lugar" type="text" required="required" id="pid" placeholder="Lugar" onChange={this.changeHandler} value={lugar}/>
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

                <input name="buttoni" type="button" id="pbc22" onClick={this.submitHandler} value="Crear"/>
                <input name="buttonr" type="button" id="pbg22" onClick={this.gestionar} value="Gestionar"/>





                <div id="tablep">
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
                                        <tr key={actividad.id} >
                                            <td>{actividad.id}</td>
                                            <td>{actividad.fecha}</td>
                                            <td>{actividad.hora}</td>
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


export default  actividades;