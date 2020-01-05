import React, {Component} from 'react';
import './gastoseingresos.css';
import axios from 'axios';
import Logo from "../Assets/login.jpg";
import {Table} from "react-bootstrap";
const $ = require('jquery');

class gastoseingresos extends Component {


    constructor(props) {

        super(props);

        this.state = {
            id: "",
            codigo: "",
            descripcion: "",
            total: "",
            fecha: "",
            tipo:"",
            subtipo: "",
            estudiante: "",
            usuarios: [],
            gastoseingresos: []
        };
         this.tablaclick = this.tablaclick.bind(this);
    }


    componentDidMount()
    {
        axios.get('http://localhost:4000/api/gastoseingresos')
        .then(response => {
            console.log(response);
            this.setState({gastoseingresos: response.data})
        })
        .catch(error => {
            console.log(error)
        });
        axios.get('http://localhost:4000/api/usuarios')
            .then(response => {
                console.log(response);
                const arreglo = response.data.filter(d => d.tipo === "Estudiante");
                this.setState({usuarios: arreglo})
            })
            .catch(error => {
                console.log(error)
            })

    }

    clearData(){
        this.setState(
            {
                id: "",
                codigo: "",
                descripcion: "",
                total: "",
                fecha: "",
                tipo:"",
                estudiante: "",
                subtipo: ""
            }
        );
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state.codigo);
        alert("Gasto O Ingreso Agregado Con Exito");
        axios.post('http://localhost:4000/api/gastoseingresos', {
            codigo: this.state.codigo,
            descripcion: this.state.descripcion,
            total: this.state.total,
            fecha: this.state.fecha,
            tipo: this.state.tipo,
            subtipo: this.state.subtipo,
            estudiante: this.state.estudiante
        })
            .then(response => {
                console.log(response);
                axios.get('http://localhost:4000/api/gastoseingresos')
                    .then(response => {
                        console.log(response);
                        this.setState({gastoseingresos: response.data})
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


    tablaclick(event){
        let _this = this;
        $('table tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let dato = $(this).find('td:eq( 2 )').html();
            console.log(dato);
            alert("Usuario Seleccionado Con Exito");
            _this.setState(
                {
                    estudiante: dato
                });
        });

        event.preventDefault();
    }


    gestionar() {
        window.location.assign('http://localhost:3000/gastoseingresosges');
    }

    render() {
        const {gastoseingresos, codigo, descripcion, total, fecha, tipo, subtipo, usuarios} = this.state;

        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="lop"/>
                <label id="lcap" name="labeli">Listado</label>
                <label id="lcap121" name="labeli">Estudiantes</label>
                <label id="pi" name="labeli">Registro Gastos</label>
                <label id="plco" name="labelu">Codigo:</label>
                <input name="codigo" type="number" required="required" id="pico" placeholder="Código" onChange={this.changeHandler} value={codigo}/>
                <label id="pln" name="labelp">Descripcion:</label>
                <textarea name="descripcion" type="text" required="required" id="pin" placeholder="Descripción" onChange={this.changeHandler} value={descripcion}/>
                <label id="plct" name="labelp">Total:</label>
                <input name="total" type="number" required="required" id="pict" placeholder="Total" onChange={this.changeHandler}  value={total}/>
                <label id="plef" name="labelp">Fecha:</label>
                <input name="fecha" type="date" required="required" id="pief" placeholder="Fecha" onChange={this.changeHandler} value={fecha}/>
                <label id="plut" name="labelp">Tipo:</label>
                <label id="plut12" name="labelp">Subtipo:</label>
                <select id ="piut" name="tipo" onChange={this.changeHandler} value={tipo}>
                    <option id ="piu" value="Tipo">Tipo</option>
                    <option id ="piu" value="Egreso">Egreso</option>
                    <option id ="piu" value="Ingreso">Ingreso</option>
                </select>
                <select id ="piut12" name="subtipo" onChange={this.changeHandler} value={subtipo}>
                    <option id ="piu" value="Subtipo">Subtipo</option>
                    <option id ="piu" value="Venta Entradas">Venta Entradas</option>
                    <option id ="piu" value="Venta">Venta</option>
                    <option id ="piu" value="Compra">Compra</option>
                    <option id ="piu" value="Otros">Otros</option>
                </select>

                <input name="buttoni" type="button" id="pbcty12" onClick={this.submitHandler} value="Crear"/>
                <input name="buttonr" type="button" id="pbgty12" onClick={this.gestionar} value="Gestionar"/>




                <div id="tablep">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Código</th>
                            <th width="60">Descripción</th>
                            <th width="60">Total</th>
                            <th width="60">Fecha</th>
                            <th width="60">Tipo</th>
                            <th width={20}>Subtipo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            gastoseingresos.length ?
                                gastoseingresos.map(
                                    gastoseingreso =>
                                        <tr key={gastoseingreso.id}>
                                            <td>{gastoseingreso.id}</td>
                                            <td>{gastoseingreso.codigo}</td>
                                            <td>{gastoseingreso.descripcion}</td>
                                            <td>{gastoseingreso.total}</td>
                                            <td>{gastoseingreso.fecha}</td>
                                            <td>{gastoseingreso.tipo}</td>
                                            <td>{gastoseingreso.subtipo}</td>
                                        </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>


                <div id="tablep22">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Identificacion</th>
                            <th width="60">Usuario</th>
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
                                            <td>{usuario.us}</td>
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


export default  gastoseingresos;