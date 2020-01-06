import React, {Component} from 'react';
import './reportescate.css';
import axios from 'axios';
import {Table} from "react-bootstrap";
import Logo from "../Assets/login.jpg";
const $ = require("jquery");
const _ = require('underscore');

class reportescate extends Component {


    constructor(props) {

        super(props);

        this.state = {
            cursos: [],
            cursos1: [],
            variables: [],
            codigo: "",
            nombre: "",
            seccion: "",
            universidad:"",
            titular: "",
            estudiante: "",
            curso: "",
            secciona: "",
            asignacioncurso: [],
            usuarios: [],
            actividades: []

        };
        this.tablaclick = this.tablaclick.bind(this);
        this.tablaclick2 = this.tablaclick2.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response);
                this.setState({variables: response.data});
                const {variables} = this.state;
                axios.get('http://localhost:4000/api/cursos')
                    .then(response => {
                        const arreglo = response.data.filter(d => d.titular === variables.nombre_miembro );
                        console.log(arreglo);
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
            let curso = $(this).find('td:eq(2)').html();
            let secciona = $(this).find('td:eq(3)').html();
            axios.get(`http://localhost:4000/api/asignacioncurso`)
                .then(response => {
                    let arreglo = response.data.filter(d => d.curso === curso && d.secciona === secciona);
                    let arreglo2 = [];
                    axios.get('http://localhost:4000/api/usuarios')
                            .then(response => {

                                 for(let i = 0;i<arreglo.length;i++){
                                     for(let j = 0;j<response.data.length;j++){
                                         if(arreglo[i].estudiante === response.data[j].us){
                                             arreglo2.push(response.data[j]);
                                         }
                                     }
                                 }
                                 _this.setState({usuarios: arreglo2})
                            })
                            .catch(error => {
                                console.log(error)
                            })
                })
                .catch(error => {
                    console.log(error)
                });
        });

        event.preventDefault();
    }

    tablaclick2(event){
        let _this = this;
        $('table tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let us = $(this).find('td:eq(3)').html();
             axios.get('http://localhost:4000/api/asignacionactividades')
                .then(response => {
                    const arreglo = response.data.filter(d => d.participante  === us);
                    _this.setState({actividades: arreglo});
                    console.log(arreglo);
                })
                .catch(error => {
                    console.log(error)
                })

        });

        event.preventDefault();
    }



    render() {
        const  {cursos, usuarios, actividades}  = this.state;
        let i = 0;
         return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="loop"/>
                <label id="curso12121245" name="labeli">Reportes</label>
                <label id="cursocurso" name="labeli">Cursos</label>
                <label id="cursoestu" name="labeli">Estudiantes Asignados</label>
                <label id="cursoact" name="labeli">Actividades Asignadas</label>

                <div id="tabs9898">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Código</th>
                            <th width="60">Nombre</th>
                            <th width="80">Sección</th>
                            <th width="60">Universidad</th>
                            <th width="60">Titular</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            cursos.length ?
                                cursos.map(
                                    curso =>

                                        <tr key={curso.id} onClick={this.tablaclick}>
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

                <div id="tabs989898">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Identificación</th>
                            <th width="60">Nombre</th>
                            <th width="60">Usuario</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            usuarios.length ?
                                usuarios.map(
                                    usuario =>
                                        <tr key={i += 1} onClick={this.tablaclick2} >
                                            <td>{usuario.id}</td>
                                            <td>{usuario.identificacion}</td>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.us}</td>
                                        </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>

                <div id="table124578">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Actividad</th>
                            <th width="60">Descripción</th>
                            <th width="60">Asistencia</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            actividades.length ?
                                actividades.map(
                                    actividad =>
                                        <tr id="tr12" key={i += 1}>
                                            <td>{actividad.id}</td>
                                            <td>{actividad.tipo}</td>
                                            <td>{actividad.actividad}</td>
                                            <td>{actividad.asistencia}</td>
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


export default  reportescate;