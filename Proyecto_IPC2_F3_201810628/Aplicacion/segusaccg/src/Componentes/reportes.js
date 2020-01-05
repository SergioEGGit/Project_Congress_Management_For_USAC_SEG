import React, {Component} from 'react';
import './reportes.css';
import axios from 'axios';
import {Table} from "react-bootstrap";
import Logo from "../Assets/login.jpg";
const $ =  require('jquery');
const jsPDF = require('jspdf') ;


class reportes extends Component {

    constructor(props) {

        super(props);

        this.state = {
            usuarios: [],
            asistentes: [],
            tipo: "",
            gastoseingresos: [],
            cursos: [],
            curso: "",
            seccion: "",
            asignacionactividades: [],
            actividadesasig: [],
            actividades: [],
            id_actividad: "",
            punteo: []
        };
       this.generarreporte = this.generarreporte.bind(this);
       this.tablaclick = this.tablaclick.bind(this);
       this.tablaclick2 = this.tablaclick2.bind(this);
    }

    componentDidMount() {
         axios.get('http://localhost:4000/api/cursos')
            .then(response => {
               this.setState({cursos: response.data});
            })
            .catch(error => {
                console.log(error)
            });
        axios.get('http://localhost:4000/api/actividades')
            .then(response => {
                this.setState({actividades: response.data});
            })
            .catch(error => {
                console.log(error)
            });
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };


