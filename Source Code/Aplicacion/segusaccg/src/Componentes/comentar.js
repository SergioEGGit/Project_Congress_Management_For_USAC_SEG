import React, {Component} from 'react';
import './comentar.css';
import axios from 'axios';
import Logo from '../Assets/login.jpg';
import {Table} from "react-bootstrap";
const $ = require("jquery");

class comentar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            id_noticia: "",
            usuario_co: "",
            comentario: "",
            comentarios: [],
            variables: [],
            varglobales: []
        };
        this.clearData = this.clearData.bind(this);
        this.tablaclick = this.tablaclick.bind(this);
    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state);
        const variables = this.state.variables;
        const varglobales = this.state.varglobales;
        axios.post('http://localhost:4000/api/comentarios', {
            id_noticia: varglobales.id_noticia_comentario,
            usuario_co: variables.nombre_miembro,
            comentario: this.state.comentario,
            estado: "No Procedente",
            descripcion: ""
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });
        this.clearData();
    };

    componentDidMount() {
        axios.get('http://localhost:4000/api/variablesglobales/1')
            .then(response => {
                this.setState({varglobales: response.data});
                const {varglobales} = this.state;
                axios.get('http://localhost:4000/api/comentarios')
                    .then(response => {
                        console.log(response);
                        const arreglo = response.data.filter(d => d.id_noticia === varglobales.id_noticia_comentario && d.estado === "No Procedente");
                        console.log(arreglo);
                        this.setState({comentarios: arreglo})
                    })
                    .catch(error => {
                        console.log(error)
                    });
            });
        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
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
                comentario: ""
            }
        );
    }

    tablaclick(event){
        let _this = this;
        let {variables} = this.state;
        let {varglobales} = this.state;
        $('table tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let id = $(this).find('td:eq( 0 )').html();
            let usuario_co = $(this).find('td:eq( 1 )').html();
            let comentario = $(this).find('td:eq( 2 )').html();
            let reply = prompt("Desea Denunciar Este Mensaje?   Porfavor Indique El Motivo", "");
            if(reply !== null) {
                if(reply === ""){
                    alert("Debe De Indicar El Motivo De La Denuncia");
                } else {
                    alert("Su Denuncia Fue Notifica A Los Adminstradores");
                    axios.put(`http://localhost:4000/api/comentarios/${id}`, {
                        id: id,
                        id_noticia: varglobales.id_noticia_comentario,
                        usuario_co: usuario_co,
                        comentario: comentario,
                        estado: "Pendiente",
                        descripcion: reply
                    })
                        .then(response => {
                            console.log(response);
                            axios.get('http://localhost:4000/api/comentarios')
                                .then(response => {
                                    console.log(response);
                                    const arreglo = response.data.filter(d => d.id_noticia === varglobales.id_noticia_comentario && d.estado === "No Procedente");
                                    console.log(arreglo);
                                    _this.setState({comentarios: arreglo})
                                })
                                .catch(error => {
                                    console.log(error)
                                });
                        })
                        .catch(error => {
                            console.log(error.response)
                        });
                }
            }
        });
        event.preventDefault();
    }


    render() {
        const {comentarios,comentario} = this.state;
        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="nlogo1"/>
                <label id="lnt1" name="labeli">Comentarios</label>

                <label id="lnt123" name="labelu">Comentario:</label>
                <input name="comentario" type="text" required="required" id="i12345" value={comentario} onChange={this.changeHandler} placeholder="Comentario"/>

                <input name="buttoni" type="button" id="bbr258" onClick={this.submitHandler} value="Enviar"/>

                 <div id="tablep">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Usuario</th>
                            <th width="60">Comentario</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            comentarios.length ?
                                comentarios.map(
                                    comentario =>
                                        <tr key={comentario.id} onClick={this.tablaclick}>
                                            <td>{comentario.id}</td>
                                            <td>{comentario.usuario_co}</td>
                                            <td>{comentario.comentario}</td>
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


export default  comentar;