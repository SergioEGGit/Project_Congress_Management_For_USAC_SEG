import React, {Component} from 'react';
import './cargamasiva.css';
import Logo from "../Assets/login.jpg";
import carga from "../Assets/carga.jpg";




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
                <img src={carga} width="200" height="200" alt="" id="logocgm2"/>
            </div>
        );
    }
}


export default  cargamasiva;