    generarreporte() {
        const {tipo} = this.state;
        if(tipo === "Est Vs. Asis") {
            axios.get('http://localhost:4000/api/usuarios')
                .then(response => {
                    alert("Reportes Generado Con Exito");
                    const arreglo = response.data.filter(d => d.tipo === "Estudiante");
                    this.setState({usuarios: arreglo});

                })
                .catch(error => {
                    console.log(error)
                });
            axios.get('http://localhost:4000/api/gastoseingresos')
                .then(response => {
                    const arreglo = response.data.filter(d => d.estudiante !== "");
                    this.setState({asistentes: arreglo});
                    let pdf = new jsPDF('p', 'pt', 'letter');
                    let source = $('#divxd')[0];
                    let margins = {
                        top: 80,
                        bottom: 60,
                        left: 100,
                        width: 200
                    };
                    pdf.text(170,20,"Estudiantes Registrados Vs. Asistentes");
                    pdf.fromHTML(
                        source,
                        margins.left,
                        margins.top, {
                            'width': margins.width,
                        },

                        function (dispose) {
                            pdf.save('EstudiantesRegistradosVs.Asistentes.pdf');
                        }, margins
                    );
                })
                .catch(error => {
                    console.log(error)
                });

        }
        if(tipo === "Total Ingresos Por Entradas") {
            axios.get('http://localhost:4000/api/gastoseingresos')
                .then(response => {
                    alert("Reportes Generado Con Exito");
                    let total = 0;
                    const arreglo = response.data.filter(d => d.subtipo === "Venta Entradas");
                    for(let i = 0;i<arreglo.length;i++){
                        total += parseFloat(arreglo[i].total);
                    }
                    alert("El Total De Ingresos Por Entradas Es De " + total);
                    let pdf = new jsPDF('p', 'pt', 'letter');
                    pdf.text(250,20,"Total De Ingresos Por Entradas");
                    pdf.text(300,40,total.toString());
                    pdf.save("TotalIngresosEntradas.pdf")
                })
                .catch(error => {
                    console.log(error)
                });
        }
        if(tipo === "Ingresos Totales") {
            axios.get('http://localhost:4000/api/gastoseingresos')
                .then(response => {
                    alert("Reportes Generado Con Exito");
                    let total = 0;
                    const arreglo = response.data.filter(d => d.tipo === "Ingreso");
                    this.setState({gastoseingresos: arreglo});
                    for(let i = 0;i<arreglo.length;i++){
                        total += parseFloat(arreglo[i].total);
                    }
                    alert("El Total De Ingresos Es De " + total);
                    let pdf = new jsPDF('p', 'pt', 'letter');
                    let source = $('#tablep7887')[0];
                    let margins = {
                        top: 80,
                        bottom: 60,
                        left: 100,
                        width: 200
                    };
                    pdf.text(250,20,"Total De Ingresos");
                    pdf.text(300,40,total.toString());
                    pdf.text(235,60,"Desglose De Ingresos");
                    pdf.fromHTML(
                        source,
                        margins.left,
                        margins.top, {
                            'width': margins.width,
                        },

                        function (dispose) {
                            pdf.save('TotalIngresos.pdf');
                        }, margins
                    );
                })
                .catch(error => {
                    console.log(error)
                });
        }
        if(tipo === "Egresos Totales") {
            axios.get('http://localhost:4000/api/gastoseingresos')
                .then(response => {
                    alert("Reportes Generado Con Exito");
                    let total = 0;
                    const arreglo = response.data.filter(d => d.tipo === "Egreso");
                    this.setState({gastoseingresos: arreglo});
                    for(let i = 0;i<arreglo.length;i++){
                        total += parseFloat(arreglo[i].total);
                    }
                    alert("El Total De Egresos Es De " + total);
                    let pdf = new jsPDF('p', 'pt', 'letter');
                    let source = $('#tablep7887')[0];
                    let margins = {
                        top: 80,
                        bottom: 60,
                        left: 100,
                        width: 200
                    };
                    pdf.text(250,20,"Total De Egresos");
                    pdf.text(300,40,total.toString());
                    pdf.text(235,60,"Desglose De Egresos");
                    pdf.fromHTML(
                        source,
                        margins.left,
                        margins.top, {
                            'width': margins.width,
                        },

                        function (dispose) {
                            pdf.save('TotalEgresos.pdf');
                        }, margins
                    );

                })
                .catch(error => {
                    console.log(error)
                });
        }
        if(tipo === "Asistentes Por Curso") {
            axios.get('http://localhost:4000/api/asignacioncurso')
                .then(response => {

                    const arreglo = response.data.filter(d => d.curso === this.state.curso && d.secciona === this.state.seccion);
                    //console.log(arreglo);
                    let arreglo2 = [];
                    let arreglo3 = [];
                    axios.get('http://localhost:4000/api/asignacionactividades')
                        .then(response => {
                            for(let i = 0;i<arreglo.length;i++){
                                for(let j = 0;j<response.data.length;j++){
                                    if(arreglo[i].estudiante === response.data[j].participante){
                                        arreglo2.push(response.data[j]);
                                    }
                                }
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        });
                    axios.get('http://localhost:4000/api/usuarios')
                        .then(response => {
                            for(let i = 0;i<arreglo2.length;i++){
                                for(let j = 0;j<response.data.length;j++){
                                    if(arreglo2[i].participante === response.data[j].us){
                                        arreglo3.push(response.data[j]);
                                    }
                                }
                            }
                            for(let z = 0;z<arreglo2.length;z++){
                                arreglo2[z].identificacion = arreglo3[z].identificacion;
                            }
                            this.setState({actividadesus: arreglo3});
                            let reply = prompt("El Reporte Se Ordenara Por El Número De carné!  Seleccione El TIpo De Orden?", "Ascendente O Descendente");
                            if(reply !== null){
                                if(reply === "Ascendente") {
                                    let Ascendente = arreglo2.sort(function (a, b) {
                                        return ((a.identificacion === b.identificacion) ? 0 : ((a.identificacion  > b.identificacion ) ? 1 : -1 ));
                                    });
                                    this.setState({asignacionactividades:  Ascendente});
                                    alert("Reportes Generado Con Exito");
                                }
                                if(reply === "Descendente") {
                                    let Descendente = arreglo2.sort(function (a, b) {
                                        return ((a.identificacion === b.identificacion) ? 0 : ((a.identificacion  < b.identificacion ) ? 1 : -1 ));
                                    });
                                    this.setState({asignacionactividades:  Descendente});
                                    alert("Reportes Generado Con Exito");
                                }
                                if(reply === "") {
                                    alert("Debe Seleccionar Un Tipo De Orden")
                                }
                            } else {
                            }
                            let pdf = new jsPDF('p', 'pt', 'letter');
                            let source = $('#tablep258')[0];
                            let margins = {
                                top: 60,
                                bottom: 60,
                                left: 80,
                                width: 200
                            };
                            pdf.text(250,20,"Asistentes Por Curso");
                            pdf.fromHTML(
                                source,
                                margins.left,
                                margins.top, {
                                    'width': margins.width,
                                },

                                function (dispose) {
                                    pdf.save('Asistentes Por Curso.pdf');
                                }, margins
                            );

                        })
                        .catch(error => {
                            console.log(error)
                        });
                })
                .catch(error => {
                    console.log(error)
                });
        }
        if(tipo === "Asistentes Por Actividad") {
            axios.get('http://localhost:4000/api/asignacionactividades')
                .then(response => {
                    const arreglo = response.data.filter(d => d.id_actividad === this.state.id_actividad);
                    let arreglo2 = [];
                    axios.get('http://localhost:4000/api/usuarios')
                        .then(response => {
                            for(let i = 0;i<arreglo.length;i++){
                                for(let j = 0;j<response.data.length;j++){
                                    if(arreglo[i].participante === response.data[j].us){
                                        arreglo2.push(response.data[j]);
                                    }
                                }
                            }
                            for(let z = 0;z<arreglo.length;z++){
                                arreglo[z].identificacion = arreglo2[z].identificacion;
                                arreglo[z].nacionalidad = arreglo2[z].nacionalidad;
                                arreglo[z].universidad = arreglo2[z].universidad;
                            }

                            let reply = prompt("Por Que Campo Desea Ordenar El Reporte?", "Carne O Universidad O Nacionalidad");
                            if(reply !== null){
                                if(reply === "Carne"){
                                    let orden = prompt("Seleccione El Tipo De Orden", "Ascendente O Descendente");
                                    if(orden === "Ascendente") {
                                        let Ascendente = arreglo.sort(function (a, b) {
                                            return ((a.identificacion === b.identificacion) ? 0 : ((a.identificacion  > b.identificacion ) ? 1 : -1 ));
                                        });
                                        this.setState({actividadesasig: Ascendente});
                                        alert("Reportes Generado Con Exito");
                                    }
                                    if(orden === "Descendente") {
                                        let Descendente = arreglo.sort(function (a, b) {
                                            return ((a.identificacion === b.identificacion) ? 0 : ((a.identificacion  < b.identificacion ) ? 1 : -1 ));
                                        });
                                        this.setState({actividadesasig:  Descendente});
                                        alert("Reportes Generado Con Exito");
                                    }
                                    if(orden === "") {
                                        alert("Debe Seleccionar Un Tipo De Orden")
                                    }
                                }
                                if(reply === "Universidad"){
                                    let orden = prompt("Seleccione El Tipo De Orden", "Ascendente O Descendente");
                                    if(orden === "Ascendente") {
                                        let Ascendente = arreglo.sort(function (a, b) {
                                            return ((a.universidad === b.universidad) ? 0 : ((a.universidad  > b.universidad ) ? 1 : -1 ));
                                        });
                                        this.setState({actividadesasig: Ascendente});
                                        alert("Reportes Generado Con Exito");
                                    }
                                    if(orden === "Descendente") {
                                        let Descendente = arreglo.sort(function (a, b) {
                                            return ((a.universidad === b.universidad) ? 0 : ((a.universidad  < b.universidad ) ? 1 : -1 ));
                                        });
                                        this.setState({actividadesasig:  Descendente});
                                        alert("Reportes Generado Con Exito");
                                    }
                                    if(orden === "") {
                                        alert("Debe Seleccionar Un Tipo De Orden")
                                    }
                                }
                                if(reply === "Nacionalidad") {
                                    let orden = prompt("Seleccione El Tipo De Orden", "Ascendente O Descendente");
                                    if(orden === "Ascendente") {
                                        let Ascendente = arreglo.sort(function (a, b) {
                                            return ((a.nacionalidad === b.nacionalidad) ? 0 : ((a.nacionalidad  > b.nacionalidad ) ? 1 : -1 ));
                                        });
                                        this.setState({actividadesasig: Ascendente});
                                        alert("Reportes Generado Con Exito");
                                    }
                                    if(orden === "Descendente") {
                                        let Descendente = arreglo.sort(function (a, b) {
                                            return ((a.nacionalidad === b.nacionalidad) ? 0 : ((a.nacionalidad  < b.nacionalidad ) ? 1 : -1 ));
                                        });
                                        this.setState({actividadesasig:  Descendente});
                                        alert("Reportes Generado Con Exito");
                                    }
                                    if(orden === "") {
                                        alert("Debe Seleccionar Un Tipo De Orden")
                                    }
                                }
                                if(reply === "") {
                                    alert("Debe De Especificar Un Campo")
                                }
                            } else {

                            }
                            let pdf = new jsPDF('p', 'pt', 'letter');
                            let source = $('#table258')[0];
                            let margins = {
                                top: 60,
                                bottom: 60,
                                left: 80,
                                width: 300
                            };
                            pdf.text(250,20,"Asistentes Por Actividad");
                            pdf.fromHTML(
                                source,
                                margins.left,
                                margins.top, {
                                    'width': margins.width,
                                },

                                function (dispose) {
                                    pdf.save('Asistentes Por Actividad.pdf');
                                }, margins
                            );

                        })
                        .catch(error => {
                            console.log(error)
                        });

                })
                .catch(error => {
                    console.log(error)
                });
        }
        if(tipo === "Conferencias Mejor Punteadas") {
            axios.get('http://localhost:4000/api/actividades')
                .then(response => {
                    const arreglo = response.data.filter(d => d.tipo === "Conferencia");
                    let punteo = [] ;
                    let promedio = [];
                    let total = 0;
                    let contador = 0;
                    let N = 0;
                    axios.get('http://localhost:4000/api/asignacionactividades')
                        .then(response => {
                            console.log(response);
                            for(let i = 0;i<arreglo.length;i++){
                                for(let j = 0;j<response.data.length;j++){
                                    if(arreglo[i].id === response.data[j].id_actividad){
                                        total = total + parseInt(response.data[j].puntuacion);
                                        contador++;
                                    }
                                    punteo[i] = "" + total;
                                    if(contador > 0) {
                                        N = total/contador;
                                        promedio[i] = "" + parseInt(N);
                                    } else {
                                        promedio[i] = "" + 0;
                                    }
                                    }
                                total = 0;
                                contador = 0;
                                arreglo[i].puntuacion = promedio[i];

                            }
                                let Descendente = arreglo.sort(function (a, b) {
                                return b.puntuacion - a.puntuacion
                            });

                            for(let w = 0;w<arreglo.length;w++){
                                if(arreglo[w].puntuacion === "0") {
                                    arreglo[w].puntuacion = "-";
                                }
                            axios.put(`http://localhost:4000/api/actividades/${arreglo[w].id}`, {
                                fecha: arreglo[w].fecha,
                                hora_i: arreglo[w].hora_i,
                                hora_f: arreglo[w].hora_f,
                                lugar: arreglo[w].lugar,
                                tipo: arreglo[w].tipo,
                                cantidad: arreglo[w].cantidad,
                                expositor: arreglo[w].expositor,
                                descripcion: arreglo[w].descripcion,
                                puntuacion: arreglo[w].puntuacion
                            })
                                .then(response => {
                                    console.log(response);
                                })
                                .catch(error => {
                                    console.log(error.response)
                                });
                            }

                            alert("Reporte Generado Con Exito");
                            this.setState({punteo: Descendente});
                            let pdf = new jsPDF('p', 'pt', 'letter');
                            let source = $('#tabs5689')[0];
                            let margins = {
                                top: 60,
                                bottom: 60,
                                left: 80,
                                width: 300
                            };
                            pdf.text(250,20,"Conferencias Mejor Punteadas");
                            pdf.fromHTML(
                                source,
                                margins.left,
                                margins.top, {
                                    'width': margins.width,
                                },

                                function (dispose) {
                                    pdf.save('Conferencias Mejor Punteadas.pdf');
                                }, margins
                            );

                        })
                        .catch(error => {
                            console.log(error)
                        });

                })
                .catch(error => {
                    console.log(error)
                });
        }
        if(tipo === "Talleres Mejor Punteados") {
            axios.get('http://localhost:4000/api/actividades')
                .then(response => {
                    const arreglo = response.data.filter(d => d.tipo === "Taller");
                    let punteo = [] ;
                    let promedio = [];
                    let total = 0;
                    let contador = 0;
                    let N = 0;
                    console.log(arreglo);
                    axios.get('http://localhost:4000/api/asignacionactividades')
                        .then(response => {
                            console.log(response);
                            for(let i = 0;i<arreglo.length;i++){
                                for(let j = 0;j<response.data.length;j++){
                                    if(arreglo[i].id === response.data[j].id_actividad){
                                        total = total + parseInt(response.data[j].puntuacion);
                                        contador++;
                                    }
                                    punteo[i] = "" + total;
                                    if(contador > 0) {
                                        N = total/contador;
                                        promedio[i] = "" + parseInt(N);
                                     } else {
                                        promedio[i] = "" + 0;
                                    }
                                }
                                total = 0;
                                contador = 0;
                                arreglo[i].puntuacion = promedio[i];
                            }
                            let Descendente = arreglo.sort(function (a, b) {
                                return b.puntuacion - a.puntuacion
                            });

                            for(let w = 0;w<arreglo.length;w++){
                                if(arreglo[w].puntuacion === "0") {
                                    arreglo[w].puntuacion = "-";
                                }
                                axios.put(`http://localhost:4000/api/actividades/${arreglo[w].id}`, {
                                    fecha: arreglo[w].fecha,
                                    hora_i: arreglo[w].hora_i,
                                    hora_f: arreglo[w].hora_f,
                                    lugar: arreglo[w].lugar,
                                    tipo: arreglo[w].tipo,
                                    cantidad: arreglo[w].cantidad,
                                    expositor: arreglo[w].expositor,
                                    descripcion: arreglo[w].descripcion,
                                    puntuacion: arreglo[w].puntuacion
                                })
                                    .then(response => {
                                        console.log(response);
                                    })
                                    .catch(error => {
                                        console.log(error.response)
                                    });
                            }

                            alert("Reporte Generado Con Exito");
                            this.setState({punteo: Descendente});
                            let pdf = new jsPDF('p', 'pt', 'letter');
                            let source = $('#tabs5689')[0];
                            let margins = {
                                top: 60,
                                bottom: 60,
                                left: 80,
                                width: 300
                            };
                            pdf.text(250,20,"Talleres Mejor Punteadas");
                            pdf.fromHTML(
                                source,
                                margins.left,
                                margins.top, {
                                    'width': margins.width,
                                },

                                function (dispose) {
                                    pdf.save('Talleres Mejor Punteadas.pdf');
                                }, margins
                            );

                        })
                        .catch(error => {
                            console.log(error)
                        });

                })
                .catch(error => {
                    console.log(error)
                });
        }
        if(tipo === "Visitas Técnicas Mejor Punteadas") {
            axios.get('http://localhost:4000/api/actividades')
                .then(response => {
                    const arreglo = response.data.filter(d => d.tipo === "Visita Tecnica");
                    let punteo = [] ;
                    let promedio = [];
                    let total = 0;
                    let contador = 0;
                    let N = 0;
                    console.log(arreglo);
                    axios.get('http://localhost:4000/api/asignacionactividades')
                        .then(response => {
                            console.log(response);
                            for(let i = 0;i<arreglo.length;i++){
                                for(let j = 0;j<response.data.length;j++){
                                    if(arreglo[i].id === response.data[j].id_actividad){
                                        total = total + parseInt(response.data[j].puntuacion);
                                        contador++;
                                    }
                                    punteo[i] = "" + total;
                                    if(contador > 0) {
                                        N = total/contador;
                                        promedio[i] = "" + parseInt(N);
                                    } else {
                                        promedio[i] = "" + 0;
                                    }
                                }
                                total = 0;
                                contador = 0;
                                arreglo[i].puntuacion = promedio[i];
                                }
                            let Descendente = arreglo.sort(function (a, b) {
                                return b.puntuacion - a.puntuacion
                            });

                            for(let w = 0;w<arreglo.length;w++){
                                if(arreglo[w].puntuacion === "0") {
                                    arreglo[w].puntuacion = "-";
                                }
                                axios.put(`http://localhost:4000/api/actividades/${arreglo[w].id}`, {
                                    fecha: arreglo[w].fecha,
                                    hora_i: arreglo[w].hora_i,
                                    hora_f: arreglo[w].hora_f,
                                    lugar: arreglo[w].lugar,
                                    tipo: arreglo[w].tipo,
                                    cantidad: arreglo[w].cantidad,
                                    expositor: arreglo[w].expositor,
                                    descripcion: arreglo[w].descripcion,
                                    puntuacion: arreglo[w].puntuacion
                                })
                                    .then(response => {
                                        console.log(response);
                                    })
                                    .catch(error => {
                                        console.log(error.response)
                                    });
                            }

                            alert("Reporte Generado Con Exito");
                            this.setState({punteo: Descendente});
                            let pdf = new jsPDF('p', 'pt', 'letter');
                            let source = $('#tabs5689')[0];
                            let margins = {
                                top: 60,
                                bottom: 60,
                                left: 80,
                                width: 300
                            };
                            pdf.text(250,20,"Visitas Tecnicas Mejor Punteadas");
                            pdf.fromHTML(
                                source,
                                margins.left,
                                margins.top, {
                                    'width': margins.width,
                                },

                                function (dispose) {
                                    pdf.save('Visitas Tecnicas Mejor Punteadas.pdf');
                                }, margins
                            );

                        })
                        .catch(error => {
                            console.log(error)
                        });

                })
                .catch(error => {
                    console.log(error)
                });
        }

    }


    tablaclick(event){
        let _this = this;
        $('#tablep789987 tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let curso = $(this).find('td:eq( 2 )').html();
            let seccion = $(this).find('td:eq( 3 )').html();
            alert("Curso Seleccionado Con Exito");
            _this.setState({
                curso: curso,
                seccion: seccion
            })

        });

        event.preventDefault();
    }

