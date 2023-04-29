import React, { useEffect, useState } from 'react';
import * as Updates from 'expo-updates';
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import blob from '../../assets/blob.png';

import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';


import { network } from '../../config/network';
import styles from './style';

export default function App({navigation}) {

  //const's

  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  //métodos

  const login = async () => {
    await fetch(network.api + '/cliente/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(async data => {
      try {
        await AsyncStorage.setItem('@token', data.token)
        await AsyncStorage.setItem('@user', JSON.stringify(data.result));
        console.log(data.result);
        await Updates.reloadAsync();
        console.log("something");
      } catch (e) {
        // saving error
      }
    })
  }

  //main

  return (
    <View style={styles.container}>
      <View style={styles.blobContainer}>
        <Image styles={styles.blob} source={blob}/>
      </View>
      <TouchableOpacity style={styles.leftBtn} onPress={() => navigation.navigate('Inicio')}>
            <MaterialIcons style={styles.alignEnd} name="keyboard-arrow-left" size={50} color="#fff" />
        </TouchableOpacity>

      <Text style={[styles.text,{marginTop: 150}]}>Email</Text>
      <TextInput style={styles.textInput} placeholder="Insira seu e-mail" onChangeText={(text) => setEmail(text)}/>
      <Text style={styles.text}>Senha</Text>
      <View style={[styles.textInput, {alignItems: 'center', flexDirection: 'row'}]}>
        <TextInput style={{width: '90%'}} placeholder="Insira sua senha" secureTextEntry={!visible} onChangeText={(text) => setPassword(text)}></TextInput>
        <TouchableOpacity onPress={()=>{setVisible(!visible)}}>
            <Entypo name={visible?"eye":"eye-with-line"} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={login} style={styles.roundButton1}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}