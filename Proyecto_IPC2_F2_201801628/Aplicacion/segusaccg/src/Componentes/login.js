import React, {Component} from 'react';
import './login.css';


class login extends Component {


    login() {

    }

    render() {
        return (
           <div className="cont">
               <label className="cent">Usuario:<input type="text" placeholder="Usuario"/></label>
               <br/>
               <label className="cent">Contraseña:<input type="password" placeholder="Contraseña"/></label>
               <br/>
               <button className="cent" onClick={this.login}>Login</button>
           </div>
        );
    }
}


export default  login;