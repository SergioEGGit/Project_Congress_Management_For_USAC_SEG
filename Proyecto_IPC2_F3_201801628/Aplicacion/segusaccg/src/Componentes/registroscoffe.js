import React, {Component} from "react";
import './registrocoffe.css';
import axios from "axios";
import Logo from "../Assets/login.jpg";
import {Table} from "react-bootstrap";
const moment = require("moment");
const $ = require("jquery");


class registrocoffe extends Component {


    constructor(props) {

        super(props);

        this.state = {
            actividades: [],
            variables: [],
            actividad: "",
            tipo: "",
            participante: "",
            asistencia: "pendiente",
            usuarios: [],
            estudiante: "",
            insumos: [],
            id_insumo: "",
            cantidad_insumo: "",
            tipo_insumo: ""

        };
        this.tablaclick = this.tablaclick.bind(this);
        this.tablaclick2 = this.tablaclick2.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/gastoseingresos')
            .then(response => {
                console.log(response);
                const arreglo = response.data.filter(d => d.subtipo === "Venta Entradas");
                this.setState({usuarios: arreglo});
            })
            .catch(error => {
                console.log(error)
            });
        axios.get('http://localhost:4000/api/productos')
            .then(response => {
                const arreglo = response.data.filter(d => d.tipo === "Coffe Break" || d.tipo === "Almuerzo" || d.tipo === "Insumos");
                this.setState({insumos: arreglo});
            })
            .catch(error => {
                console.log(error)
            })

    }


