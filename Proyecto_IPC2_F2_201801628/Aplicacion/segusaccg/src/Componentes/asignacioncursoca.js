import React, {Component} from 'react';
import './cursosges.css';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Logo from "../Assets/login.jpg";
const $ = require("jquery");


class asignacioncursoca extends Component {


    constructor(props) {

        super(props);

        this.state = {
            cursos: [],
            cursos1: [],
            variables: [],
            id: "",
            codigo: "",
            nombre: "",
            seccion: "",
            universidad:"",
            titular: "",
            peticion: ""
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
                seccion: "",
                universidad:"",
                titular: ""
            }
        );
    }


    componentDidMount()
    {
        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response);
                this.setState({variables: response.data})
                const {variables } = this.state;
                axios.get('http://localhost:4000/api/cursos')
                    .then(response => {
                        console.log(response);
                        const arreglo = response.data.filter(d => d.peticion === "aprobada" && d.universidad === variables.universidad_miembro);
                        this.setState({cursos: arreglo})
                    })
                    .catch(error => {
                        console.log(error)
                    })

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
            var dato = $(this).find('td:first').html();
            console.log(dato);
            axios.get(`http://localhost:4000/api/cursos/${dato}`)
                .then(response => {
                    console.log(response);
                    _this.setState({cursos1: response.data})
                })
                .catch(error => {
                    console.log(error)
                });
            const   us  = _this.state.cursos1;
            _this.setState(
                {
                    id: us.id,
                    codigo: us.codigo,
                    nombre: us.nombre,
                    seccion: us.seccion,
                    universidad: us.universidad,
                    titular: us.titular
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
        const {variables} = this.state;
        axios.put(`http://localhost:4000/api/cursos/${this.state.id}`, this.state)
            .then(response => {
                console.log(response);
                axios.get('http://localhost:4000/api/cursos')
                    .then(response => {
                        console.log(response);
                        const arreglo = response.data.filter(d => d.peticion === "aprobada" && d.universidad === variables.universidad_miembro);
                        this.setState({cursos: arreglo})
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

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state.codigo);
        const {variables} = this.state;
        axios.post('http://localhost:4000/api/cursos', {
            codigo: this.state.codigo,
            nombre: this.state.nombre,
            seccion: this.state.seccion,
            universidad:this.state.universidad,
            titular: this.state.titular,
            peticion: "pendiente"
        })
            .then(response => {
                console.log(response);

                axios.get('http://localhost:4000/api/cursos')
                    .then(response => {
                        console.log(response);
                        const arreglo = response.data.filter(d => d.peticion === "aprobada" && d.universidad === variables.universidad_miembro);
                        this.setState({cursos: arreglo})
                    })
                    .catch(error => {
                        console.log(error)
                    });
                alert('Se Ha Enviado Su Petición Al Administrador');
            })
            .catch(error => {
                console.log(error.response)
            });
        this.clearData();
    };


    submitEliminar = e => {
        e.preventDefault();
        console.log(this.state);
        const {variables} = this.state;
        axios.put(`http://localhost:4000/api/cursos/${this.state.id}`, {
            id: this.state.id,
            codigo: this.state.codigo,
            nombre: this.state.nombre,
            seccion: this.state.seccion,
            universidad: this.state.universidad,
            titular: "",
            peticion: this.state.peticion
        })
            .then(response => {
                console.log(response);
                axios.get('http://localhost:4000/api/cursos')
                    .then(response => {
                        console.log(response);
                        const arreglo = response.data.filter(d => d.peticion === "aprobada" && d.universidad === variables.universidad_miembro);
                        this.setState({cursos: arreglo})
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
        const {cursos, codigo, nombre, seccion, universidad, titular } = this.state;

        return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="lop"/>
                <label id="ci" name="labeli">Cursos</label>
                <label id="lcap" name="labeli">Secciones</label>
                <label id="clco" name="labelu">Codigo:</label>
                <input name="codigo" type="number" required="required" id="cico" placeholder="Código" onChange={this.changeHandler} value={codigo}/>
                <label id="cln" name="labelp">Nombre:</label>
                <input name="nombre" type="text" required="required" id="cin" placeholder="Nombre" onChange={this.changeHandler} value={nombre}/>
                <label id="cls" name="labelp">Sección:</label>
                <input name="seccion" type="text" required="required" id="cis" placeholder="Sección" onChange={this.changeHandler} value={seccion}/>
                <label id="clu" name="labelp">Universidad:</label>
                <input name="titular" type="text" required="required" id="ciu" placeholder="Titular" onChange={this.changeHandler}  value={titular}/>
                <label id="clt" name="labelp">Titular:</label>
                <input name="universidad" type="text" required="required" id="cit" placeholder="Universidad" onChange={this.changeHandler} value={universidad}/>
                <input name="buttoni" type="button" id="cbc" onClick={this.submitModificar} value="Asignar"/>
                <input name="buttonr" type="button" id="cbg" onClick={this.submitEliminar} value="Desasignar"/>
                <input name="buttonr" type="button" id="cbp" onClick={this.submitHandler} value="Petición Curso"/>

                <div id="tablep">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Codigo</th>
                            <th width="60">Nombre</th>
                            <th width="60">Sección</th>
                            <th width="60">Universidad</th>
                            <th width="60">Titular</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            cursos.length ?
                                cursos.map(
                                    curso =>
                                        <tr key={curso.id}  onClick={this.tablaclick}>
                                            <td>{curso.id}</td>
                                            <td>{curso.codigo}</td>
                                            <td>{curso.nombre}</td>
                                            <td>{curso.seccion}</td>
                                            <td>{curso.universidad}</td>
                                            <td>{curso.titular}</td>
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


export default  asignacioncursoca;