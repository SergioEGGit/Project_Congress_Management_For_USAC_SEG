import React, {Component} from 'react';
import './contactos.css';
import axios from 'axios';
import Logo from "../Assets/login.jpg";
import {Table} from "react-bootstrap";


class contactos extends Component {


    constructor(props) {

        super(props);

        this.state = {
            nombre: "",
            telefono: "",
            email: "",
            direccion:"",
            rol: "",
            oportunidades: "",
            encargado: "",
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
                nombre: "",
                telefono: "",
                email: "",
                direccion:"",
                rol: "",
                oportunidades: "",
                encargado: ""
            }
        );
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state.codigo);
        axios.post('http://localhost:4000/api/contactos', {
            nombre: this.state.nombre,
            telefono: this.state.telefono,
            email:this.state.email,
            direccion: this.state.direccion,
            rol: this.state.rol,
            oportunidades: this.state.oportunidades,
            encargado: this.state.encargado
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });
        this.clearData();
    };


    gestionar() {
        window.location.assign('http://localhost:3000/contactosges');
    }

    render() {
        const {usuarios, nombre, telefono, email, direccion, rol, oportunidades, encargado} = this.state;

        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="loc"/>
                <label id="ci" name="labeli">Contactos</label>
                <label id="cn" name="labelp">Nombre:</label>
                <input name="nombre" type="text" required="required" id="cni" placeholder="Nombre" onChange={this.changeHandler} value={nombre}/>
                <label id="ct" name="labelp">Teléfono:</label>
                <input name="telefono" type="number" required="required" id="cti" placeholder="Teléfono" onChange={this.changeHandler} value={telefono}/>
                <label id="ce" name="labelp">Email:</label>
                <input name="email" type="text" required="required" id="cei" placeholder="Email" onChange={this.changeHandler}  value={email}/>
                <label id="cd" name="labelp">Dirección:</label>
                <input name="direccion" type="text" required="required" id="cdi" placeholder="Dirección" onChange={this.changeHandler} value={direccion}/>
                <label id="cr" name="labelp">Rol:</label>
                <input name="rol" type="text" required="required" id="cri" placeholder="Rol" onChange={this.changeHandler} value={rol}/>
                <label id="co" name="labelp">Oportunidades:</label>
                <textarea id="cio" name="oportunidades" type="text"  placeholder="Oportunidades" onChange={this.changeHandler} value={oportunidades}/>
                <label id="cen" name="labelp">Encargado:</label>
                <input name="encargado" type="text" required="required" id="ceni" placeholder="Encargado" onChange={this.changeHandler} value={encargado}/>
                <input name="buttoni" type="button" id="cobc" onClick={this.submitHandler} value="Crear"/>
                <input name="buttonr" type="button" id="cobg" onClick={this.gestionar} value="Gestionar"/>


                <div id="cotab">
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


export default  contactos;