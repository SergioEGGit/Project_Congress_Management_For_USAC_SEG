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
            variables: [],
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
            tipo: "",

            id_miembro: "",
            tipo_miembro: "",
            nombre_miembro: "",
            universidad_miembro: "",
            P_Login: false,
            P_Logout: true,
            P_RegistroU: true,
            P_RegistroP: true,
            P_RegistroCu: true,
            P_RegistroCo: true,
            P_RegistroA: true,
            P_Cargamasiva: true,
            P_Perfil: true,
            P_Inventario: true,
            P_AsignacionCo: true,
            P_AsignacionCu: true
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.mensajes = this.mensajes.bind(this);
    }

    componentDidMount()
    {
        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response.id_miembro);
                this.setState({variables: response.data});
                const { variables } = this.state;
                axios.get(`http://localhost:4000/api/usuarios/one/${variables.id_miembro}`)
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


                        axios.get(`http://localhost:4000/api/asignacioncurso`)
                            .then(response => {
                                const arreglo = response.data.filter(d => d.estudiante === variables.nombre_miembro);
                                console.log(arreglo);
                                this.setState({asignacioncursos: arreglo});
                            })
                            .catch(error => {
                                console.log(error)
                            });
                    })
                    .catch(error => {
                        console.log(error)
                    });
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
        const { variables } = this.state;
            console.log(this.state);
        axios.put(`http://localhost:4000/api/usuarios/${variables.id_miembro}`, this.state)
            .then(response => {
                console.log(response);
                axios.get(`http://localhost:4000/api/usuarios/one/${variables.id_miembro}`)
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
        const {variables} = this.state;
        e.preventDefault();
        console.log(this.state);
        axios.delete(`http://localhost:4000/api/usuarios/${variables.id_miembro}`)
            .then(response => {
                console.log(response);
                axios.put('http://localhost:4000/api/variables/1', {
                    id: "1",
                    id_miembro: "",
                    tipo_miembro: "",
                    nombre_miembro: "",
                    universidad_miembro: "",
                    P_Login: false,
                    P_Logout: true,
                    P_RegistroU: true,
                    P_RegistroP: true,
                    P_RegistroCu: true,
                    P_RegistroCo: true,
                    P_RegistroA: true,
                    P_Cargamasiva: true,
                    P_Perfil: true,
                    P_Inventario: true,
                    P_AsignacionCo: true,
                    P_AsignacionCu: true
                })
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error.response)
                    });
                window.location.assign('http://localhost:3000/home');
            })
            .catch(error => {
                console.log(error.response)
            });

    };

    mensajes() {
        const {variables} = this.state;
        if(variables.tipo_miembro === "Administrador"){
            window.location.assign('http://localhost:3000/mensajes');
        }
        if(variables.tipo_miembro === "Colaborador"){
            window.location.assign('http://localhost:3000/mensajes');
        }
        if(variables.tipo_miembro === "Catedratico"){
            window.location.assign('http://localhost:3000/mensajesca');
        }
        if(variables.tipo_miembro === "Estudiante"){
            window.location.assign('http://localhost:3000/mensajeses');
        }
    }


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
                <input name="buttonevn" type="button" id="buttonevn" onClick={this.mensajes} value="Enviar Mensajes"/>


                <div id="tablep">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Curso</th>
                            <th width="60">Sección</th>
                            <th width="60">Titular</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            asignacioncursos.length ?
                                asignacioncursos.map(
                                    asignacioncurso =>
                                        <tr key={asignacioncurso.id}>
                                            <td>{asignacioncurso.curso}</td>
                                            <td>{asignacioncurso.secciona}</td>
                                            <td>{asignacioncurso.titular}</td>
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