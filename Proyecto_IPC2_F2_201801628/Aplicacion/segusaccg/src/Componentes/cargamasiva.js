import React, {Component} from 'react';
import './cargamasiva.css';
import Logo from "../Assets/login.jpg";



class cargamasiva extends Component {


    constructor(props) {

      super(props)
    }

    componentDidMount()
    {

    }

    render() {
        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="logocgm"/>
                <label id="cgm" name="labeli">Carga Masiva</label>
            </div>
        );
    }
}


export default  cargamasiva;