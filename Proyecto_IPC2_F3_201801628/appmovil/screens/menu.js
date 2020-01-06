import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import pagina1 from '../screens/Pagina1';
import pagina2 from '../screens/Pagina2';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const pagina1Stack = createStackNavigator(
    {
        Home: pagina1,
    },
    config
);

pagina1Stack.navigationOptions = {
    tabBarLabel: 'Administradores/colaboradores',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `io-person${focused ? '' : '-outline'}`
                    : 'md-person'
            }
        />
    ),
};

pagina1Stack.path = '';

const pagina2Stack = createStackNavigator(
    {
        Links: pagina2,
    },
    config
);

pagina2Stack.navigationOptions = {
    tabBarLabel: 'Estudiantes',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'io-school' : 'md-school'} />
    ),
};

pagina2Stack.path = '';


const tabNavigator = createBottomTabNavigator({
    pagina1Stack,
    pagina2Stack,

});

tabNavigator.path = '';

export default tabNavigator;
