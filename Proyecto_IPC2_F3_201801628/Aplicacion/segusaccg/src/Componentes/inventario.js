import React, {Component} from 'react';
import './inventario.css';
import axios from 'axios';
import {Table} from "react-bootstrap";
import Logo from "../Assets/login.jpg";


class inventario extends Component {


    constructor(props) {

        super(props);

        this.state = {
            productos: []

        }

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
            })
    }






    render() {
        const  {productos}  = this.state;
        return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="loop"/>
                <label id="pinv" name="labeli">Inventario</label>
                <div id="tabs">
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


export default  inventario;