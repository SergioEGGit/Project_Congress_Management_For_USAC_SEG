import React, {Component} from 'react';
import './perfil.css';
import axios from 'axios';
import Logo from "../Assets/login.jpg";
import {Table} from "react-bootstrap";


class perfil extends Component {


    constructor(props) {

        super(props);

        this.state = {
            usuarios: [],
            asignacioncursos: [],
            id: "",
            identificacion: "",
            nombre: "",
            fechan: "",
            telefono: "",
            email: "",
            universidad: "",
            nacionalidad: "",
            us: "",
            pass: "",
            puesto: "",
            tipo: ""
        };

        this.componentDidMount = this.componentDidMount.bind(this);

    }

    componentDidMount()
    {
        axios.get(`http://localhost:4000/api/usuarios/one/1`)
            .then(response => {
                console.log(response);
                this.setState({usuarios: response.data});
                const   us  = this.state.usuarios;
                this.setState(
                    {
                        id: us.id,
                        identificacion: us.identificacion,
                        nombre: us.nombre,
                        fechan: us.fechan,
                        telefono: us.telefono,
                        email: us.email,
                        universidad: us.universidad,
                        nacionalidad: us.nacionalidad,
                        us: us.us,
                        pass: us.pass,
                        puesto: us.puesto,
                        tipo: us.tipo
                    });
            })
            .catch(error => {
                console.log(error)
            });

        axios.get(`http://localhost:4000/api/asignacioncurso`)
            .then(response => {
                const arreglo = response.data.filter(d => d.estudiante === "juan");
                console.log(arreglo);
                this.setState({asignacioncursos: arreglo});
            })
            .catch(error => {
                console.log(error)
            });
     }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitModificar = e => {
            e.preventDefault();
            console.log(this.state);
        axios.put(`http://localhost:4000/api/usuarios/1`, this.state)
            .then(response => {
                console.log(response);
                axios.get(`http://localhost:4000/api/usuarios/one/1`)
                    .then(response => {
                        console.log(response);
                        this.setState({usuarios: response.data});
                        const   us  = this.state.usuarios;
                        this.setState(
                            {
                                id: us.id,
                                identificacion: us.identificacion,
                                nombre: us.nombre,
                                fechan: us.fechan,
                                telefono: us.telefono,
                                email: us.email,
                                universidad: us.universidad,
                                nacionalidad: us.nacionalidad,
                                us: us.us,
                                pass: us.pass,
                                puesto: us.puesto,
                                tipo: us.tipo
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error.response)
            });
    };

    submitEliminar = e => {
        e.preventDefault();
        console.log(this.state);
        axios.delete(`http://localhost:4000/api/usuarios/1`)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response)
            });

    };


    render() {
        const {asignacioncursos, identificacion, nombre, fechan, telefono, email, universidad, nacionalidad, us , pass, puesto ,tipo } = this.state;

        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="lop"/>
                <label id="li" name="labeli">Perfil</label>
                <label id="lcap" name="labeli">Cursos Asignados</label>
                <label id="lid" name="labelu">Identificacion:</label>
                <input name="identificacion" type="number" required="required" id="iid" placeholder="Identificacion" onChange={this.changeHandler} value={identificacion}/>
                <label id="ln" name="labelp">Nombre:</label>
                <input name="nombre" type="text" required="required" id="in" placeholder="Nombre" onChange={this.changeHandler} value={nombre}/>
                <label id="lf" name="labelp">Fecha De Nacimiento:</label>
                <input name="fechan" type="date" required="required" id="if" placeholder="Fecha De Nacimiento" onChange={this.changeHandler} value={fechan}/>
                <label id="lt" name="labelp">Teléfono:</label>
                <input name="telefono" type="number" required="required" id="it" placeholder="Teléfono" onChange={this.changeHandler}  value={telefono}/>
                <label id="le" name="labelp">E-mail:</label>
                <input name="email" type="e-mail" required="required" id="ie" placeholder="E-mail" onChange={this.changeHandler} value={email}/>
                <label id="lu" name="labelp">Universidad:</label>
                <input name="universidad" type="text" required="required" id="iu" placeholder="Universidad" onChange={this.changeHandler} value={universidad}/>
                <label id="lna" name="labelp">Nacionalidad:</label>
                <label id="lus" name="labelp">Usuario:</label>
                <input name="us" type="text" required="required" id="ius" placeholder="Usuario" onChange={this.changeHandler} value={us}/>
                <label id="lpa" name="labelp">Contraseña:</label>
                <input name="pass" type="password" required="required" id="ipa" placeholder="Contraseña" onChange={this.changeHandler} value={pass}/>
                <label id="lp" name="labelp">Puesto:</label>
                <input name="puesto" type="text" required="required" id="ip" placeholder="Puesto" onChange={this.changeHandler} value={puesto}/>
                <input name="buttoni" type="button" id="bum" onClick={this.submitModificar} value="Modificar"/>
                <input name="buttonr" type="button" id="bue" onClick={this.submitEliminar} value="Eliminar"/>
                <input name="nacionalidad" type="text" id="ina" placeholder="Nacionalidad" onChange={this.changeHandler} value={nacionalidad}/>



                <div id="tablep">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Curso</th>
                            <th width="60">Sección</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            asignacioncursos.length ?
                                asignacioncursos.map(
                                    asignacioncurso =>
                                        <tr key={asignacioncurso.id}>
                                            <td>{asignacioncurso.id}</td>
                                            <td>{asignacioncurso.curso}</td>
                                            <td>{asignacioncurso.secciona}</td>
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


export default  perfil;