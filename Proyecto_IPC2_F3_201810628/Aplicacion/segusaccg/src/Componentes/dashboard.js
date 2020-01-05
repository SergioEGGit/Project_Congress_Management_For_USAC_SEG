import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from "axios";
const $ = require("jquery");

class dashboard extends Component {

       constructor(props) {
           super(props);
           this.state = {
               dashboard: []
           };

           this.agregarcolumnas = this.agregarcolumnas.bind(this);
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


    tablaclick(event){
        let _this = this;
        $('#paper').on('click',function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            let dato = $(this).find('h6:visible').html();
            console.log(dato);

        });

        event.preventDefault();
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
                               <Fab variant="extended" style={{fontSize: 10, position : "absolute", left: 1000}} onClick={this.agregarcolumnas}>
                                   <AddIcon style={{fontSize: 15}}/>
                                   Añadir Columna
                               </Fab>
                           </Toolbar>
                       </AppBar>

                   <Grid container style={{flexGrow: 1, width: 1140, position: "absolute", left: 80, top: 70}} spacing={1}>
                       <Grid item xs={12}>
                           <Grid container justify="center" spacing={1}>
                               {dashboard.map(value => (
                                   <Grid key={value.id} item>
                                       <Paper id="paper" style={{height: 580, width: 300, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', textAlign: "center"}} onClick={this.tablaclick}>
                                           <Typography component="h6" style={{color: "white",  fontSize: 20}}>
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