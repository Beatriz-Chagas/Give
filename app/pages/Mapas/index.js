import React, { useState, useEffect } from 'react';

import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
//import MapViewDirections from "react-native-maps-directions";

import { View , Text , TouchableOpacity , Linking , Image } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';

import icon from '../../assets/localizacao.png';
import Loading from '../../components/Loading/index';
import styles from './style';
import { network } from '../../config/network';

export default function App({navigation, route}) {

    //const's

    const dados = route.params.empresa;

    const GOOGLE_MAPS_APIKEY = 'AIzaSyADh-jpnanzv73vdlFaNut0cGxS44ufFRU';

    const [mapRegion, setmapRegion] = useState({
        latitude: -23.5940908,
        longitude: -46.4104784,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    //handle's

    const handleBackPress = () => {
        navigation.navigate('EmpresaDetalhes');
    }

    const handleCallPress = () => {
        Linking.openURL("tel:" + dados.telefone);
      }
    const handleInstagramPress = () => {
        Linking.openURL(dados.instagram);
    }

    //

    useEffect(() => {

        const setCurrentLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
          }; 
        

        setCurrentLocation();

    }, []);

    //main

    if(!location) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Loading></Loading>
            </View>
        )
    } else {
        return(
            <View style = {styles.container}>
                <MapView
                style = {styles.map}
                loadingEnabled
                initialRegion = {{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.030,
                longitudeDelta: 0.030}}>
                    <Marker
                        coordinate={location.coords}
                        title = "Você"
                        image = {icon}
                        style={styles.icon}
                    />
                    <Marker
                        coordinate={mapRegion}
                        title = {dados.nome_empresa}
                        image = {icon}
                    />
                </MapView>
                <View style={[styles.bottom, {marginTop: -10, width: '95%', borderRadius: 30, backgroundColor: '#fff'}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{width: '30%'}}>
                            <Image style={styles.img} source={{uri: network.api + '/' + dados.foto_perfil}}/>
                        </View>
                        <View style={{width: '40%'}}>
                            <Text style={{width: '100%',fontSize: 20, fontWeight: 'bold'}}>{dados.nome_empresa}</Text>
                            <Text>{dados.cep}</Text>
                        </View>
                        <TouchableOpacity onPress={handleCallPress} style={{width: 40, height: 40, marginHorizontal: 5, marginTop: 10, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7F51CF'}}>
                            <Feather name="phone" size={20} color="white"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleInstagramPress} style={{width: 40, height: 40, marginHorizontal: 5, marginTop: 10, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7F51CF'}}>
                            <Entypo name="instagram" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{alignSelf: 'center'}} onPress = {handleBackPress}>
                        <Entypo name="chevron-small-up" size={40} color="#7F51CF" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

