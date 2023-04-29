import React from 'react';
import { Image, LogBox, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './style';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function App({ navigation }) {

  LogBox.ignoreAllLogs();

  //métodos

  //main
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.headerContainer}>
            <View style={styles.header}>
              {/*
                <TouchableOpacity 
                  style={styles.detailsButton}
                  onPress={handleBackPress}
                >
                  <AntDesign name='left' size={36} color='#7F51CF' />
                </TouchableOpacity>
              */}
            </View>
            <Text style={styles.textStyle}>Procure uma empresa que tenha os serviços que você quer!</Text>
        </View>
      <View style={styles.content}>
        <View style={styles.containerCategories}>
         {
           //Group one
         }
          <View style={styles.categories}>
            <TouchableOpacity onPress={() => {navigation.navigate('Empresas', {category: 'Moda'})}}>  
              <View style={styles.category}>
                <Image style={styles.icon} source={require('../../assets/roupas.png')}/>
                <Text style={styles.categoryText}>Moda</Text>

              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Empresas', {category: 'Alimentos'})}}>
              <View style={styles.category}>
                <Ionicons style={styles.icon} name='md-fast-food-outline' size={40} color='white' />
                <Text style={styles.categoryText}>Alimentos</Text>
              </View>
            </TouchableOpacity>
          </View>
          {
           //Group two
          }
          <View style={styles.categories}>
            <TouchableOpacity onPress={() => {navigation.navigate('Empresas', {category: 'Tecnologia'})}}>
              <View style={styles.category}>
                <MaterialIcons style={styles.icon} name='computer' size={40} color='white' />
                <Text style={styles.categoryText}>Tecnologia</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {navigation.navigate('Empresas', {category: 'Moda'})}}>
              <View style={styles.category}>
                <Image style={styles.icon} source={require('../../assets/maquiagem.png')}/>
                <Text style={styles.categoryText}>Moda</Text>
              </View>
            </TouchableOpacity>
          </View>
          {
           //Group three
          }  
          <View style={styles.categories}>
            <TouchableOpacity onPress={() => {navigation.navigate('Empresas', {category: 'Outro'})}}>
              <View style={styles.category}>
                <FontAwesome5 style={styles.icon} name='building' size={40} color='white' />
                <Text style={styles.categoryText}>Outro</Text>
              </View>
            </TouchableOpacity>
          </View>
          {
           //Categories end
          }
        </View>
      </View>
      </ScrollView>
    </View>
  );
}
