import React, {Component} from 'react';
import './cargamasiva.css';
import Logo from "../Assets/login.jpg";
import axios from "axios";
import Papa from 'papaparse';
import ReactFileReader from 'react-file-reader';

class cargamasiva extends Component {


    constructor(props) {

      super(props);

        this.state = {
           variables: [],
           tipo: "",
           csv: []
        };

      this.submitImportar = this.submitImportar.bind(this);
      this.submitExportar = this.submitExportar.bind(this);
    }

    componentDidMount()
    {
        axios.get('http://localhost:4000/api/variables/1')
            .then(response => {
                console.log(response);
                this.setState({variables: response.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    submitImportar = files => {
        const {variables} = this.state;
        let tipo = this.state;
       if(variables.tipo_miembro === "Administrador") {
       let reader = new FileReader();
       reader.onload = function(e) {

           let results = Papa.parse(reader.result, {
               delimiter: ",",
               header: true,
           });

           if(tipo.tipo === "Usuarios"){
               let contador = 0;
               for(let i=0; i<results.data.length;i++){
                   axios.post('http://localhost:4000/api/usuarios', results.data[i])
                       .then(response => {
                           console.log(response);
                           if(i<=0) {
                               alert("Usuarios Agregados Con Exito");
                           }
                       })
                       .catch(   error => {
                           console.log(error.response);
                           if(contador<=1) {
                               let error = i + 1;
                               alert("La Estructura Del Archivo No Corresponde Con El Tipo Seleccionado En El Registro Número " + error);
                               contador = contador + 1;
                           }

                       });
               }
           }
           if(tipo.tipo === "Productos"){
               let contador = 0;
               for(let i=0; i<results.data.length;i++){
                   axios.post('http://localhost:4000/api/productos', results.data[i])
                       .then(response => {
                           console.log(response);
                           if(i<=0) {
                               alert("Productos Agregados Con Exito");
                           }
                       })
                       .catch(   error => {
                           console.log(error.response);
                           if(contador<=1) {
                               let error = i + 1;
                               alert("La Estructura Del Archivo No Corresponde Con El Tipo Seleccionado En El Registro Número " + error);
                               contador = contador + 1;
                           }

                       });
               }
           }
           if(tipo.tipo === "Contactos"){
               let contador = 0;
               for(let i=0; i<results.data.length;i++){
                   axios.post('http://localhost:4000/api/contactos', results.data[i])
                       .then(response => {
                           console.log(response);
                           if(i<=0) {
                               alert("Contactos Agregados Con Exito");
                           }
                       })
                       .catch(   error => {
                           console.log(error.response);
                           if(contador<=1) {
                               let error = i + 1;
                               alert("La Estructura Del Archivo No Corresponde Con El Tipo Seleccionado En El Registro Número " + error);
                               contador = contador + 1;
                           }

                       });
               }
           }
           if(tipo.tipo === "Cursos"){
               let contador = 0;
               for(let i=0; i<results.data.length;i++){
                   axios.post('http://localhost:4000/api/cursos', results.data[i])
                       .then(response => {
                           console.log(response);
                           if(i<=0) {
                               alert("Cursos Agregados Con Exito");
                           }
                       })
                       .catch(   error => {
                           console.log(error.response);
                           if(contador<=1) {
                               let error = i + 1;
                               alert("La Estructura Del Archivo No Corresponde Con El Tipo Seleccionado En El Registro Número " + error);
                               contador = contador + 1;
                           }

                       });
               }
           }
           if(tipo.tipo === "Actividades"){
               let contador = 0;
               for(let i=0; i<results.data.length;i++){
                  axios.post('http://localhost:4000/api/actividades', results.data[i])
                       .then(response => {
                           console.log(response);
                           if(i<=0) {
                               alert("Actividades Agregadas Con Exito");
                           }
                       })
                       .catch(   error => {
                           console.log(error.response);
                           if(contador<=1) {
                               let error = i + 1;
                               alert("La Estructura Del Archivo No Corresponde Con El Tipo Seleccionado En El Registro Número " + error);
                               contador = contador + 1;
                           }

                       });
               }
           }
           if(tipo.tipo === "Gastos E Ingresos"){
               let contador = 0;
               alert("si entre ");
               for(let i=0; i<results.data.length;i++){
                   axios.post('http://localhost:4000/api/gastoseingresos', results.data[i])
                       .then(response => {
                           console.log(response);
                           if(i<=0) {
                               alert("Gastos E Ingresos Agregados Con Exito");
                           }
                       })
                       .catch(   error => {
                           console.log(error.response);
                           if(contador<=1) {
                               let error = i + 1;
                               alert("La Estructura Del Archivo No Corresponde Con El Tipo Seleccionado En El Registro Número " + error);
                               contador = contador + 1;
                           }

                       });
               }
           }
           if(tipo.tipo === "Noticias"){
               let contador = 0;
               for(let i=0; i<results.data.length;i++){
                   axios.post('http://localhost:4000/api/noticias', results.data[i])
                       .then(response => {
                           console.log(response);
                           if(i<=0) {
                               alert("Noticias Agregados Con Exito");
                           }
                       })
                       .catch(   error => {
                           console.log(error.response);
                           if(contador<=1) {
                               let error = i + 1;
                               alert("La Estructura Del Archivo No Corresponde Con El Tipo Seleccionado En El Registro Número " + error);
                               contador = contador + 1;
                           }

                       });
               }
           }
       };
           reader.readAsText(files[0]);
       } else {
           alert("Su Usuario No Tiene Permiso De Utilizar Esta Opción");
       }
    };

    submitExportar() {
        const {variables} = this.state;
        const {tipo} = this.state;
                if(tipo === "Usuarios"){
                axios.get('http://localhost:4000/api/usuarios')
                    .then(response => {
                        console.log(response);
                        let data = "identificacion" + "," + "nombre" + "," + "fechan" + "," + "telefono" + "," + "email" + "," + "universidad" + "," + "nacionalidad" + "," + "us" + "," + "pass" + "," + "puesto" + "," + "tipo" + "\n";
                        for(let i = 0; i<response.data.length;i++) {
                            data = data + response.data[i].identificacion + "," + response.data[i].nombre + "," + response.data[i].fechan + "," + response.data[i].telefono + "," + response.data[i].email + "," + response.data[i].universidad + "," + response.data[i].nacionalidad + ","  + response.data[i].us + "," + response.data[i].pass + "," + response.data[i].puesto + ","  + response.data[i].tipo + "\n";
                        }
                        let hiddenElement = document.createElement('a');
                        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(data);
                        hiddenElement.target = '_blank';
                        hiddenElement.download = 'usuarios.csv';
                        hiddenElement.click();
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
            if(tipo === "Productos"){
                axios.get('http://localhost:4000/api/productos')
                    .then(response => {
                        console.log(response);
                        let data = "codigo" + "," + "nombre" + "," + "descripcion" + "," + "cantidad" + "," + "encargado" + "," + "ubicacion" + "," + "estado" + "\n";
                        for(let i = 0; i<response.data.length;i++) {
                            data = data + response.data[i].codigo + "," + response.data[i].nombre + "," + response.data[i].descripcion + "," + response.data[i].cantidad + "," + response.data[i].encargado + "," + response.data[i].ubicacion + "," + response.data[i].estado + "\n";
                        }
                        let hiddenElement = document.createElement('a');
                        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(data);
                        hiddenElement.target = '_blank';
                        hiddenElement.download = 'productos.csv';
                        hiddenElement.click();
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
            if(tipo === "Contactos"){
                axios.get('http://localhost:4000/api/contactos')
                    .then(response => {
                        console.log(response);
                        let data = "nombre" + "," + "telefono" + "," + "email" + "," + "direccion" + "," + "rol" + "," + "oportunidades" + "," + "encargado" + "\n";
                        for(let i = 0; i<response.data.length;i++) {
                            data = data + response.data[i].nombre + "," + response.data[i].telefono + "," + response.data[i].email + "," + response.data[i].direccion + "," + response.data[i].rol + "," + response.data[i].oportunidades + "," + response.data[i].encargado + "\n";
                        }
                        let hiddenElement = document.createElement('a');
                        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(data);
                        hiddenElement.target = '_blank';
                        hiddenElement.download = 'contactos.csv';
                        hiddenElement.click();
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
            if(tipo === "Cursos"){
                axios.get('http://localhost:4000/api/cursos')
                    .then(response => {
                        console.log(response);
                        let data = "codigo" + "," + "nombre" + "," + "seccion" + "," + "universidad" + "," + "titular" + "," + "peticion" +  "\n";
                        for(let i = 0; i<response.data.length;i++) {
                            data = data + response.data[i].codigo + "," + response.data[i].nombre + "," + response.data[i].seccion + "," + response.data[i].universidad + "," + response.data[i].titular + "," + response.data[i].peticion + "\n";
                        }
                        let hiddenElement = document.createElement('a');
                        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(data);
                        hiddenElement.target = '_blank';
                        hiddenElement.download = 'cursos.csv';
                        hiddenElement.click();
                    })
                    .catch(error => {
                        console.log(error)
                    });
            }
    }

    render() {
        const {tipo} = this.state;
         return (
            <div className="cont">
                <img src={Logo} width="96" height="100" alt="" id="logocgm"/>
                <label id="cgm" name="labeli">Carga Masiva</label>
                <label id="cgm2" name="labeli">Tipo De Carga:</label>
                <select id ="tipocom" name="tipo" onChange={this.changeHandler} value={tipo}>
                    <option id ="tipocom" value="Usuarios">Usuarios</option>
                    <option id ="tipocom" value="Productos">Productos</option>
                    <option id ="tipocom" value="Contactos">Contactos</option>
                    <option id ="tipocom" value="Cursos">Cursos</option>
                    <option id ="tipocom" value="Actividades">Actividades</option>
                    <option id ="tipocom" value="Gastos E Ingresos">Gastos E Ingresos</option>
                    <option id ="tipocom" value="Noticias">Noticias</option>
                </select>

                <ReactFileReader id="reader" handleFiles={this.submitImportar} fileTypes={'.csv'}>
                    <button className='btn' id="reader">Importar</button>
                </ReactFileReader>

                <button id="exportar" onClick={this.submitExportar} >Exportar</button>




            </div>
        );
    }
}


export default  cargamasiva;