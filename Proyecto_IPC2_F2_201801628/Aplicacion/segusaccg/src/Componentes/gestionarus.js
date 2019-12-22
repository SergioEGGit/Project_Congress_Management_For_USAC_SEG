import React, {Component} from 'react';
import './gestionarus.css';
import axios from 'axios';
import { Table } from 'react-bootstrap';


class gestionarus extends Component {


    constructor(props) {

        super(props);

        this.state = {
            usuarios: []

        }

    }

    componentDidMount()
    {

        axios.get('http://localhost:4000/api/usuarios')
            .then(response => {
                console.log(response);
                this.setState({usuarios: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    handlesumbit(codigo) {
       console.log(codigo);
    }



    render() {
        const  {usuarios}  = this.state;
        return (

            <div className="cont">

                    <Table striped bordered hover size="sm" variant="dark">
                    <thead>
                    <tr>
                    <th>Codigo</th>
                    <th>Usuario</th>
                    <th>Tipo</th>
                    <th>Nacionalidad</th>
                    <th>Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        usuarios.length ?
                            usuarios.map(
                                usuario =>
                    <tr key={usuario.id} onClick={this.handlesumbit}>
                        <td>{usuario.id}</td>
                        <td>{usuario.us}</td>
                        <td>{usuario.tipo}</td>
                        <td>{usuario.nacionalidad}</td>
                        <td><button onClick={this.handlesumbit(usuario.id)}>Seleccionar</button></td>
                    </tr>
                            ) :
                            null
                    }
                    </tbody>
                    </Table>

            </div>
        );
    }





}


export default  gestionarus;