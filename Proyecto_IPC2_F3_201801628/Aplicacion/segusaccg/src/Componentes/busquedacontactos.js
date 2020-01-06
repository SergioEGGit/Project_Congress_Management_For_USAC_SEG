import React, {Component} from 'react';
import './busquedacontactos.css';
import axios from 'axios';
import {Table} from "react-bootstrap";
import Logo from "../Assets/login.jpg";
const $ =  require('jquery');


class busquedacontactos extends Component {


    constructor(props) {

        super(props);

        this.state = {
            query: '',
            results: [],
            contactos: [],
            tipo: [],
            usuarios: []
        };
        this.getInfo = this.getInfo.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.order = this.order.bind(this);
        this.tablaclick = this.tablaclick.bind(this);
        this.sinencargado = this.sinencargado.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/contactos')
            .then(response => {
                this.setState({contactos: response.data})
            })
            .catch(error => {
                console.log(error)
            });
        axios.get('http://localhost:4000/api/usuarios')
            .then(response => {
                const arreglo = response.data.filter(d => d.tipo === "Administrador" || d. tipo === "Colaborador");
                this.setState({usuarios: arreglo})
            })
            .catch(error => {
                console.log(error)
            })
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    getInfo = () => {
        axios.get('http://localhost:4000/api/contactos')
            .then(response => {
                let contacto = this.state.query;
                const arreglo = response.data.filter(d => d.nombre.substring(0,contacto.length) === this.state.query );
                this.setState({contactos: arreglo})
            })
            .catch(error => {
                console.log(error)
            })
    };

    handleInputChange = () => {

        this.setState({
            query: this.search.value
        });
           this.getInfo()
    };



    order() {
        const {tipo} = this.state;
        const {order} = this.state;

        if(tipo === "Nombre Contacto"){
            axios.get('http://localhost:4000/api/contactos')
                .then(response => {
                    alert("Ordenado Con Exito");
                    if(order === "Asc"){
                        let ordenasc = response.data.sort(function (a, b) {
                            return ((a.nombre === b.nombre) ? 0 : ((a.nombre > b.nombre) ? 1 : -1 ));
                        });
                        this.setState({contactos: ordenasc});
                    }
                    if(order === "Desc"){
                        let ordendesc = response.data.sort(function (a, b) {
                            return ((a.nombre === b.nombre) ? 0 : ((a.nombre < b.nombre) ? 1 : -1 ));
                        });
                        this.setState({contactos: ordendesc});
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        if(tipo === "Teléfono"){
            axios.get('http://localhost:4000/api/contactos')
                .then(response => {
                    alert("Ordenado Con Exito");
                    if(order === "Asc"){
                        let ordenasc = response.data.sort(function (a, b) {
                            return ((a.telefono === b.telefono) ? 0 : ((a.telefono > b.telefono) ? 1 : -1 ));
                        });
                        this.setState({contactos: ordenasc});
                    }
                    if(order === "Desc"){
                        let ordendesc = response.data.sort(function (a, b) {
                            return ((a.telefono === b.telefono) ? 0 : ((a.telefono < b.telefono) ? 1 : -1 ));
                        });
                        this.setState({contactos: ordendesc});
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
        if(tipo === "Correo Electrónico"){
            axios.get('http://localhost:4000/api/contactos')
                .then(response => {
                    alert("Ordenado Con Exito");
                    if(order === "Asc"){
                        let ordenasc = response.data.sort(function (a, b) {
                            return ((a.email === b.email) ? 0 : ((a.email > b.email) ? 1 : -1 ));
                        });
                        this.setState({contactos: ordenasc});
                    }
                    if(order === "Desc"){
                        let ordendesc = response.data.sort(function (a, b) {
                            return ((a.email === b.email) ? 0 : ((a.email < b.email) ? 1 : -1 ));
                        });
                        this.setState({contactos: ordendesc});
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }

    tablaclick(event){
        let _this = this;
        $('table tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let dato = $(this).find('td:eq( 3 )').html();
            axios.get('http://localhost:4000/api/contactos')
                .then(response => {
                    let arreglo = response.data.filter(d => d.encargado === dato);
                    _this.setState({contactos: arreglo})
                })
                .catch(error => {
                    console.log(error)
                });
        });

     event.preventDefault();
    }

    sinencargado() {
        axios.get('http://localhost:4000/api/contactos')
            .then(response => {
                let arreglo = response.data.filter(d => d.encargado === "");
                this.setState({contactos: arreglo})
            })
            .catch(error => {
                console.log(error)
            });
    }



    render() {

        const {contactos, tipo, order, usuarios} = this.state;
        return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="loop"/>
                <label id="curso" name="labeli">Busqueda De Contactos</label>
                <input name="buttoni" type="button" id="as12121212" onClick={this.order} value="Ordenar"/>
                <input name="buttoni" type="button" id="as21212121" onClick={this.sinencargado} value="Sin Encargado"/>

                <select id ="tipo1212" name="tipo" onChange={this.changeHandler} value={tipo}>
                    <option id ="comboti" value="Ordenamiento">Ordenamiento</option>
                    <option id ="comboti" value="Nombre Contacto">Nombre Contacto</option>
                    <option id ="comboti" value="Correo Electrónico">Correo Electrónico</option>
                    <option id ="comboti" value="Teléfono">Teléfono</option>
                </select>

                <select id ="order1212" name="order" onChange={this.changeHandler} value={order}>
                    <option id ="comboti" value="Tipo Orden">Tipo Orden</option>
                    <option id ="comboti" value="Asc">Asc</option>
                    <option id ="comboti" value="Desc">Desc</option>
                </select>




                <input id="input"
                    placeholder="Busqueda"
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />

                <div id="tablep2323">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Nombre</th>
                            <th width="60">Teléfono</th>
                            <th width="60">Email</th>
                            <th width="60">Dirección</th>
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
                                        <tr key={contacto.id}>
                                            <td>{contacto.id}</td>
                                            <td>{contacto.nombre}</td>
                                            <td>{contacto.telefono}</td>
                                            <td>{contacto.email}</td>
                                            <td>{contacto.direccion}</td>
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


                <div id="tablep363636">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Identificacion</th>
                            <th width="60">Nombre</th>
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
                                            <td>{usuario.nombre}</td>
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


export default  busquedacontactos;