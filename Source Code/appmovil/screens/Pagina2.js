import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableHighlight,  ImageBackground } from 'react-native';
import axios from 'axios';

class Pagina2 extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Menu de estudiantes </Text>
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

module.exports = Pagina2;