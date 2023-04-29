import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    container:{
      backgroundColor: '#F0F0F0',
      justifyContent: 'center',
      alignItems: 'center',
      position: "relative"
    },
    content:{
      alignItems: 'center',
      marginTop: -70
    },

    logo: {
      width: 204,
      height: 135
    },

    footerImg: {
      position:"absolute",
      bottom: -60,

    },
    footer: {
      position: 'absolute',
      bottom: 20,
      zIndex: 1,
    },
    arrowRight:{
      alignSelf: 'center',
      marginLeft: 150,
      marginTop: 20
    },

    image: {
      flex:1,
      resizeMode: "cover",
      alignItems: "center",
      justifyContent: "flex-end"
    },
  
    roundButton1: {
      width: 335,
      height: 63,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      borderRadius: 50,
      backgroundColor: "#7F51CF",
      marginTop: 60
    },

    roundButton2:{
      width: 335,
      height: 63,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      borderRadius: 50,
      backgroundColor: "#F0F0F0",
      marginBottom: 20,
      marginTop: 20,
      borderColor: "#7F51CF",
      borderWidth: 2
    },
  
    text1: {
  
      fontWeight: "bold",
      fontSize: 30,
      color: "#fff",
      marginBottom: 80
  
    },
  
    text2: {
  
      fontWeight: "bold",
      fontSize: 15,
      color: "#fff"
  
    },
  
    text3: {
  
      marginBottom: 20,
      fontSize: 15,
      color: "#fff",
      textDecorationLine: 'underline'
  
    },

    loginScreen:{
      width: '100%',
      height: '100%',
      backgroundColor: "#7F51CF",
      justifyContent: 'center'
    },
    bloobs:{
      marginTop: -230
    }
  
});