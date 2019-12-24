import React, {Component} from 'react';
import './cursos.css';
import axios from 'axios';
import Logo from "../Assets/login.jpg";
import {Table} from "react-bootstrap";


class cursos extends Component {


    constructor(props) {

        super(props);

        this.state = {
            codigo: "",
            nombre: "",
            seccion: "",
            universidad:"",
            titular: "",
            peticion: "",
            usuarios: [],
            cursos: []
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

        axios.get('http://localhost:4000/api/cursos')
            .then(response => {
                console.log(response);
                this.setState({cursos: response.data})
            })
            .catch(error => {
                console.log(error)
            });

    }

    clearData(){
        this.setState(
            {
                codigo: "",
                nombre: "",
                seccion: "",
                universidad:"",
                titular: ""
            }
        );
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state.codigo);
        axios.post('http://localhost:4000/api/cursos', {
            codigo: this.state.codigo,
            nombre: this.state.nombre,
            seccion: this.state.seccion,
            universidad:this.state.universidad,
            titular: this.state.titular,
            peticion: "aprobada"
        })
            .then(response => {
                console.log(response);
                axios.get('http://localhost:4000/api/cursos')
                    .then(response => {
                        console.log(response);
                        this.setState({cursos: response.data})
                    })
                    .catch(error => {
                        console.log(error)
                    });
            })
            .catch(error => {
                console.log(error.response)
            });
        this.clearData();
    };




    gestionar() {
        window.location.assign('http://localhost:3000/cursosges');
    }

    render() {
        const {cursos, usuarios, codigo, nombre, seccion, universidad, titular } = this.state;

        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="lop"/>
                <label id="ci" name="labeli">Cursos</label>
                <label id="lcap" name="labeli">Usuarios</label>
                <label id="lcap2" name="labeli">Cursos</label>
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
                <input name="buttoni" type="button" id="cbc" onClick={this.submitHandler} value="Crear"/>
                <input name="buttonr" type="button" id="cbg" onClick={this.gestionar} value="Gestionar"/>

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





                <div id="tablep2">
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
export default  cursos;