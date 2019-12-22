import React, {Component} from 'react';
import './home.css';
import axios from 'axios';


class home extends Component {


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






    render() {
        const  {usuarios}  = this.state;
        return (

            <div className="cont">
                List of usuarios
                {

                    usuarios.length ?
                        usuarios.map(
                            usuario =>
                                <div key={usuario.id}>{usuario.us}</div>
                        ) :
                        null
                }
            </div>
        );
    }
}


export default  home;


