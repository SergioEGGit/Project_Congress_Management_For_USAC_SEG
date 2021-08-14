import React, {Component} from 'react';
import './asignarcursoses.css';
import axios from 'axios';
import {Table} from "react-bootstrap";
import Logo from "../Assets/login.jpg";
const $ = require("jquery");

class asignarcursoses extends Component {


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
            secciona: ""

        };
        this.tablaclick = this.tablaclick.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response);
                this.setState({variables: response.data});
                const {variables} = this.state;
                axios.get('http://localhost:4000/api/cursos')
                    .then(response => {
                        const arreglo = response.data.filter(d => d.universidad === variables.universidad_miembro);
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
                    codigo: us.codigo,
                    nombre: us.nombre,
                    seccion: us.seccion,
                    universidad: us.universidad,
                    titular: us.titular
                });
        });

        event.preventDefault();
    }


    submitHandler = e => {
        e.preventDefault();
        console.log(this.state);
        const   us  = this.state.cursos1;
        const {variables} = this.state;
        axios.post('http://localhost:4000/api/asignacioncurso', {
            estudiante: variables.nombre_miembro,
            curso: us.nombre,
            secciona: us.seccion,
            titular: us.titular
        })
            .then(response => {
                console.log(response);
                alert('Asignación Realizada Con Exito');
            })
            .catch(error => {
                console.log(error.response)
            });
    };



    render() {
        const  {cursos}  = this.state;
        return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="loop"/>
                <label id="curso" name="labeli">Asignación De Cursos</label>
                <input name="buttoni" type="button" id="as" onClick={this.submitHandler} value="Asignar"/>




                <div id="tabs">
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
            </div>
        );
    }
}


export default  asignarcursoses;