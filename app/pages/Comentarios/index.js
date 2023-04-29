import React, { useEffect , useState } from 'react';
import { Dimensions , FlatList , LogBox, Text , TextInput , TouchableOpacity , View } from 'react-native';
import styles from './style';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { network } from '../../config/network';

export default function App({ route, navigation }) {

    LogBox.ignoreAllLogs();

    //const's

    const [comentarios, setComentarios] = useState(null);

    const [user, setUser] = useState(null);

    const [texto, setTexto] = useState(null);

    //

    useEffect( () => {
        const carregarComentarios = () => {
            fetch(network.api + '/comentarios/consulta/' + route.params.microempresaId, {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data=> {
                setComentarios(data);
            })
        }

        const getData = async () => {
            try {
              const jsonValue = await AsyncStorage.getItem('@user');
              if(jsonValue !== null) {
                setUser(JSON.parse(jsonValue));
              }
            } catch(e) {
              // error reading value
            }
        }

        carregarComentarios();
        getData();
    }, []);

    //métodos

    const submitComment = async () => {
        await fetch(network.api + '/comentarios/publicacao', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': await AsyncStorage.getItem('@token')
        },
        body: JSON.stringify({
            clienteId: user.id,
            microempresaId: route.params.microempresaId,
            texto: texto
        })
        })
        .then(response => response.text())
        .then(data=> {
            console.log(data);
        })

        if(!comentarios) {
            setComentarios([{email: user.email, texto: texto}]);
        } else {
            setComentarios([...comentarios, {email: user.email, texto: texto}]);
        }
    } 

    
        return(
            <View style={[styles.container, {paddingTop: 50}]}>
                <View style={styles.commentsHeader}>
                    <TouchableOpacity style={styles.leftBtn} onPress={() => navigation.navigate('EmpresaDetalhes')}>
                        <MaterialIcons style={styles.alignEnd} name="keyboard-arrow-left" size={35} color="#7F51CF" />
                    </TouchableOpacity>
                    <Text style={styles.text}>Comentários</Text>
                </View>
                <FlatList
                data={comentarios}
                style={{height: '90%', flexGrow: 0}}
                renderItem={( {item } ) => (<Comentario comentario = {item} />)}
                keyExtractor={(item, index) => item.key}/>
                <View style={{height: Dimensions.get('window').height*0.10, alignItems: 'center', flexDirection: 'row'}}>
                <TextInput multiline 
                placeholder={'Escreva um comentário'}
                style={[styles.input, {
                    width: Dimensions.get('window').width*0.8, height: 50,
                    marginHorizontal: '3.3%', padding: 10, borderRadius: 50,
                    backgroundColor: '#f0f0f0'
                }]}
                onChangeText={(val)=> setTexto(val)} />
                <TouchableOpacity onPress={submitComment}>
                    <Feather name="send" style = {{marginRight: '3.3%'}} size = {Dimensions.get('window').width*0.07} color="#7F51CF" />
                </TouchableOpacity>
                </View>
            </View>
        )
    
}

function Comentario({comentario}) {

    return(
        <View style={{width:Dimensions.get('window').width*0.9, margin: 10, borderRadius: 10, backgroundColor: '#f0f0f0'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome style={{margin: 10}} name="user" size={25} color="#7F51CF" />
                <Text style={{width: '80%', margin: 10, fontWeight: 'bold', opacity: 0.3}}>{comentario.email}</Text>
            </View>
            <Text style={{width: '80%', margin: 10}}>{comentario.texto}</Text>
        </View>
    )
}