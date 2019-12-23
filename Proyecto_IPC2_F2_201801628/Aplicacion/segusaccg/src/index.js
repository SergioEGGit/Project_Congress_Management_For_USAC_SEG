import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Componentes/login';
import Registrous from './Componentes/registrous';
import Gestionarus from './Componentes/gestionarus';
import Perfil from './Componentes/perfil';
import Productos from './Componentes/productos';
import Productosges from './Componentes/productosges';
import Cargamasiva from './Componentes/cargamasiva';
import Inventario from './Componentes/inventario';
import Contactos from './Componentes/contactos';
import Contactosges from './Componentes/contactosges';
import Asignacioncontactos from './Componentes/asignacioncontactos';
import Cursos from './Componentes/cursos';
import Cursosges from './Componentes/cursosges';
import Asignarcursoses from './Componentes/asignarcursoses';
import * as serviceWorker from './serviceWorker';
import {Route ,BrowserRouter} from "react-router-dom";
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FiLogIn } from 'react-icons/fi';
import { TiHomeOutline, TiDocumentAdd } from 'react-icons/ti';
import { GiLadder } from 'react-icons/gi';
import { FaUserPlus, FaUser, FaFileInvoiceDollar, FaBook, FaBookReader } from 'react-icons/fa';
import { IoMdContact, IoIosContacts } from 'react-icons/io';




    const routs = (

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
            <NavItem hidden={false}false eventKey="login">
                <NavIcon>
                    <FiLogIn id="icon"/>
                </NavIcon>
                <NavText id="tex">
                    Login
                </NavText>
            </NavItem>
            <NavItem hidden={false} eventKey="registrous">
                <NavIcon>
                    <FaUserPlus id="icon"/>
                </NavIcon>
                <NavText id="tex">
                    Registro De Usuarios
                </NavText>
            </NavItem>
            <NavItem hidden={false} eventKey="productos">
                <NavIcon>
                    <GiLadder id="icon"/>
                </NavIcon>
                <NavText id="tex">
                    Registro De Productos
                </NavText>
            </NavItem>
            <NavItem hidden={false} eventKey="contactos">
                <NavIcon>
                    <IoMdContact  id="icon"/>
                </NavIcon>
                <NavText id="tex">
                    Registro De Contactos
                </NavText>
            </NavItem>
            <NavItem hidden={false} eventKey="cursos">
                <NavIcon>
                    <FaBook  id="icon"/>
                </NavIcon>
                <NavText id="tex">
                    Resgistro De Cursos
                </NavText>
            </NavItem>
            <NavItem hidden={false} eventKey="cargamasiva">
                <NavIcon>
                    <TiDocumentAdd  id="icon"/>
                </NavIcon>
                <NavText id="tex">
                    Carga Masiva
                </NavText>
            </NavItem>
            <NavItem hidden={false} eventKey="perfil">
                <NavIcon>
                    <FaUser id="icon"/>
                </NavIcon>
                <NavText id="tex">
                    Perfil
                </NavText>
            </NavItem>
            <NavItem hidden={false} eventKey="inventario">
                <NavIcon>
                    <FaFileInvoiceDollar  id="icon"/>
                </NavIcon>
                <NavText id="tex">
                    Inventario
                </NavText>
            </NavItem>
            <NavItem hidden={false} eventKey="asignacioncontactos">
                <NavIcon>
                    <IoIosContacts  id="icon"/>
                </NavIcon>
                <NavText id="tex">
                    Asignación De Contactos
                </NavText>
            </NavItem>
            <NavItem hidden={false} eventKey="asignarcursoses">
                <NavIcon>
                    <FaBookReader  id="icon"/>
                </NavIcon>
                <NavText id="tex">
                    Asignación De Cursos
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
        </main>
    </React.Fragment>
    )}/>
    );
    </BrowserRouter> );


ReactDOM.render(routs, document.getElementById('root'));






//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
