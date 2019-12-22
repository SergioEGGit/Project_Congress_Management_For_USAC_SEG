import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Componentes/login';
import Registrous from './Componentes/registrous';
import Gestionarus from './Componentes/gestionarus';
import * as serviceWorker from './serviceWorker';
import {Route ,BrowserRouter} from "react-router-dom";
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FiLogIn } from 'react-icons/fi';
import { TiHomeOutline } from 'react-icons/ti';
import { FaUserPlus } from 'react-icons/fa';
import  Variables  from './Componentes/variables';



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
            <NavItem hidden={Variables.P_Home} eventKey="home">
                <NavIcon id="icon">
                    <TiHomeOutline />
                </NavIcon>
                <NavText id="tex">
                    Home
                </NavText>
            </NavItem>
            <NavItem hidden={Variables.P_Login} eventKey="login">
                <NavIcon>
                    <FiLogIn id="icon"/>
                </NavIcon>
                <NavText id="tex">
                    Login
                </NavText>
            </NavItem>
            <NavItem hidden={Variables.P_Registrous} eventKey="registrous">
                <NavIcon>
                    <FaUserPlus id="icon"/>
                </NavIcon>
                <NavText id="tex">
                    Registro De Usuarios
                </NavText>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
        <main>
            <Route path="/" exact component={props => <App />} />
            <Route path="/home" component={props => <App />} />
            <Route path="/login" component={props => <Login />} />
            <Route path="/registrous" component={props => <Registrous />} />
            <Route path="/gestionarus" component={props => <Gestionarus />} />
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
