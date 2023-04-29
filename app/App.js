import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Inicio from './pages/Inicio/index';
import Home from './pages/Home/index';
import Cadastro from './pages/Cadastro/index';
import Login from './pages/Login/index';
import Categorias from './pages/Categorias/index';
import Empresas from './pages/Empresas/index';
import EmpresaDetalhes from './pages/EmpresaDetalhes/index';
import Comentarios from './pages/Comentarios/index';
import Mapas from './pages/Mapas/index';


const Stack = createStackNavigator();

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator
      headerMode = "none"
      initialRouteName = "initialScreen">

        <Stack.Screen name = "Inicio" component={Inicio} />
        <Stack.Screen name = "Home" component={Home} />
        <Stack.Screen name = 'Cadastro' component={Cadastro} />
        <Stack.Screen name = 'Login' component={Login} />
        <Stack.Screen name = "Categorias" component={Categorias} />
        <Stack.Screen name = "Empresas" component={Empresas} />
        <Stack.Screen name = "EmpresaDetalhes" component={EmpresaDetalhes} />
        <Stack.Screen name = "Comentarios" component={Comentarios} />
        <Stack.Screen name = "Mapas" component={Mapas} />

      </Stack.Navigator>

    </NavigationContainer>

  )

}