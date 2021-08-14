import React, {Component} from "react";
import axios from "axios";
import Logo from "../Assets/login.jpg";
import {Table} from "react-bootstrap";
import "./denunciascomentarios.css";
const $ = require("jquery");

class denunciascomentarios extends Component {


    constructor(props) {

        super(props);

        this.state = {
            pendientes: [],
            aprobadas: [],
            variables: [],
            id: "",
            id_noticia: "",
            usuario_co: "",
            comentario: "",
            estado: "",
            descripcion: ""

        };
        this.tablaclick = this.tablaclick.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/comentarios')
            .then(response => {
                const pendientes = response.data.filter(d => d.estado === "Pendiente");
                const aprobadas = response.data.filter(d => d.estado === "No Procedente" || d.estado === "Eliminado");
                this.setState({pendientes: pendientes});
                this.setState({aprobadas: aprobadas})
            })
            .catch(error => {
                console.log(error)
            })
    }

    tablaclick(event){
        let _this = this;
        $('table tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let id = $(this).find('td:eq(0)').html();
            let id_noticia = $(this).find('td:eq(1)').html();
            let usuario_co = $(this).find('td:eq(2)').html();
            let comentario = $(this).find('td:eq(3)').html();
            let estado = $(this).find('td:eq(4)').html();
            let descripcion = $(this).find('td:eq(5)').html();
            alert("Comentario Seleccionado Con Exito");
            _this.setState({
                id: id,
                id_noticia: id_noticia,
                usuario_co: usuario_co,
                comentario: comentario,
                estado: estado,
                descripcion: descripcion
            });
        });

        event.preventDefault();
    }


    submitHandler = e => {
        e.preventDefault();
        axios.put(`http://localhost:4000/api/comentarios/${this.state.id}`, {
            id: this.state.id,
            id_noticia: this.state.id_noticia,
            usuario_co: this.state.usuario_co,
            comentario: this.state.comentario,
            estado: this.state.estado,
            descripcion: this.state.descripcion
        })
            .then(response => {
                console.log(response);
                alert("Acción Realizada Con Exito");
                axios.get('http://localhost:4000/api/comentarios')
                    .then(response => {
                        const pendientes = response.data.filter(d => d.estado === "Pendiente");
                        const aprobadas = response.data.filter(d => d.estado === "No Procedente" || d.estado === "Eliminado");
                        this.setState({pendientes: pendientes});
                        this.setState({aprobadas: aprobadas})
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error.response)
            });
    };

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const  {pendientes, aprobadas, estado}  = this.state;
        return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="loop"/>
                <label id="curso" name="labeli">Denuncias De Comentarios</label>
                <label id="curso7889" name="labeli">Pendientes</label>
                <label id="curso9887" name="labeli">Atendidos</label>
                <input name="buttoni" type="button" id="as9887" onClick={this.submitHandler} value="Procesar"/>
                <select id ="estadocombo" name="estado" onChange={this.changeHandler} value={estado}>
                    <option id ="estadocombo" value="Estado">Estado</option>
                    <option id ="estadocombo" value="Eliminado">Eliminado</option>
                    <option id ="estadocombo" value="No Procedente">No Procedente</option>
                </select>

                <div id="tabs7889">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Noticia</th>
                            <th width="60">Usuario</th>
                            <th width="80">Comentario</th>
                            <th width="60">Estado</th>
                            <th width="60">Motivo Denuncia</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            pendientes.length ?
                                pendientes.map(
                                    pendiente =>

                                        <tr key={pendiente.id} onClick={this.tablaclick}>
                                            <td>{pendiente.id}</td>
                                            <td>{pendiente.id_noticia}</td>
                                            <td>{pendiente.usuario_co}</td>
                                            <td>{pendiente.comentario}</td>
                                            <td>{pendiente.estado}</td>
                                            <td>{pendiente.descripcion}</td>
                                        </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>

                <div id="tabs9887">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Noticia</th>
                            <th width="60">Usuario</th>
                            <th width="80">Comentario</th>
                            <th width="60">Estado</th>
                            <th width="60">Motivo Denuncia</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            aprobadas.length ?
                                aprobadas.map(
                                    aprobada =>

                                        <tr key={aprobada.id}>
                                            <td>{aprobada.id}</td>
                                            <td>{aprobada.id_noticia}</td>
                                            <td>{aprobada.usuario_co}</td>
                                            <td>{aprobada.comentario}</td>
                                            <td>{aprobada.estado}</td>
                                            <td>{aprobada.descripcion}</td>
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


export default  denunciascomentarios;