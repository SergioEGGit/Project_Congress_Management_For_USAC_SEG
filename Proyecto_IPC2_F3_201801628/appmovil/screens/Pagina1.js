import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableHighlight,  ImageBackground } from 'react-native';
import axios from 'axios';

class Pagina1 extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Menu de Administradores y colaboradores </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
    });




module.exports = Pagina1;