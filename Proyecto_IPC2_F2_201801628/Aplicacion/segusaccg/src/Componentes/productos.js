import React, {Component} from 'react';
import './productos.css';
import axios from 'axios';
import Logo from "../Assets/login.jpg";
import {Table} from "react-bootstrap";


class productos extends Component {


    constructor(props) {

        super(props);

        this.state = {
            codigo: "",
            nombre: "",
            descripcion: "",
            cantidad:"",
            encargado: "",
            ubicacion: "",
            estado: "",
            usuarios: []
        }

    }


    componentDidMount()
    {
                axios.get('http://localhost:4000/api/usuarios')
                .then(response => {
                    console.log(response);
                    this.setState({usuarios: response.data})
                })
                .catch(error => {
                    console.log(error)
                })

    }

    clearData(){
        this.setState(
            {
                codigo: "",
                nombre: "",
                descripcion: "",
                cantidad:"",
                encargado: "",
                ubicacion: "",
                estado: "",
            }
        );
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state.codigo);
        axios.post('http://localhost:4000/api/productos', {
            codigo: this.state.codigo,
            nombre: this.state.nombre,
            descripcion: this.state.descripcion,
            cantidad:this.state.cantidad,
            encargado: this.state.encargado,
            ubicacion: this.state.ubicacion,
            estado: this.state.estado
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            })
        this.clearData();
    };


    gestionar() {
        window.location.assign('http://localhost:3000/productosges');
    }

    render() {
        const {usuarios, codigo, nombre, descripcion, cantidad, encargado, ubicacion, estado } = this.state;

        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="lop"/>
                <label id="lcap" name="labeli">Usuarios</label>
                <label id="pi" name="labeli">Productos</label>
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
                <input name="buttoni" type="button" id="pbc" onClick={this.submitHandler} value="Crear"/>
                <input name="buttonr" type="button" id="pbg" onClick={this.gestionar} value="Gestionar"/>

                <select id ="pcombo" name="estado" onChange={this.changeHandler} value={estado}>
                    <option id ="pcombo" value="Si">Si</option>
                    <option id ="pcombo" value="No">No</option>

                </select>





                <div id="tablep">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Identificación</th>
                            <th width="60">Nombre</th>
                            <th width="60">Teléfono</th>
                            <th width="60">Email</th>
                            <th width="60">Universidad</th>
                            <th width="60">Usuario</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            usuarios.length ?
                                usuarios.map(
                                    usuario =>
                                        <tr key={usuario.id} >
                                            <td>{usuario.id}</td>
                                            <td>{usuario.identificacion}</td>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.telefono}</td>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.universidad}</td>
                                            <td>{usuario.us}</td>
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


export default  productos;