    tablaclick2(event){
        let _this = this;
        $('#tablep654456 tr').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let id_actividad = $(this).find('td:eq( 0 )').html();
            alert("Actividad Seleccionada Con Exito");
            _this.setState({
                id_actividad: id_actividad
            })

        });

        event.preventDefault();
    }


    render() {

        const {asistentes, tipo,usuarios, gastoseingresos, cursos, asignacionactividades, actividadesasig, actividades, punteo} = this.state;
        let i = 0;
        let j = 0;
        let z = 0;
        let w = 0;
        return (

            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="loop"/>
                <label id="curs" name="labeli">Reportes</label>
                <label id="cursxd" name="labeli">Ingresos y Egresos</label>
                <label id="cursxd5689" name="labeli">Actividades Mejor Valoradas</label>
                <label id="curso1212" name="labeli">Estudiantes Registrados</label>
                <label id="curso2121" name="labeli">Asistentes</label>
                <label id="curso789987" name="labeli">Cursos</label>
                <label id="curso369" name="labeli">Actividades</label>
                <label id="curso258" name="labeli">Asistentes Por Curso</label>
                <label id="curs258" name="labeli">Asistentes Por Actividad</label>
                <input name="buttoni" type="button" id="rep" onClick={this.generarreporte} value="Generar Reportes"/>

                <select id ="tiporep" name="tipo" onChange={this.changeHandler} value={tipo}>
                    <option id ="comboti" value="Tipo Reporte">Tipo Reporte</option>
                    <option id ="comboti" value="Est Vs. Asis">Est Vs. Asis</option>
                    <option id ="comboti" value="Total Ingresos Por Entradas">Total Ingresos Por Entradas</option>
                    <option id ="comboti" value="Ingresos Totales">Ingresos Totales</option>
                    <option id ="comboti" value="Egresos Totales">Egresos Totales</option>
                    <option id ="comboti" value="Asistentes Por Curso">Asistentes Por Curso</option>
                    <option id ="comboti" value="Asistentes Por Actividad">Asistentes Por Actividad</option>
                    <option id ="comboti" value="Conferencias Mejor Punteadas">Conferencias Mejor Punteadas</option>
                    <option id ="comboti" value="Talleres Mejor Punteados">Talleres Mejor Punteados</option>}
                    <option id ="comboti" value="Visitas Técnicas Mejor Punteadas">Visitas Técnicas Mejor Punteadas</option>
                </select>


            <div id="divxd">
                <div id="tabs2121">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Estudiante</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            usuarios.length ?
                                usuarios.map(
                                    usuario =>
                                        <tr key={i = i + 1}>
                                            <td>{i}</td>
                                            <td>{usuario.us}</td>
                                        </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>


                <div id="tabs3232">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Estudiante</th>
                        </tr>
                        </thead>
                        <tbody>
                        {

                            asistentes.length ?
                                asistentes.map(
                                    asistente =>
                                        <tr key={j = j + 1}>
                                            <td>{j}</td>
                                            <td>{asistente.estudiante}</td>
                                        </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>
            </div>

                <div id="tablep7887">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Código</th>
                            <th width="60">Descripción</th>
                            <th width="60">Total</th>
                            <th width="60">Fecha</th>
                            <th width="60">Tipo</th>
                            <th width={20}>Subtipo</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            gastoseingresos.length ?
                                gastoseingresos.map(
                                    gastoseingreso =>
                                        <tr key={gastoseingreso.id}>
                                            <td>{gastoseingreso.id}</td>
                                            <td>{gastoseingreso.codigo}</td>
                                            <td>{gastoseingreso.descripcion}</td>
                                            <td>{gastoseingreso.total}</td>
                                            <td>{gastoseingreso.fecha}</td>
                                            <td>{gastoseingreso.tipo}</td>
                                            <td>{gastoseingreso.subtipo}</td>
                                        </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>


                <div id="tablep789987">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Codigo</th>
                            <th width="60">Nombre</th>
                            <th width="60">Sección</th>
                            <th width="60">Universidad</th>
                            <th width="60">Titular</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            cursos.length ?
                                cursos.map(
                                    curso =>
                                        <tr key={curso.id}  onClick={this.tablaclick}>
                                            <td>{curso.id}</td>
                                            <td>{curso.codigo}</td>
                                            <td>{curso.nombre}</td>
                                            <td>{curso.seccion}</td>
                                            <td>{curso.universidad}</td>
                                            <td>{curso.titular}</td>
                                        </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>



                <div id="tablep258">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Actividad</th>
                            <th width="60">Tipo</th>
                            <th width="60">Identificación</th>
                            <th width="60">Participante</th>
                            <th width="60">Asistencia</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            asignacionactividades.length ?
                                asignacionactividades.map(
                                    asignacionactividad =>
                                        <tr key={z += 1}>
                                            <td>{z}</td>
                                            <td>{asignacionactividad.actividad}</td>
                                            <td>{asignacionactividad.tipo}</td>
                                            <td>{asignacionactividad.identificacion}</td>
                                            <td>{asignacionactividad.participante}</td>
                                            <td>{asignacionactividad.asistencia}</td>
                                        </tr>
                                ) :
                                null
                        }
                            </tbody>
                    </Table>
                </div>

               <div id="tablep654456">
                <Table  striped bordered hover size="sm" variant="dark">
                    <thead>
                    <tr>
                        <th width="60">Id</th>
                        <th width="60">Fecha</th>
                        <th width="60">Hora Inicio</th>
                        <th width="60">Hora Final</th>
                        <th width="60">Lugar</th>
                        <th width="60">Tipo</th>
                        <th width="60">Cantidad</th>
                        <th widht="60">Expositor</th>
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
                                    </tr>
                            ) :
                            null
                    }
                    </tbody>
                </Table>
            </div>



                <div id="table258">
                    <Table id="table" striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Actividad</th>
                            <th width="60">Tipo</th>
                            <th width="60">Identificación</th>
                            <th width="60">Participante</th>
                            <th width="60">Nacionalidad</th>
                            <th width="60">Universidad</th>
                            <th width="60">Asistencia</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            actividadesasig.length ?
                                actividadesasig.map(
                                    actividadesas =>
                                        <tr key={w += 1}>
                                            <td>{w}</td>
                                            <td>{actividadesas.actividad}</td>
                                            <td>{actividadesas.tipo}</td>
                                            <td>{actividadesas.identificacion}</td>
                                            <td>{actividadesas.participante}</td>
                                            <td>{actividadesas.nacionalidad}</td>
                                            <td>{actividadesas.universidad}</td>
                                            <td>{actividadesas.asistencia}</td>
                                        </tr>
                                ) :
                                null
                        }
                        </tbody>
                    </Table>
                </div>




                <div id="tabs5689">
                    <Table  striped bordered hover size="sm" variant="dark">
                        <thead>
                        <tr>
                            <th width="60">Id</th>
                            <th width="60">Fecha</th>
                            <th width="60">Hora Inicio</th>
                            <th width="60">Hora Final</th>
                            <th width="60">Lugar</th>
                            <th width="60">Tipo</th>
                            <th width="60">Cantidad</th>
                            <th widht="60">Expositor</th>
                            <th widht="60">Puntuación</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            punteo.length ?
                                punteo.map(
                                    pun =>
                                        <tr key={pun.id} onClick={this.tablaclick2}>
                                            <td>{pun.id}</td>
                                            <td>{pun.fecha}</td>
                                            <td>{pun.hora_i}</td>
                                            <td>{pun.hora_f}</td>
                                            <td>{pun.lugar}</td>
                                            <td>{pun.tipo}</td>
                                            <td>{pun.cantidad}</td>
                                            <td>{pun.expositor}</td>
                                            <td>{pun.puntuacion}</td>
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


export default  reportes;