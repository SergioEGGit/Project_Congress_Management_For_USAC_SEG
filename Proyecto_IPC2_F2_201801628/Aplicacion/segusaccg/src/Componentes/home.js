import React, {Component} from 'react';
import './home.css';
import axios from 'axios';
import {Alert, Carousel, CarouselItem, Table} from 'react-bootstrap'
import  Logo  from '../Assets/slide.png';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);


class home extends Component {




    constructor(props) {

        super(props);

        this.state = {
            noticias: [],
            variables: [],
            actividades: []

        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.comentar = this.comentar.bind(this);

    }

    componentDidMount()
        {

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


    comentar() {
       const {variables} = this.state;
       if(variables.id_miembro === "") {
           window.location.assign('http://localhost:3000/login')
       } else {
           window.location.assign('http://localhost:3000/comentar')

       }
   }


    render() {
        const  {noticias}  = this.state;
        const {actividades} = this.state;

        return (

               <div className="cont">

                 <Carousel id="carousel">
                       {
                           noticias.length ?
                               noticias.map(
                                   noticia =>
                                       <Carousel.Item key={noticia.id} onClick={this.comentar}>
                                           <img id="img"
                                                src={Logo}
                                                alt="First Slide"
                                           />
                                           <Carousel.Caption>
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
                               <th width="60">Hora</th>
                               <th width="60">Lugar</th>
                               <th width="60">Tipo</th>
                               <th width="60">Cantidad</th>
                               <th width="60">Expositor</th>
                           </tr>
                           </thead>
                           <tbody>
                           {
                               actividades.length ?
                                   actividades.map(
                                       actividad =>
                                           <tr key={actividad.id} onClick={this.tablaclick}>
                                               <td>{actividad.id}</td>
                                               <td>{actividad.fecha}</td>
                                               <td>{actividad.hora}</td>
                                               <td>{actividad.lugar}</td>
                                               <td>{actividad.tipo}</td>
                                               <td>{actividad.cantidad}</td>
                                               <td>{actividad.expositor}</td>
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


