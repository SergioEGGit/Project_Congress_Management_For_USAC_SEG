import React, {Component} from 'react';
import './home.css';
import axios from 'axios';
import {Alert, Carousel, CarouselItem, Table} from 'react-bootstrap'
import  Logo  from '../Assets/slide.png';
const $ = require('jquery');


class home extends Component {




    constructor(props) {

        super(props);

        this.state = {
            noticias: [],
            variables: [],
            actividades: [],
            comentarios: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.comentar = this.comentar.bind(this);
        this.tablaclick = this.tablaclick.bind(this);
        this.tablaclick2 = this.tablaclick2.bind(this);

    }

    componentDidMount() {

        axios.get('http://localhost:4000/api/noticias')
            .then(response => {
                console.log(response);
                this.setState({noticias: response.data})
            })
            .catch(error => {
                console.log(error)
            });

        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response);
                this.setState({variables: response.data})
            })
            .catch(error => {
                console.log(error)
            });
        axios.get('http://localhost:4000/api/actividades')
            .then(response => {
                console.log(response);
                this.setState({actividades: response.data});
            })
            .catch(error => {
                console.log(error)
            })
    }

    tablaclick(event){
        let _this = this;
        const {variables} = this.state;
        $('#carousel').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let dato = $(this).find("h1:visible").html();
            axios.put('http://localhost:4000/api/variablesglobales/1', {
                id_noticia_comentario: dato
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error)
                });

            if(variables.nombre_miembro === "") {
                window.location.assign('http://localhost:3000/login')
            } else {
                window.location.assign('http://localhost:3000/comentar')

            }
        });

        event.preventDefault();
    }


    tablaclick2(event){
        let _this = this;
        const {variables} = this.state;
        $('#tablepo tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let dato = $(this).find("td:eq( 0 )").html();
            axios.get('http://localhost:4000/api/asignacionactividades')
                .then(response => {
                    const arreglo = response.data.filter(d => d.id_actividad === dato);
                    _this.setState({comentarios: arreglo});
                    console.log(arreglo);
                })
                .catch(error => {
                    console.log(error)
                });
        });

        event.preventDefault();
    }



    comentar() {

    }


    render() {
        const  {noticias, actividades, comentarios}  = this.state;
        let i = 0;
        return (

            <div className="cont">

                <Carousel id="carousel">
                    {
                        noticias.length ?
                            noticias.map(
                                noticia =>
                                    <Carousel.Item key={noticia.id}>
                                        <img id="img"
                                             src={Logo}
                                             alt="First Slide"
                                        />
                                        <Carousel.Caption  onClick={this.tablaclick}>
                                            <h1>{noticia.id}</h1>
                                            <h3>{noticia.titulo}</h3>
                                            <p>{noticia.descripcion}</p>
                                            <h6>{noticia.nombre_miembro_p}</h6>
                                        </Carousel.Caption>
                                    </Carousel.Item>

                            ) :
                            null
                    }
                </Carousel>




                <div id="tablepo">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Fecha</th>
                            <th width="60">Hora Inicio</th>
                            <th width="60">Hora Final</th>
                            <th width="60">Lugar</th>
                            <th width="60">Tipo</th>
                            <th width="60">Cantidad</th>
                            <th width="60">Expositor</th>
                            <th width="60">Puntuación</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            actividades.length ?
                                actividades.map(
                                    actividad =>
                                        <tr key={actividad.id} onClick={this.tablaclick2}>
                                            <td>{actividad.id}</td>
                                            <td>{actividad.fecha}</td>
                                            <td>{actividad.hora_i}</td>
                                            <td>{actividad.hora_f}</td>
                                            <td>{actividad.lugar}</td>
                                            <td>{actividad.tipo}</td>
                                            <td>{actividad.cantidad}</td>
                                            <td>{actividad.expositor}</td>
                                            <td>{actividad.puntuacion}</td>
                                        </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>



                <div id="tablepo456">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Participante</th>
                            <th width="60">Puntuación</th>
                            <th width="60">Comentario</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            comentarios.length ?
                                comentarios.map(
                                    comentario =>
                                        <tr key={i += 1} onClick={this.tablaclick2}>
                                            <td>{i}</td>
                                            <td>{comentario.participante}</td>
                                            <td>{comentario.puntuacion}</td>
                                            <td>{comentario.comentario}</td>
                                        </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>



            </div>
        );
    }
}


export default  home;

