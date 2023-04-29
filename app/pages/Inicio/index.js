import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, Linking, LogBox, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import logo from '../../assets/logo-roxo.png';
import footer from '../../assets/bottom-img.png';
import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { network } from '../../config/network';

export default function App({navigation}) {

  LogBox.ignoreAllLogs();

  //const's

  const [name, setName] = useState();

  //handle's

  const handleRegisterPress = () => {
    navigation.navigate("Cadastro")
  }

  const handleRegisterCompanyPress = () => {
    Linking.openURL(network.web);
  }

  //

  useEffect( () => {
    carregarUsuario();
  }, [])

  //métodos

  const carregarUsuario = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user')
      if(jsonValue !== null) {
        
        setName(JSON.parse(jsonValue).name);
      }
    } catch(e) {
      // erro
    }
  }

  //main

  return (
    <View style={[styles.container, {flex: 1}]}>
       {!name &&
          <>
        <View style={styles.content}>
          <Image style={styles.logo} source={logo} />
          <Text style={[styles.text2, {color: "#7F51CF", fontSize: 20}]}>ELITE</Text>
          <TouchableOpacity style={styles.roundButton1} onPress={() => {navigation.navigate('Login')}}>
            <Text style={styles.text2}>Entrar</Text>
          </TouchableOpacity>

        
          <TouchableOpacity style={styles.roundButton2} onPress={() => navigation.navigate('Categorias')}>
            <Text style={[styles.text2, {color: "#7F51CF"}]}>Pular</Text>
          </TouchableOpacity>
        </View>
        <View>

        </View>
        <View style={styles.footer}>
          <View style={styles.textContainer}>
            <Text style={[styles.text2, {fontWeight:"100"}]} >Não possui uma conta? {"\n"}
            Clique aqui para se cadastrar</Text>
            <TouchableOpacity style={styles.arrowRight} onPress={handleRegisterPress}>
             <MaterialIcons style={styles.alignEnd} name="keyboard-arrow-right" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Image style={styles.footerImg} source={footer} />
        </>
        }
        {name &&
          <View style={styles.loginScreen}>

            <Text style={{fontWeight: "bold",
                          fontSize: 35,
                          color: "#fff",
                          marginVertical: 50,
                          marginLeft: 70
              }}>
              Bem{"\n"}Vindo(a), {"\n"} 
              {name}
            </Text>
            <TouchableOpacity style={[styles.roundButton1, 
              {backgroundColor: 'white', 
              display: 'flex', 
              flexDirection: 'row',
              position: 'absolute',
              bottom: 80,
              right: -80}]
            } 
            onPress={() => navigation.navigate('Home')}>
              <Text style={[styles.text2, {color: '#7F51CF', marginLeft: -50, marginRight: 100,fontSize: 17}]}>
                Próximo
              </Text>
              <MaterialIcons style={styles.alignEnd} name="keyboard-arrow-right" size={30} color="#7F51CF" />
            </TouchableOpacity>
          </View>
        }
        
    </View>
  );
}