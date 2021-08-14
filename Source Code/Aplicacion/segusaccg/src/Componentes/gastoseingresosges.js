import React, {Component} from 'react';
import './gastoseingresos.css';
import axios from 'axios';
import Logo from "../Assets/login.jpg";
import {Table} from "react-bootstrap";
const $ = require("jquery");

class gastoseingresosges extends Component {


    constructor(props) {

        super(props);

        this.state = {
            id: "",
            id_miembro_p: "",
            nombre_miembro_p: "",
            titulo: "",
            descripcion: "",
            variables: [],
            gastoseingresos: [],
            gastoseingresos1: []
        };

        this.clearData = this.clearData.bind(this);
        this.tablaclick = this.tablaclick.bind(this);

    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };


    tablaclick(event){
        let _this = this;
        $('table tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            var dato = $(this).find('td:first').html();
            console.log(dato);
            axios.get(`http://localhost:4000/api/gastoseingresos/${dato}`)
                .then(response => {
                    console.log(response);
                    _this.setState({gastoseingresos1: response.data})
                })
                .catch(error => {
                    console.log(error)
                });
            const   us  = _this.state.gastoseingresos1;
            _this.setState(
                {
                    id: us.id,
                    codigo: us.codigo,
                    descripcion: us.descripcion,
                    total: us.total,
                    fecha: us.fecha,
                    tipo: us.tipo
                });
        });

        event.preventDefault();
    }

    submitModificar = e => {
        e.preventDefault();
        console.log(this.state);
        const { variables } = this.state;
        alert("Gasto O Ingreso Modificado Con Exito");
        axios.put(`http://localhost:4000/api/gastoseingresos/${this.state.id}`, this.state)
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

    submitEliminar = e => {
        e.preventDefault();
        console.log(this.state);
        const { variables } = this.state;
        alert("Gasto O Ingreso Eliminado Con Exito");
        axios.delete(`http://localhost:4000/api/gastoseingresos/${this.state.id}`)
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
        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response);
                this.setState({variables: response.data})
            })
            .catch(error => {
                console.log(error)
            });

    }

    clearData(){
        this.setState(
            {
                id: "",
                codigo: "",
                descripcion: "",
                total: "",
                fecha: "",
                tipo:""
            }
        );
    }



    render() {
        const {gastoseingresos, codigo, descripcion, total, fecha, tipo} = this.state;

        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="lop"/>
                <label id="lcap" name="labeli">Listado</label>
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
                <select id ="piut" name="tipo" onChange={this.changeHandler} value={tipo}>
                    <option id ="piu" value="Gasto">Gasto</option>
                    <option id ="piu" value="Ingreso">Ingreso</option>
                </select>

                <input name="buttoni" type="button" id="pbcty" onClick={this.submitModificar} value="Modificar"/>
                <input name="buttonr" type="button" id="pbgty" onClick={this.submitEliminar} value="Eliminar"/>




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
                        </tr>
                        </thead>
                        <tbody>
                        {
                            gastoseingresos.length ?
                                gastoseingresos.map(
                                    gastoseingreso =>
                                        <tr key={gastoseingreso.id} onClick={this.tablaclick}>
                                            <td>{gastoseingreso.id}</td>
                                            <td>{gastoseingreso.codigo}</td>
                                            <td>{gastoseingreso.descripcion}</td>
                                            <td>{gastoseingreso.total}</td>
                                            <td>{gastoseingreso.fecha}</td>
                                            <td>{gastoseingreso.tipo}</td>
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


export default  gastoseingresosges;