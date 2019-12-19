import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Componentes/login';
import Home from './Componentes/home';
import * as serviceWorker from './serviceWorker';
import {Router, Route ,BrowserRouter, Link} from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FiLogIn } from 'react-icons/fi';




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
            <NavItem eventKey="home">
                <NavIcon>
                    <FiLogIn />
                </NavIcon>
                <NavText>
                    Home
                </NavText>
            </NavItem>
            <NavItem eventKey="login">
                <NavIcon>
                    <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                    Login
                </NavText>
            </NavItem>
        </SideNav.Nav>
    </SideNav>
        <main>
            <Route path="/" exact component={props => <App />} />
            <Route path="/home" component={props => <App />} />
            <Route path="/login" component={props => <Login />} />
        </main>
    </React.Fragment>
    )}/>
    );
    </BrowserRouter> )


ReactDOM.render(routs, document.getElementById('root'));






//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
