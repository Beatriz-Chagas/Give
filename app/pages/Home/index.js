import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

import { FlatList, Image, LogBox, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign , Entypo , Feather , Ionicons , MaterialCommunityIcons } from '@expo/vector-icons';

import { network } from '../../config/network';
import styles from './style';

export default function App({navigation}) {

    LogBox.ignoreAllLogs();

    //const's

    const [name, setName] = useState(null);

    const [id, setId] = useState(null);

    const [destaques, setDestaques] = useState(null);

    const [favoritos, setFavoritos] = useState(null);

    //useEffect's

    useEffect( () => {
            carregarUsuario();
            carregarDestaques();
    }, []);

    useEffect( () => {
        carregarFavoritos();
    }, [id]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            carregarUsuario();
            carregarDestaques();
        });
    
        return unsubscribe;
    }, [navigation]);

    //métodos

    const carregarUsuario = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@user');
          
          if(jsonValue !== null) {
            setName(JSON.parse(jsonValue).name);
            setId(JSON.parse(jsonValue).id);
          }
        } catch(e) {
          // error reading value
        }
    }

    const carregarDestaques = async () => {
        fetch(network.api + '/empresas/consulta/destaque', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data=> {
            setDestaques(data);
        })
    }

    const carregarFavoritos = async () => {
        await fetch(network.api + '/favoritos/lista/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': await AsyncStorage.getItem('@token')
            }
        })
        .then(response => response.json())
        .then( data => {
            if (data.length > 0) {
                console.log(data);
                console.log('------');
                console.log(destaques)
                setFavoritos(data);
            } else {
                setFavoritos(null);
            }
        })
    }

    const out = async () => {
        try {
            await AsyncStorage.removeItem('@token');
            await AsyncStorage.removeItem('@user');
            await Updates.reloadAsync();
        } catch (e) {
            // saving error
        };
    }

    //main

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.container}>
                <View style={{marginTop: 100, display: 'flex', flexDirection: 'row'}}>
                    <Text style={styles.title}>{name}</Text>
                    <TouchableOpacity style={{marginLeft: 90, marginRight: -100}} onPress={out}>
                        <AntDesign name="logout" size={24} color="#7F51CF" />
                    </TouchableOpacity>
                </View>
                    
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Empresas', {category: 'Moda'})}>
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Explorar Categorias</Text>
                </TouchableOpacity>

                {destaques &&
                    <>
                        <View style = {
                            {width: '60%',
                            
                            height: 50, 
                            marginLeft: -150,
                            justifyContent: 'center', 
                            borderTopRightRadius: 30}}>
                            <Text style={{marginLeft: 20, fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                                Destaques
                            </Text>
                        </View>
                        <FlatList
                        data={destaques}
                        //data={fakeData}
                        horizontal
                        showsHorizontalScrollIndicator = {false}
                        renderItem={( {item } ) => (
                            <Company empresa={item} navigation={navigation} />
                        )}
                        />
                    </>
                }

                {favoritos &&
                    <>
                        <View style = {{width: '60%',
                   
                    marginTop: 50,
                    marginBottom: 30,
                    marginLeft: -180,
                    justifyContent: 'center', 
                    borderTopRightRadius: 30}}>
                            <Text style={{marginLeft: 40, fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                                Seus Favoritos
                            </Text>
                        </View>
                        <FlatList 
                        data={favoritos}
                        style={styles.companyList}
                        showsVerticalScrollIndicator = {false}
                        renderItem={( {item } ) => (
                            //botao para abrir a tela de informação da empresa
                            //Colocar no onPress a ação de navegar entre páginas
                            <TouchableOpacity style={styles.alignCenter} onPress={() => {navigation.navigate('EmpresaDetalhes', {empresa: item})}}>
                            <View style={styles.company}>         
                                <View style={styles.imgContainer}>
                                <Image style={styles.image} source={{uri: network.api + '/' + item.foto_perfil}} />
                                </View>
                                <View style={styles.textCompany}>
                                    <Text style={styles.companyName}>{item.nome_empresa}</Text>
                                    <Text style={styles.companyValue}>{item.descricao}</Text>
                                    
                                </View>    
                            </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={( item ) => item.toString()}
                        />
                    </>
                }

            </View>
        </ScrollView>
    );
}

//

function Company(props) {
    const navigation = props.navigation;
    const empresa = props.empresa;

    return (
        <TouchableOpacity 
        onPress={() => {navigation.navigate('EmpresaDetalhes', {empresa: empresa})}}
        style={{
            alignItems: 'center',
           
        }}>
            <Image style={styles.img} source={{uri: network.api + '/' + empresa.foto_perfil}}></Image>
            <Text numberOfLines={1} style = {[styles.txt, { width: 120, height: 40, marginLeft: -30, backgroundColor: '#7F51CF', color: '#fff', marginVertical: 5, fontSize: 13,}]}>
                {empresa.nome_empresa}
            </Text>
        </TouchableOpacity>
    );
}
