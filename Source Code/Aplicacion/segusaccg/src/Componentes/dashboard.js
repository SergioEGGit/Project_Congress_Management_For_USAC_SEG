import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
const $ = require("jquery");

class dashboard extends Component {

       constructor(props) {
           super(props);
           this.state = {
               dashboard: []
           };

           this.agregarcolumnas = this.agregarcolumnas.bind(this);
           this.modificarcolumna = this.modificarcolumna.bind(this);
           this.eliminarcolumna = this.eliminarcolumna.bind(this);
       }



       componentDidMount() {
           axios.get('http://localhost:4000/api/dashboard')
               .then(response => {
                   console.log(response);
                   this.setState({dashboard: response.data})
               })
               .catch(error => {
                   console.log(error)
               });
       }

       agregarcolumnas() {
           let reply = prompt("Escriba El Encabezado De La Columna ", "");
           console.log(reply);
           axios.post('http://localhost:4000/api/dashboard', {
               encabezado: reply
           })
               .then(response => {
                   console.log(response);
                   axios.get('http://localhost:4000/api/dashboard')
                       .then(response => {
                           console.log(response);
                           this.setState({dashboard: response.data})
                       })
                       .catch(error => {
                           console.log(error)
                       });
               })
               .catch(error => {
                   console.log(error.response)
               });
       }

       modificarcolumna() {
        let modificar = prompt("Que Desesa Modificar?","Posición O Encabezado");
        if(modificar !== null) {
            if(modificar === "Posición") {
                let id_modificar = prompt("Qué Columna Desea Mover?", "");
                let id_mover = prompt("Por Cual Columna Desea Intercambiarla?", "");
                let encabezado_modificar = "";
                let encabezado_mover = "";
                if(id_modificar > 2) {
                    if(id_mover > 2) {
                        axios.get('http://localhost:4000/api/dashboard')
                            .then(response => {
                                const arreglo_modificar = response.data.filter(d => d.id === id_modificar);
                                encabezado_modificar = arreglo_modificar[0].encabezado;
                                axios.get('http://localhost:4000/api/dashboard')
                                    .then(response => {
                                        const arreglo_mover = response.data.filter(d => d.id === id_mover);
                                        encabezado_mover = arreglo_mover[0].encabezado;
                                        axios.put(`http://localhost:4000/api/dashboard/${id_modificar}`, {
                                            id: id_mover,
                                            encabezado: encabezado_mover
                                        })
                                            .then(response => {
                                                console.log(response);
                                                axios.put(`http://localhost:4000/api/dashboard/${id_mover}`, {
                                                    id: id_modificar,
                                                    encabezado: encabezado_modificar
                                                })
                                                    .then(response => {
                                                        console.log(response);
                                                        axios.get('http://localhost:4000/api/dashboard')
                                                            .then(response => {
                                                                console.log(response);
                                                                alert("Se Cambio La Posición Con Exito");
                                                                this.setState({dashboard: response.data})
                                                            })
                                                            .catch(error => {
                                                                console.log(error)
                                                            });
                                                    })
                                                    .catch(error => {
                                                        console.log(error.response)
                                                    });
                                            })
                                            .catch(error => {
                                                console.log(error.response)
                                            });
                                    })
                                    .catch(error => {
                                        console.log(error)
                                    });
                            })
                            .catch(error => {
                                console.log(error)
                            });
                    } else {
                        alert("La Segunda Columna No Se Puede Modificar");
                    }
                } else {
                    alert("La Primera Columna No Se Puede Modificar");
                }
            }

            if(modificar === "Encabezado") {
                let id = prompt("Que Columna Desea Modificar", "");
                if(id > 2) {
                    axios.get('http://localhost:4000/api/dashboard')
                        .then(response => {
                            const arreglo = response.data.filter(d => d.id === id);
                            let encabezado = prompt("Escriba Su Encabezado", "");
                            axios.put(`http://localhost:4000/api/dashboard/${id}`, {
                                encabezado: encabezado
                            })
                                .then(response => {
                                    console.log(response);
                                    axios.get('http://localhost:4000/api/dashboard')
                                        .then(response => {
                                            console.log(response);
                                            alert("Se Cambio El Encabezado Con Exito");
                                            this.setState({dashboard: response.data})
                                        })
                                        .catch(error => {
                                            console.log(error)
                                        });
                                })
                                .catch(error => {
                                    console.log(error.response)
                                });

                        })
                        .catch(error => {
                            console.log(error)
                        });
                } else {
                    alert("La Columna Indicada No Se Puede Modificar");
                }
            }

            if(modificar === " ") {
                alert("Debe De Indiciar Lo Qué Desea Modificar");
            }

        }
        }

       eliminarcolumna() {
        let id = prompt("Qué Número De Columna Desea Eliminar", "");

        if (id > 2) {
            axios.delete(`http://localhost:4000/api/dashboard/${id}`)
                .then(response => {
                    console.log(response);
                    alert("Columna Eliminada Con Exito");
                    axios.get('http://localhost:4000/api/dashboard')
                        .then(response => {
                            console.log(response);
                            this.setState({dashboard: response.data})
                        })
                        .catch(error => {
                            console.log(error);
                        });
                })
                .catch(error => {
                    console.log(error.response);
                    alert("La Columna Indicada No Exite");
                });
        } else {
           alert("La Columna Indicada No Se Puede Eliminar");
        }
    }


    render() {
           const {dashboard} = this.state;
           return (
               <div id="cont">
                       <CssBaseline />
                       <AppBar position="absolute" style={{left: 63}}>
                           <Toolbar>
                               <Typography component="h1" variant="h6" color="inherit" noWrap>
                                   Dashboard
                               </Typography>
                               <Fab variant="extended" style={{fontSize: 10, position : "absolute", left: 650}} onClick={this.agregarcolumnas}>
                                   <AddIcon style={{fontSize: 15}}/>
                                   Añadir Columna
                               </Fab>
                               <Fab variant="extended" style={{fontSize: 10, position : "absolute", left: 800}} onClick={this.modificarcolumna}>
                                   <UpdateIcon style={{fontSize: 15}}/>
                                   Modificar Columna
                               </Fab>
                               <Fab variant="extended" style={{fontSize: 10, position : "absolute", left: 970}} onClick={this.eliminarcolumna}>
                                   <DeleteIcon style={{fontSize: 15}}/>
                                   Eliminar Columna
                               </Fab>
                           </Toolbar>
                       </AppBar>

                   <Grid container style={{flexGrow: 1, width: 1140, position: "absolute", left: 80, top: 70}} spacing={1}>
                       <Grid item xs={12}>
                           <Grid id="paper" container justify="center" spacing={1}>
                               {dashboard.map(value => (
                                   <Grid   key={value.id} item>
                                       <Paper style={{height: 580, width: 300, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', textAlign: "center"}}>
                                           <Typography id="grid" style={{color: "white",  fontSize: 20}}>
                                               {value.encabezado}
                                           </Typography>
                                       </Paper>
                                   </Grid>
                               ))}
                           </Grid>
                       </Grid>
                   </Grid>
               </div>
           );
       }
}


export default dashboard;