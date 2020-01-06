import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableHighlight,  ImageBackground } from 'react-native';
import axios from 'axios';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            user: "",
            password: "",
            mipassword: "",
            usuarios: ""

        };
    }

    handleUser = (text) => {
        this.setState({ user: text })
    };
    handlePass = (text) => {
        this.setState({ password: text })
    };

    login = (user, password) => {
        axios.get(`http://192.168.1.14:4000/api/usuarios/${user}`)
            .then(response => {
                this.setState({usuarios: response.data});
                if (this.state.usuarios.us === user){
                    if (this.state.usuarios.pass === password) {
                        alert('Bienvenido ' + this.state.usuarios.tipo );
                        this.props.navigation.navigate('SecondPage')
                    } else {
                        alert('La contraseña no es la adecuada')
                    }
                } else {
                    alert('El usuario no existe en el sistema');
                }
                console.log(this.state.usuarios.us)
            })
            .catch(error => {
                console.log(error)
            });
    };

    render() {
        return (
            <ImageBackground style={styles.container} source={require('../assets/images/fondo.png')} >
            <View  style={styles.container}>
                <Image
                        style={styles.imagen}
                        source={require('../assets/images/logo.png')}
                    />
                    <Text/>
                    <Text style={styles.texto1}>
                        Inicio de sesión
                    </Text>
                    <Text/>
                    <TextInput style={styles.cuadro1}
                               placeholder = "Usuario"
                               onChangeText = {this.handleUser}
                    />
                    <Text/>
                    <TextInput style={styles.cuadro1}
                               placeholder = "Contraseña"
                               onChangeText = {this.handlePass}
                    />
                    <Text/>
                    <TouchableHighlight
                        style={styles.boton}
                        onPress = {
                            () => this.login(this.state.user, this.state.password)
                        }
                    >
                        <Text style={styles.texto2}>Ingresar</Text>
                    </TouchableHighlight>
            </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
    },


    imagen: {
        width: 60,
        height: 60,

        borderRadius: 40
    },
    texto1: {

      fontSize:30,
    },
    texto2: {
        textAlign:'center',
        top:-7,
        color: 'yellow',
        fontSize:16
    },
    cuadro1: {
        padding:10,
        borderRadius: 10,
        textAlign:'center',
        borderWidth:1,
        height: 35,
        width:200,
        color: 'white'
    },
    boton: {
        backgroundColor: 'red',
        padding:10,
        height:30,
        width:170,
        borderRadius: 10
    }

});

module.exports = Login;