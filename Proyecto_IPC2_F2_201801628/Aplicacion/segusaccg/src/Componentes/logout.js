import React, {Component} from 'react';
import './home.css';
import axios from 'axios';


class logout extends Component {


    constructor(props) {

        super(props);

        this.state = {
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
        }

    }

    componentDidMount()
    {

        axios.put('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response);
                this.setState({
                    id: "",
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
            })
            .catch(error => {
                console.log(error)
            });

  }

  location() {
      window.location.assign('http://localhost:3000/home');
  }


  render() {
        return(
            <div id="cont">
           <button onClick={this.location}>Labefasdfasdfasdfasfsdfasdfasdfasdfasdfl</button>

            </div>
        );
  }


}


export default  logout;