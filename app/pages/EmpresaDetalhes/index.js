import React, { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, Linking, LogBox, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { AntDesign , Entypo , Feather , Ionicons , MaterialCommunityIcons } from '@expo/vector-icons';

import RoundImage from '../../components/RoundImage';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { network } from '../../config/network';

export default function App({ navigation, route }) {

  LogBox.ignoreAllLogs();

  //const's

  const [id, setId] = useState(null);

  const dados = route.params.empresa;

  const star = [{nivel: 1}, {nivel: 2}, {nivel: 3}, {nivel: 4}, {nivel: 5}]
  const [rating, setRating] = useState({'nivel': 0});

  const [like, setLike] = useState(false);

  //handle's

  const handleCallPress = () => {
    Linking.openURL("tel:+55" + dados.telefone);
  }

  const handleInstagramPress = () => {
    Linking.openURL(dados.instagram);
  }

  const handleSitePress = () => {
    Linking.openURL(dados.site)
  }

  const handleMapsPress = () => {
    navigation.navigate('Mapas', {empresa: dados})
  }

  const handleWhatsAppPress = () => {
    Linking.openURL("https://wa.me/+55" + dados.whatsapp);
  }

  //useEffect's

  useEffect(() => {
    carregarUsuario();
  }, []);

  useEffect(() => {
    carregarNota();
    carregarFav();
  }, [id]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        carregarUsuario();
    });

    return unsubscribe;
  }, [navigation]);

  //métodos

  const carregarUsuario = async () => {
   try {
      const jsonValue = await AsyncStorage.getItem('@user');
      if(jsonValue !== null) {
        await setId(JSON.parse(jsonValue).id);
      }
    } catch(e) {
      // error reading value
    }
  }

  const carregarNota = async () => {
    await fetch(network.api + '/avaliacao/consulta/' + id + '/' + dados.id, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token')
        }
    })
    .then(response => response.json())
    .then(data=> {
        setRating({'nivel': data.nota});
    })
  }

  const carregarFav = async () => {
    await fetch(network.api + '/favoritos/consulta/' + id + '/' + dados.id, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token')
        }
    })
    .then(response => response.json())
    .then(data=> {
        setLike(data.favoritado);
    })
  }

  //main

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        
        <ImageBackground source={require("../../assets/bg_svg.png")} style={styles.bg_header}>
          <View style={styles.headerContainer}>
            
            <View style={styles.header}>
              {
                //botao para retornar a tela anterior
                //Colocar no onPress a ação de navegar entre páginas
              }
              {/*
              <TouchableOpacity 
                style={styles.detailsButton}
                onPress={handleBackPress}
              >
                <AntDesign name="left" size={36} color="#7F51CF"/>
              </TouchableOpacity>
              */}
            </View>
            
            {dados.foto_perfil && <RoundImage image={{uri: network.api + '/' + dados.foto_perfil}} size={100}></RoundImage>}
            {dados.nome_empresa && <Text style={styles.textStyle}>{dados.nome_empresa}</Text>}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              
              <TouchableOpacity onPress={() => {navigation.navigate('Comentarios', {microempresaId: dados.id})}} style={{marginHorizontal: 10}}>
                <MaterialCommunityIcons name="comment-multiple-outline" size={25} color='#fff' />
              </TouchableOpacity>
              <TouchableOpacity onPress={ async () => {
                setLike(!like);
                await fetch(network.api + '/favoritos/atribuicao/', {
                  method: 'post',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'x-access-token': await AsyncStorage.getItem('@token')
                  },
                  body: JSON.stringify({
                    clienteId: id,
                    microempresaId: dados.id
                  })
                })
                .then(response => response.text())
                .then(data => {
                  console.log(data);
                })
              }}>
                <AntDesign name={like?'heart':'hearto'} size={25} color='#fff' />
              </TouchableOpacity>
            </View>
              
            <FlatList
              data={star}
              horizontal
              style={{flexGrow: 0}}
              renderItem={( {item } ) => (<StarRating star = {item} />)}
              keyExtractor={(item, index) => item.nivel.toString()}
            />
                
          </View>
      
        </ImageBackground>
      
        <View style={styles.content}>
          {dados.whatsapp && <TouchableOpacity style={[styles.companyInfo, {marginTop: -85}]} onPress={handleWhatsAppPress}>
            <Ionicons name="logo-whatsapp" size={30} color="#7F51CF" />
            <Text style={styles.textCompany}>Entre em contato</Text>
          </TouchableOpacity>}

          {dados.telefone &&
            <TouchableOpacity style={styles.companyInfo} onPress={handleCallPress}>
              <View>
                <Feather name="phone" size={30} color="#7F51CF"/>
              </View>
              <View>
                <Text style={styles.textCompany}>{dados.telefone}</Text>
              </View>
            </TouchableOpacity>
          }

          {dados.instagram &&
            <TouchableOpacity style={styles.companyInfo} onPress={handleInstagramPress}>
              <Feather name="instagram" size={30} color="#7F51CF"/>
              <Text style={styles.textCompany}>{dados.instagram}</Text>
            </TouchableOpacity>
          }

          {dados.site &&
            <TouchableOpacity style={styles.companyInfo} onPress={handleSitePress}>
              <Feather name="info" size={30} color="#7F51CF"/>
              <Text style={styles.textCompany}>{dados.site}</Text>
            </TouchableOpacity>
          }

          <TouchableOpacity style={styles.companyInfo} onPress={handleMapsPress}>
            <Entypo name="location" size={30} color="#7F51CF" />
            <Text style={styles.textCompany}>Localização</Text>

          </TouchableOpacity>

          <View style={styles.companyInfoDesc}>
            <Feather name="align-left" size={35} color="#7F51CF"/>
            <Text style={styles.textCompany}>{dados.descricao}</Text>

          </View>
        </View>
      </ScrollView>
    </View>
  );

  //

  function StarRating (props) {

    return(
      <TouchableOpacity style={{marginHorizontal: 5}} onPress={async () => {
  
        await fetch(network.api + '/avaliacao/publicacao/', {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token': await AsyncStorage.getItem('@token')
          },
          body: JSON.stringify({
            nota: props.star.nivel,
            clienteId: id,
            microempresaId: dados.id
          })
        })
        .then(response => response.json())
        .then(data=> {
          setRating({nivel: data.nota});
        })
  
      }}>
        <Ionicons name={rating.nivel >= props.star.nivel?'star-sharp':'star-outline'} size={25} color={'#7F51CF'} />
      </TouchableOpacity>
    )
  }

}