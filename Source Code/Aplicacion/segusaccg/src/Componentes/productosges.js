import React, {Component} from 'react';
import './productosges.css';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Logo from "../Assets/login.jpg";
const $ = require("jquery");


class gestionarus extends Component {


    constructor(props) {

        super(props);

        this.state = {
            productos: [],
            productos1: [],
            id: "",
            codigo: "",
            nombre: "",
            descripcion: "",
            cantidad: "",
            encargado: "",
            ubicacion: "",
            estado: "",
            tipo: ""
        };
        this.tablaclick = this.tablaclick.bind(this);
        this.clearData = this.clearData.bind(this);

    }

    clearData(){
        this.setState(
            {
                id: "",
                codigo: "",
                nombre: "",
                descripcion: "",
                cantidad: "",
                encargado: "",
                ubicacion: "",
                estado: ""
            }
        );
    }


    componentDidMount()
    {
        axios.get('http://localhost:4000/api/productos')
            .then(response => {
                console.log(response);
                this.setState({productos: response.data})
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
            axios.get(`http://localhost:4000/api/productos/${dato}`)
                .then(response => {
                    console.log(response);
                    _this.setState({productos1: response.data})
                })
                .catch(error => {
                    console.log(error)
                });
            const   us  = _this.state.productos1;
            _this.setState(
                {
                    id: us.id,
                    codigo: us.codigo,
                    nombre: us.nombre,
                    descripcion: us.descripcion,
                    cantidad: us.cantidad,
                    encargado: us.encargado,
                    ubicacion: us.ubicacion,
                    estado: us.estado,
                    tipo: us.tipo
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
        axios.put(`http://localhost:4000/api/productos/${this.state.id}`, this.state)
            .then(response => {
                console.log(response);
                alert("Producto Modificado Con Exito");
                axios.get('http://localhost:4000/api/productos')
                    .then(response => {
                        console.log(response);
                        this.setState({productos: response.data})
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
        axios.delete(`http://localhost:4000/api/productos/${this.state.id}`)
            .then(response => {
                console.log(response);
                alert("Prodcuto Eliminado Con Exito");
                axios.get('http://localhost:4000/api/productos')
                    .then(response => {
                        console.log(response);
                        this.setState({productos: response.data})
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
        const {productos, codigo, nombre, descripcion, cantidad, encargado, ubicacion, estado, tipo } = this.state;

        return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="lop"/>
                <label id="pi" name="labeli">Productos</label>
                <label id="lcap" name="labeli">Disponibles</label>
                <label id="plco" name="labelu">Codigo:</label>
                <input name="codigo" type="number" required="required" id="pico" placeholder="Código" onChange={this.changeHandler} value={codigo}/>
                <label id="pln" name="labelp">Nombre:</label>
                <input name="nombre" type="text" required="required" id="pin" placeholder="Nombre" onChange={this.changeHandler} value={nombre}/>
                <label id="pld" name="labelp">Descripción:</label>
                <textarea name="descripcion" type="text" required="required" id="pid" placeholder="Descripción" onChange={this.changeHandler} value={descripcion}/>
                <label id="plc" name="labelp">Cantidad:</label>
                <input name="cantidad" type="number" required="required" id="pic" placeholder="Cantidad" onChange={this.changeHandler}  value={cantidad}/>
                <label id="ple" name="labelp">Encargado:</label>
                <input name="encargado" type="text" required="required" id="pie" placeholder="Encargado" onChange={this.changeHandler} value={encargado}/>
                <label id="plu" name="labelp">Ubicación:</label>
                <input name="ubicacion" type="text" required="required" id="piu" placeholder="Ubicación" onChange={this.changeHandler} value={ubicacion}/>
                <label id="ples" name="labelp">Estado:</label>
                <input name="buttoni" type="button" id="pbc89" onClick={this.submitModificar} value="Modificar"/>
                <input name="buttonr" type="button" id="pbg89" onClick={this.submitEliminar} value="Elminar"/>

                <select id ="pcombo" name="estado" onChange={this.changeHandler} value={estado}>
                    <option id ="pcombo" value="Si">Si</option>
                    <option id ="pcombo" value="No">No</option>
                </select>

                <select id ="pcombo9887" name="tipo" onChange={this.changeHandler} value={tipo}>
                    <option id ="pcombo9887" value="Tipo">Tipo</option>
                    <option id ="pcombo9887" value="Coffe Break">Coffe Break</option>
                    <option id ="pcombo9887" value="Almuerzo">Almuerzo</option>
                    <option id ="pcombo9887" value="Insumos">Insumos</option>
                    <option id ="pcombo9887" value="Productos">Productos</option>
                    <option id ="pcombo9887" value="Otros">Otros</option>
                </select>



                <div id="tablep">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Código</th>
                            <th width="60">Nombre</th>
                            <th width="80">Descripción</th>
                            <th width="60">Cantidad</th>
                            <th width="60">Encargado</th>
                            <th width="60">Ubicación</th>
                            <th width="60">Utilizado</th>
                            <th width="60">Tipo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            productos.length ?
                                productos.map(
                                    producto =>
                                        <tr key={producto.id} onClick={this.tablaclick}>
                                            <td>{producto.id}</td>
                                            <td>{producto.codigo}</td>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.descripcion}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>{producto.encargado}</td>
                                            <td>{producto.ubicacion}</td>
                                            <td>{producto.estado}</td>
                                            <td>{producto.tipo}</td>
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


export default  gestionarus;