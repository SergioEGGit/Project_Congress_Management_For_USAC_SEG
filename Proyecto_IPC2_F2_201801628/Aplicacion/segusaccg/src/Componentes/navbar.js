import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import SideNav, {NavIcon, NavItem, NavText} from "@trendmicro/react-sidenav";
import App from "../App";
import Login from "./login";
import Registrous from "./registrous";
import Gestionarus from "./gestionarus";
import Perfil from "./perfil";
import Productos from "./productos";
import Productosges from "./productosges";
import Cargamasiva from "./cargamasiva";
import Inventario from "./inventario";
import Contactos from "./contactos";
import Contactosges from "./contactosges";
import Asignacioncontactos from "./asignacioncontactos";
import Cursos from "./cursos";
import Cursosges from "./cursosges";
import Asignarcursoses from "./asignarcursoses";
import Asignacioncursosca from "./asignacioncursoca";
import Noticias from "./noticias";
import Noticiasges from "./noticiasges";
import Registrologin from "./registrologin";
import Actividades from "./actividades";
import Actividadesges from "./actividadesges";
import Gastoseingresos from "./gastoseingresos";
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { TiHomeOutline, TiDocumentAdd } from 'react-icons/ti';
import { GiLadder } from 'react-icons/gi';
import { MdImportContacts } from 'react-icons/md';
import { FaUserPlus, FaUser, FaFileInvoiceDollar, FaBook, FaBookReader, FaChalkboardTeacher, FaRegNewspaper } from 'react-icons/fa';
import { IoMdContact, IoIosContacts } from 'react-icons/io';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import axios from "axios";

class navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            variables: [],
            id: "",
            id_miembro: "",
            tipo_miembro: "",
            nombre_miembro: "",
            universidad_miembro: "",
            P_Login: "",
            P_Logout: "",
            P_RegistroU: "",
            P_RegistroP: "",
            P_RegistroCu: "",
            P_RegistroCo: "",
            P_RegistroA: "",
            P_Cargamasiva: "",
            P_Perfil: "",
            P_Inventario: "",
            P_AsignacionCo: "",
            P_AsignacionCu: "",
            P_AsignacionCa: "",
            P_Noticias: ""
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response);
                this.setState({variables: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    logout() {
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
            P_AsignacionCu: true,
            P_AsignacionCa: true,
            P_Noticias: true,
            P_Actividades: true
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });
        window.location.assign('http://localhost:3000/home');
    }


    render() {
        const { variables } = this.state;
        return (
            <BrowserRouter>
                <Route render={({ location, history }) => (
                    <React.Fragment>
                        <SideNav
                            onSelect={(selected) => {
                                const to = '/' + selected;
                                if (location.pathname !== to) {
                                    history.push(to);
                                }
                            }}
                        >
                            <SideNav.Toggle />
                            <SideNav.Nav defaultSelected="home">
                                <NavItem hidden={false} eventKey="home">
                                    <NavIcon id="icon">
                                        <TiHomeOutline />
                                    </NavIcon>
                                    <NavText id="tex">
                                        Home
                                    </NavText>
                                </NavItem>
                                <NavItem hidden={variables.P_Login} eventKey="login">
                                    <NavIcon>
                                        <FiLogIn id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Login
                                    </NavText>
                                </NavItem>
                                <NavItem hidden={variables.P_RegistroU} eventKey="registrous">
                                    <NavIcon>
                                        <FaUserPlus id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Registro De Usuarios
                                    </NavText>
                                </NavItem>
                                <NavItem hidden={variables.P_RegistroP} eventKey="productos">
                                    <NavIcon>
                                        <GiLadder id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Registro De Productos
                                    </NavText>
                                </NavItem>
                                <NavItem hidden={variables.P_RegistroCo} eventKey="contactos">
                                    <NavIcon>
                                        <IoMdContact  id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Registro De Contactos
                                    </NavText>
                                </NavItem>
                                <NavItem hidden={variables.P_RegistroCu} eventKey="cursos">
                                    <NavIcon>
                                        <FaBook  id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Resgistro De Cursos
                                    </NavText>
                                </NavItem>
                                <NavItem hidden={variables.P_Actividades} eventKey="actividades">
                                    <NavIcon>
                                        <MdImportContacts  id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Resgistro De Actividades
                                    </NavText>
                                </NavItem>
                                <NavItem hidden={variables.P_Gastos} eventKey="gastoseingresos">
                                    <NavIcon>
                                        <MdImportContacts  id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Resgistro De Gastos E Ingresos
                                    </NavText>
                                </NavItem>
                                <NavItem hidden={variables.P_Cargamasiva} eventKey="cargamasiva">
                                    <NavIcon>
                                        <TiDocumentAdd  id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Carga Masiva
                                    </NavText>
                                </NavItem>
                                <NavItem hidden={variables.P_Noticias} eventKey="noticias">
                                    <NavIcon>
                                        <FaRegNewspaper  id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Noticias
                                    </NavText>
                                </NavItem>
                                <NavItem hidden={variables.P_Perfil} eventKey="perfil">
                                    <NavIcon>
                                        <FaUser id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Perfil
                                    </NavText>
                                </NavItem>
                                <NavItem hidden={variables.P_Inventario} eventKey="inventario">
                                    <NavIcon>
                                        <FaFileInvoiceDollar  id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Inventario
                                    </NavText>
                                </NavItem>
                                <NavItem hidden={variables.P_AsignacionCo} eventKey="asignacioncontactos">
                                    <NavIcon>
                                        <IoIosContacts  id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Asignación De Contactos
                                    </NavText>
                                </NavItem>
                                <NavItem hidden={variables.P_AsignacionCu} eventKey="asignarcursoses">
                                    <NavIcon>
                                        <FaBookReader  id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Asignación De Cursos
                                    </NavText>
                                </NavItem>
                                <NavItem  hidden={variables.P_AsignacionCa} eventKey="asignacioncursosca">
                                    <NavIcon>
                                        <FaChalkboardTeacher
                                            id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Asignacion Titular Curso
                                    </NavText>
                                </NavItem>
                                <NavItem  onClick={this.logout} hidden={variables.P_Logout} >
                                    <NavIcon>
                                        <FiLogOut  id="icon"/>
                                    </NavIcon>
                                    <NavText id="tex">
                                        Logout
                                    </NavText>
                                </NavItem>
                            </SideNav.Nav>
                        </SideNav>
                        <main>
                            <Route path="/" exact component={props => <App />} />
                            <Route path="/home" component={props => <App />} />
                            <Route path="/login" component={props => <Login prueba="hola"/>} />
                            <Route path="/registrous" component={props => <Registrous />} />
                            <Route path="/gestionarus" component={props => <Gestionarus />} />
                            <Route path="/perfil" component={props => <Perfil />} />
                            <Route path="/productos" component={props => <Productos />} />
                            <Route path="/productosges" component={props => <Productosges />} />
                            <Route path="/cargamasiva" component={props => <Cargamasiva />} />
                            <Route path="/inventario" component={props => <Inventario />} />
                            <Route path="/contactos" component={props => <Contactos />} />
                            <Route path="/contactosges" component={props => <Contactosges />} />
                            <Route path="/asignacioncontactos" component={props => <Asignacioncontactos />} />
                            <Route path="/cursos" component={props => <Cursos />} />
                            <Route path="/cursosges" component={props => <Cursosges />} />
                            <Route path="/asignarcursoses" component={props => <Asignarcursoses />} />
                            <Route path="/asignacioncursosca" component={props => <Asignacioncursosca />} />
                            <Route path="/noticias" component={props => <Noticias />} />
                            <Route path="/noticiasges" component={props => <Noticiasges />} />
                            <Route path="/actividades" component={props => <Actividades />} />
                            <Route path="/actividadesges" component={props => <Actividadesges />} />
                            <Route path="/registrologin" component={props => <Registrologin />} />
                            <Route path="/gastoseingresos" component={props => <Gastoseingresos />} />
                        </main>
                    </React.Fragment>
                )}/>
            </BrowserRouter>
        );
    }



}

export default navbar;