    tablaclick(event){
        let _this = this;
        $('#taa1212 tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let nombre = $(this).find('td:eq( 3 )').html();
            let fechaactual = moment().format('YYYY-MM-DD');
            let id = _this.state.id_insumo;
            console.log(id);
            axios.get('http://localhost:4000/api/coffebreak')
                .then(response => {
                     const arreglo = response.data.filter(d => d.estudiante === nombre);
                     if(arreglo.length > 0) {
                         if(_this.state.tipo_insumo === "Coffe Break") {
                             if(arreglo[0].coffe === "1") {
                                 let cantidad = parseInt(_this.state.cantidad_insumo) - 1;
                                 axios.put(`http://localhost:4000/api/coffebreak/${arreglo[0].id}`, {
                                     fecha_entrega: fechaactual,
                                     estudiante: nombre,
                                     coffe: "2",
                                     insumo: "",
                                     almuerzo: ""
                                 })
                                     .then(response => {
                                         console.log(response);
                                     })
                                     .catch(error => {
                                         console.log(error.response)
                                     });
                                 axios.get('http://localhost:4000/api/productos')
                                     .then(response => {
                                         const arreglo = response.data.filter(d => d.id === _this.state.id_insumo);
                                         axios.put(`http://localhost:4000/api/productos/${id}`, {
                                             codigo: arreglo[0].codigo,
                                             nombre: arreglo[0].nombre,
                                             descripcion: arreglo[0].descripcion,
                                             cantidad: cantidad,
                                             encargado: arreglo[0].encargado,
                                             ubicacion: arreglo[0].ubicacion,
                                             estado: arreglo[0].estado,
                                             tipo: arreglo[0].tipo
                                         })
                                             .then(response => {
                                                 console.log(response);
                                                 alert("Producto Entregado Con Exito");
                                             })
                                             .catch(error => {
                                                 console.log(error.response)
                                             });
                                     })
                                     .catch(error => {
                                         console.log(error)
                                     })
                             }
                             if(arreglo[0].coffe === "2") {
                                 alert("El Estudiante Ya Ha Resivido Sus Dos Coffe Breaks")
                             }
                         }
                         if(_this.state.tipo_insumo === "Almuerzo") {
                             alert("El Estudiante Ya Ha Resivido Su Almuerzo");
                         }
                         if(_this.state.tipo_insumo === "Insumo") {
                             alert("El Estudiante Ya Ha Resivido Su Insumo");
                         }
                     } else {
                          let cantidad = parseInt(_this.state.cantidad_insumo) - 1;
                          console.log(cantidad);
                          if(_this.state.tipo_insumo === "Coffe Break") {
                              axios.post('http://localhost:4000/api/coffebreak', {
                                  fecha_entrega: fechaactual,
                                  estudiante: nombre,
                                  coffe: "1",
                                  insumo: "",
                                  almuerzo: ""
                              })
                                  .then(response => {
                                      console.log(response);
                                  })
                                  .catch(error => {
                                      console.log(error.response)
                                  });
                              axios.get('http://localhost:4000/api/productos')
                                  .then(response => {
                                      const arreglo = response.data.filter(d => d.id === _this.state.id_insumo);
                                      axios.put(`http://localhost:4000/api/productos/${id}`, {
                                          codigo: arreglo[0].codigo,
                                          nombre: arreglo[0].nombre,
                                          descripcion: arreglo[0].descripcion,
                                          cantidad: cantidad,
                                          encargado: arreglo[0].encargado,
                                          ubicacion: arreglo[0].ubicacion,
                                          estado: arreglo[0].estado,
                                          tipo: arreglo[0].tipo
                                      })
                                          .then(response => {
                                              console.log(response);
                                              alert("Producto Entregado Con Exito");
                                          })
                                          .catch(error => {
                                              console.log(error.response)
                                          });
                                  })
                                  .catch(error => {
                                      console.log(error)
                                  })
                          }
                          if(_this.state.tipo_insumo === "Almuerzo") {
                             axios.post('http://localhost:4000/api/coffebreak', {
                                 fecha_entrega: fechaactual,
                                 estudiante: nombre,
                                 coffe: "",
                                 insumo: "1",
                                 almuerzo: ""
                             })
                                 .then(response => {
                                     console.log(response);
                                 })
                                 .catch(error => {
                                     console.log(error.response)
                                 });
                             axios.get('http://localhost:4000/api/productos')
                                 .then(response => {
                                     const arreglo = response.data.filter(d => d.id === _this.state.id_insumo);
                                     axios.put(`http://localhost:4000/api/productos/${id}`, {
                                         codigo: arreglo[0].codigo,
                                         nombre: arreglo[0].nombre,
                                         descripcion: arreglo[0].descripcion,
                                         cantidad: cantidad,
                                         encargado: arreglo[0].encargado,
                                         ubicacion: arreglo[0].ubicacion,
                                         estado: arreglo[0].estado,
                                         tipo: arreglo[0].tipo
                                     })
                                         .then(response => {
                                             console.log(response);
                                             alert("Producto Entregado Con Exito");
                                         })
                                         .catch(error => {
                                             console.log(error.response)
                                         });
                                 })
                                 .catch(error => {
                                     console.log(error)
                                 })
                         }
                          if(_this.state.tipo_insumo === "Insumos") {
                             axios.post('http://localhost:4000/api/coffebreak', {
                                 fecha_entrega: fechaactual,
                                 estudiante: nombre,
                                 coffe: "",
                                 insumo: "",
                                 almuerzo: "1"
                             })
                                 .then(response => {
                                     console.log(response);
                                 })
                                 .catch(error => {
                                     console.log(error.response)
                                 });
                             axios.get('http://localhost:4000/api/productos')
                                 .then(response => {
                                     const arreglo = response.data.filter(d => d.id === _this.state.id_insumo);
                                     axios.put(`http://localhost:4000/api/productos/${id}`, {
                                         codigo: arreglo[0].codigo,
                                         nombre: arreglo[0].nombre,
                                         descripcion: arreglo[0].descripcion,
                                         cantidad: cantidad,
                                         encargado: arreglo[0].encargado,
                                         ubicacion: arreglo[0].ubicacion,
                                         estado: arreglo[0].estado,
                                         tipo: arreglo[0].tipo
                                     })
                                         .then(response => {
                                             console.log(response);
                                             alert("Producto Entregado Con Exito");
                                         })
                                         .catch(error => {
                                             console.log(error.response)
                                         });
                                 })
                                 .catch(error => {
                                     console.log(error)
                                 })
                         }
                     }
                })
                .catch(error => {
                    console.log(error)
                })
        });
        event.preventDefault();
    }




    tablaclick2(event){
        let _this = this;
        const {usuarios} = this.state;
        $('#taab1212 tr').on('click',function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let id = $(this).find('td:eq( 0 )').html();
            let cantidad = $(this).find("td:eq( 3 )").html();
            let tipo = $(this).find('td:eq( 4 )').html();
            _this.setState({
                id_insumo: id,
                cantidad_insumo: cantidad,
                tipo_insumo: tipo
            });
            alert("Producto Seleccionado Con Exito");
        });
        event.preventDefault();
    }


    render() {
        const  {insumos, usuarios}  = this.state;
        let i = 0;
        return (

            <div className="cont">

                <img src={Logo} width="96" height="100" alt="" id="loop"/>
                <label id="curso" name="labeli">Control De Entregas</label>

                <div id="taa1212">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Codigo</th>
                            <th width="60">Fecha</th>
                            <th width="60">Estudiante</th>
                            <th width="60">Descripción</th>
                            <th width="60">Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            usuarios.length ?
                                usuarios.map(
                                    usuario =>
                                        <tr key={usuario.id} onClick={this.tablaclick}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.codigo}</td>
                                            <td>{usuario.fecha}</td>
                                            <td>{usuario.estudiante}</td>
                                            <td>{usuario.descripcion}</td>
                                            <td>{usuario.total}</td>
                                        </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>

                <div id="taab1212">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Codigo</th>
                            <th width="60">Nombre</th>
                            <th width="60">Cantidad</th>
                            <th width="60">Tipo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            insumos.length ?
                                insumos.map(
                                    insumo =>
                                        <tr key={insumo.id} onClick={this.tablaclick2}>
                                            <td>{insumo.id}</td>
                                            <td>{insumo.codigo}</td>
                                            <td>{insumo.nombre}</td>
                                            <td>{insumo.cantidad}</td>
                                            <td>{insumo.tipo}</td>
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


export default  registrocoffe;