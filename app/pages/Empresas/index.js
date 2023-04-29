import React, { useEffect , useState } from 'react';
import { FlatList, Image, LogBox, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { AntDesign, Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { network } from '../../config/network';

export default function App({ navigation, route }) {

  LogBox.ignoreAllLogs();

  //const's

  const [modalVisible, setModalVisible] = useState(false);

  const [categoryText, setCategory] = useState(route.params.category);

  const [empresas, setEmpresas] = useState(null);

  const [search, setSearch] = useState(null);

  //handle's

  const handleCategory = (value) => {
    setCategory(value);
    setModalVisible(!modalVisible);
  }

  //

  useEffect( () => {
    carregarEmpresas();
  }, []);

  useEffect( () => {
    carregarEmpresas();
  }, [categoryText]);

  //métodos

  const carregarEmpresas = async () => {
   await fetch(network.api + '/empresas/lista/' + categoryText, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data=> {
      setEmpresas(data);
    })
  }

  const procurarEmpresas = async () => {
    await fetch(network.api + '/empresas/lista/' + categoryText + '/' + search, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then( data => {
      setEmpresas(data);
    })
  }

  const fakeData = [
    {
      nome_empresa: "Nome empresa",
      descricao: "Lorem Ipsum is simply dummy text of the printing and typeset" 
    },
    {
      nome_empresa: "Nome empresa",
      descricao: "Lorem Ipsum is simply dummy text of the printing and typeset" 
    },
    {
      nome_empresa: "Nome empresa",
      descricao: "Lorem Ipsum is simply dummy text of the printing and typeset" 
    },
  ];

  //main
  
  return (

    <View style={styles.container}>
      <View style={styles.purpleBg}></View>
      <ScrollView style={styles.scroll}>
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <View style={styles.header}>
              {
                //botao para retornar a tela anterior
                //Colocar no onPress a ação de navegar entre páginas
              }
              {/*<TouchableOpacity 
                style={styles.detailsButton}
                onPress={handleBackPress}       
              >
                <AntDesign name="left" size={36} color="#7F51CF"/>
                </TouchableOpacity>
              */}
                <TextInput
                style={{
                  width: '70%',
                  height: 50,
                  borderRadius: 50,
                  marginRight: 10,
                  marginLeft: 20,
                  padding: 10,
                  backgroundColor: '#d9d9d9',
                  shadowColor: '#171717',
                  shadowOffset: {width: -4, height: 8},
                  shadowOpacity: 0.2,
                  shadowRadius: 5, 
                  elevation: 3
                }}
                placeholder='Pesquisar...'
                onChangeText={(text) => {setSearch(text)}}
                onSubmitEditing={procurarEmpresas}
                />
                <TouchableOpacity 
                  style={{marginRight: 40}}
                  onPress={() => (setModalVisible(true))}  
                >
                  <Feather name="menu" size={40} color="#7F51CF"/>
                  </TouchableOpacity>
                      
            </View>
            <View style={styles.alignCenter}>
              <Text style={styles.titleStyle}>Categoria: </Text>
              <Text style={styles.text}>{categoryText}</Text>            
            </View>
          </View>
        </View>

        {/**Modal Menu*/}
          <Modal
            visible={modalVisible}
            style={styles.modal}
            animationType="slide"
          >
            <View style={styles.modal}>
              <View style={styles.buttonContainer}>    
                <TouchableOpacity 
                  style={styles.buttonModal}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <AntDesign name="close" size={35} color="#7F51CF" />
                </TouchableOpacity>
                <Text style={styles.text}>Escolha uma categoria</Text>

                <TouchableOpacity onPress={() => handleCategory("Moda")}>  
                  <View style={styles.category}>
                    <Image style={styles.icon} source={require("../../assets/roupas.png")}/>
                    <Text style={styles.textStyle}>Categoria Moda</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleCategory("Alimentos")}>
                  <View style={styles.category}>
                    <Ionicons style={styles.icon} name="ios-fast-food-outline" size={40}color="white" />
                    <Text style={styles.textStyle}>Categoria Alimentos</Text>
                  </View>
                </TouchableOpacity>
                  
                <TouchableOpacity onPress={() => handleCategory("Tecnologia")}>
                  <View style={styles.category}>
                    <MaterialIcons style={styles.icon} name="computer" size={40} color="white" />
                    <Text style={styles.textStyle}>Categoria Tecnologia</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleCategory("Estética")}>
                  <View style={styles.category}>
                    <Image style={styles.icon} source={require("../../assets/maquiagem.png")}/>
                    <Text style={styles.textStyle}>Categoria Estética</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleCategory("Outro")}>
                  <View style={styles.category}>
                    <FontAwesome5 style={styles.icon} name="building" size={40} color="white" />
                    <Text style={styles.textStyle}>Categoria Outro</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        {/*ModalEnd*/}
         
        <FlatList 
          data={empresas}
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
                  <View style={styles.btn}>
                    <MaterialIcons style={styles.alignEnd} name="keyboard-arrow-right" size={30} color="#7F51CF" />
                  </View>
                </View>    
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={( item ) => item.toString()}
        />
      </ScrollView>
    </View>
  );
}
