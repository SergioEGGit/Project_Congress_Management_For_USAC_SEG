//This is an example of Finish Current Screen while Navigating to Next Screen//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, Text, View, Button } from 'react-native';
//import all the components we are going to use.
//For React Navigation Version 2+
//import {createSwitchNavigator} from 'react-navigation';
//For React Navigation Version 3+
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
//import createSwitchNavigator in our project
import FirstPage from './screens/Login';
import SecondPage from './screens/menu';
//import all the screens we are going to switch 
const App = createSwitchNavigator({
  //createSwitchNavigator will not store your old screen in stack like createStackNavigator
  //So all the screen that comes in createSwitchNavigator will appear once in a whole session
  FirstPage: { screen: FirstPage },
  SecondPage: { screen: SecondPage },
});
//For React Navigation Version 2+
//export default App;
//For React Navigation Version 3+
export default createAppContainer(App);