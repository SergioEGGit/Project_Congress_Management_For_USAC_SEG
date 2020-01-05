import React, {Component} from 'react';
import './noticias.css';
import axios from 'axios';
import Logo from '../Assets/login.jpg';

class noticias extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            id_miembro_p: "",
            nombre_miembro_p: "",
            titulo: "",
            descripcion: "",
            variables: []
        };
        this.clearData = this.clearData.bind(this);

    }
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitHandler = e => {
        e.preventDefault();
        console.log(this.state);
        const variables = this.state.variables;
        alert("Noticia Publicada Con Exito");
        axios.post('http://localhost:4000/api/noticias', {
            id_miembro_p: variables.id_miembro,
            nombre_miembro_p: variables.nombre_miembro,
            titulo: this.state.titulo,
            descripcion: this.state.descripcion
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            });
        this.clearData();
    };


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

    gestionar() {
        window.location.assign('http://localhost:3000/noticiasges');
    }

    clearData(){
        this.setState(
            {
                id: "",
                id_miembro_p: "",
                nombre_miembro_p: "",
                titulo: "",
                descripcion: ""
            }
        );
    }

    render() {
        const {id_miembro_p, nombre_miembro_p, titulo, descripcion} = this.state;
        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="nlogo"/>
                <label id="lnt" name="labeli">Publicar Noticias</label>

                <label id="lnti" name="labelu">Título:</label>
                <input name="titulo" type="text" required="required" id="int" value={titulo} onChange={this.changeHandler} placeholder="Título"/>
                <label id="lnd" name="labelp">Descripción:</label>
                <textarea name="descripcion" type="text" required="required" id="ind" value={descripcion} onChange={this.changeHandler} placeholder="Descripción"/>

                <input name="buttoni" type="button" id="bbr" onClick={this.submitHandler} value="Publicar"/>
                <input type="button" name="buttonr" id="bbg" onClick={this.gestionar} value="Gestionar"/>
            </div>
        );
    }
}


export default  noticias;


