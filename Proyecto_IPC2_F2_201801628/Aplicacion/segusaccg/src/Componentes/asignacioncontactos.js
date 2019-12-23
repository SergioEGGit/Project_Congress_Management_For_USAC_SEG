import React, {Component} from 'react';
import './asignacioncontactos.css';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Logo from "../Assets/login.jpg";
const $ = require("jquery");


class asignacioncontactos extends Component {


    constructor(props) {

        super(props);

        this.state = {
            id: "",
            nombre: "",
            telefono: "",
            email: "",
            direccion:"",
            rol: "",
            oportunidades: "",
            encargado: "",
            contactos: [],
            contactos1: []
        };
        this.tablaclick = this.tablaclick.bind(this);
        this.clearData = this.clearData.bind(this);

    }

    clearData(){
        this.setState(
            {
                id: "",
                nombre: "",
                telefono: "",
                email: "",
                direccion:"",
                rol: "",
                oportunidades: "",
                encargado: "",
            }
        );
    }


    componentDidMount()
    {
        axios.get('http://localhost:4000/api/contactos')
            .then(response => {
                console.log(response);
                this.setState({contactos: response.data})
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
            var dato = $(this).find('td:eq( 0 )').html();
            console.log(dato);
            axios.get(`http://localhost:4000/api/contactos/${dato}`)
                .then(response => {
                    console.log(response);
                    _this.setState({contactos1: response.data})
                })
                .catch(error => {
                    console.log(error)
                });
            const   us  = _this.state.contactos1;
            _this.setState(
                {
                    id: us.id,
                    nombre: us.nombre,
                    telefono: us.telefono,
                    email: us.email,
                    direccion: us.direccion,
                    rol: us.rol,
                    oportunidades: us.oportunidades,
                    encargado: us.encargado,
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
        axios.put(`http://localhost:4000/api/contactos/${this.state.id}`, this.state)
            .then(response => {
                console.log(response);
                axios.get('http://localhost:4000/api/contactos')
                    .then(response => {
                        console.log(response);
                        this.setState({contactos: response.data})
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
        axios.put(`http://localhost:4000/api/contactos/${this.state.id}`, {
            id: this.state.id,
            nombre: this.state.nombre,
            telefono: this.state.telefono,
            email: this.state.email,
            direccion: this.state.direccion,
            rol: this.state.rol,
            oportunidades: this.state.oportunidades,
            encargado: ""
        })
            .then(response => {
                console.log(response);
                axios.get('http://localhost:4000/api/contactos')
                    .then(response => {
                        console.log(response);
                        this.setState({contactos: response.data})
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
        const {contactos, nombre, telefono, email, direccion, rol, oportunidades, encargado} = this.state;
        return (
            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="loc"/>
                <label id="ci1" name="labeli">Asignar Contactos</label>
                <label id="cn" name="labelp" >Nombre:</label>
                <input name="nombre" disabled={true} type="text" required="required" id="cni" placeholder="Nombre" onChange={this.changeHandler} value={nombre}/>
                <label id="ct" name="labelp" >Teléfono:</label>
                <input name="telefono" disabled={true} type="number" required="required" id="cti" placeholder="Teléfono" onChange={this.changeHandler} value={telefono}/>
                <label id="ce" name="labelp">Email:</label>
                <input name="email" disabled={true} type="text" required="required" id="cei" placeholder="Email" onChange={this.changeHandler}  value={email}/>
                <label id="cd" name="labelp">Dirección:</label>
                <input name="direccion" disabled={true} type="text" required="required" id="cdi" placeholder="Dirección" onChange={this.changeHandler} value={direccion}/>
                <label id="cr" name="labelp">Rol:</label>
                <input name="rol" disabled={true} type="text" required="required" id="cri" placeholder="Rol" onChange={this.changeHandler} value={rol}/>
                <label id="co" name="labelp">Oportunidades:</label>
                <textarea id="cio" disabled={true} name="oportunidades" type="text"  placeholder="Oportunidades" onChange={this.changeHandler} value={oportunidades}/>
                <label id="cen" name="labelp">Encargado:</label>
                <input name="encargado"  type="text" required="required" id="ceni" placeholder="Encargado" onChange={this.changeHandler} value={encargado}/>
                <input name="buttoni" type="button" id="cobc" onClick={this.submitModificar} value="Asignar"/>
                <input name="buttonr" type="button" id="cobg" onClick={this.submitEliminar} value="Desasignar"/>



                <div id="cotab">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Nombre</th>
                            <th width="60">Teléfono</th>
                            <th width="60">Email</th>
                            <th width="60">Rol</th>
                            <th width="60">Oportunidades</th>
                            <th width="60">Encargado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            contactos.length ?
                                contactos.map(
                                    contacto =>
                                        <tr key={contacto.id} onClick={this.tablaclick}>
                                            <td>{contacto.id}</td>
                                            <td>{contacto.nombre}</td>
                                            <td>{contacto.telefono}</td>
                                            <td>{contacto.email}</td>
                                            <td>{contacto.rol}</td>
                                            <td>{contacto.oportunidades}</td>
                                            <td>{contacto.encargado}</td>
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


export default  asignacioncontactos;