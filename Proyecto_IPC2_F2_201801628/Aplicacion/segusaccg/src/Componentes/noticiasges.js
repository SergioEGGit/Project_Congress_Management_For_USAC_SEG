import React, {Component} from 'react';
import './noticiasges.css';
import axios from 'axios';
import Logo from '../Assets/login.jpg';
import {Table} from "react-bootstrap";
const $ = require("jquery");

class noticias extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            id_miembro_p: "",
            nombre_miembro_p: "",
            titulo: "",
            descripcion: "",
            variables: [],
            noticias: [],
            noticias1: []
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
            axios.get(`http://localhost:4000/api/noticias/${dato}`)
                .then(response => {
                    console.log(response);
                    _this.setState({noticias1: response.data})
                })
                .catch(error => {
                    console.log(error)
                });
            const   us  = _this.state.noticias1;
            _this.setState(
                {
                    id: us.id,
                    id_miembro_p: us.id_miembro_p,
                    nombre_miembro_p: us.nombre_miembro_p,
                    titulo: us.titulo,
                    descripcion: us.descripcion
                });
        });

        event.preventDefault();
    }

    submitModificar = e => {
        e.preventDefault();
        console.log(this.state);
        const { variables } = this.state;
        axios.put(`http://localhost:4000/api/noticias/${this.state.id}`, this.state)
            .then(response => {
                console.log(response);
                axios.get('http://localhost:4000/api/noticias')
                    .then(response => {
                        console.log(response);
                        const arreglo = response.data.filter(d => d.nombre_miembro_p === variables.nombre_miembro);
                        this.setState({noticias: arreglo})
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
        axios.delete(`http://localhost:4000/api/noticias/${this.state.id}`)
            .then(response => {
                console.log(response);
                axios.get('http://localhost:4000/api/noticias')
                    .then(response => {
                        console.log(response);
                        const arreglo = response.data.filter(d => d.nombre_miembro_p === variables.nombre_miembro);
                        this.setState({noticias: arreglo})
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


    componentDidMount() {
        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response);
                this.setState({variables: response.data})
            })
            .catch(error => {
                console.log(error)
            });

        axios.get('http://localhost:4000/api/noticias')
            .then(response => {
                const { variables } = this.state;
                console.log(response);
                const arreglo = response.data.filter(d => d.nombre_miembro_p === variables.nombre_miembro);
                this.setState({noticias: arreglo})
            })
            .catch(error => {
                console.log(error)
            })
    }


    clearData(){
        this.setState(
            {
                id: "",
                id_miembro_p: "",
                nombre_miembro_p: "",
                titulo: "",
                descripcion: ""
            }
        );
    }

    render() {
        const { noticias, id_miembro_p, nombre_miembro_p, titulo, descripcion} = this.state;
        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="nlogon"/>
                <label id="lntitulo" name="labeli">Gestionar Noticias</label>
                <label id="pi2" name="labeli">Noticias</label>

                <label id="lntitu" name="labelu">Título:</label>
                <input name="titulo" type="text" required="required" id="intitu" value={titulo} onChange={this.changeHandler} placeholder="Título"/>
                <label id="lndesc" name="labelp">Descripción:</label>
                <textarea name="descripcion" type="text" required="required" id="indesc" value={descripcion} onChange={this.changeHandler} placeholder="Descripción"/>

                <input name="buttoni" type="button" id="bbr1" onClick={this.submitModificar} value="Modificar"/>
                <input type="button" name="bbr" id="bbg1" onClick={this.submitEliminar} value="Eliminar"/>



                <div id="tablep">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Título</th>
                            <th width="60">Descripción</th>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            noticias.length ?
                                noticias.map(
                                    noticia =>
                                        <tr key={noticia.id} onClick={this.tablaclick}>
                                            <td>{noticia.id}</td>
                                            <td>{noticia.titulo}</td>
                                            <td>{noticia.descripcion}</td>
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


export default  noticias;