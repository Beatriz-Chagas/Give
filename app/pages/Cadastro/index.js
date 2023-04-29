import React, { useState } from 'react';
import { Alert, LogBox, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import styles from './style';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import blob from '../../assets/blob.png';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Updates from 'expo-updates';

import { network } from '../../config/network';

export default function App({navigation}) {

  LogBox.ignoreAllLogs();

  //const's
  
  const [visible, setVisible] = useState(false);
  
  const [name, setName] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  //métodos

  const register = async () => {
    if(name || lastname || email || password) {
      await fetch(network.api + '/cliente/cadastro', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          lastname: lastname,
          email: email,
          password: password
        })
      })
      .then(response => response.json())
      .then(async data => {
        try {
          if(data.auth == true) {
            await AsyncStorage.setItem('@token', data.token)
            await AsyncStorage.setItem('@user', JSON.stringify(data.result))
            
            console.log(data.result);
            
            await Updates.reloadAsync();
          }
        } catch (e) {
          // saving error
        }
      })

      loadUser();
    } else {
      Alert.alert('Preencha todos os campos');
    }
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

          <View style={styles.content}>
            <Text style={[styles.text, {marginTop: 40}]}>Nome</Text>
            <TextInput style={styles.textInput} placeholder="Insira seu nome" onChangeText={(text) => setName(text)}/>
            <Text style={styles.text}>Sobrenome</Text>
            <TextInput style={styles.textInput}  placeholder="Insira seu sobrenome" onChangeText={(text) => setLastname(text)}/>
            <Text style={styles.text}>Email</Text>
            <TextInput style={styles.textInput}  placeholder="Insira seu e-mail" onChangeText={(text) => setEmail(text)}/>
            <Text style={styles.text}>Senha</Text>
            <View style={[styles.textInput, {alignItems: 'center', flexDirection: 'row'}]}>
              <TextInput style={{width: '90%'}}  placeholder="Insira sua senha" secureTextEntry={!visible} onChangeText={(text) => setPassword(text)}></TextInput>
              <TouchableOpacity onPress={()=>{setVisible(!visible)}}>
                  <Entypo name={visible?'eye':'eye-with-line'} size={24} color='black' />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={register} style={styles.roundButton1}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Cadastrar</Text>
            </TouchableOpacity>
          </View>

    </View>
  );
}