import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    text: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f1f1f'
    },
    textInput: {
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
        borderWidth: 1
    },
    roundButton1: {
      width: 335,
      height: 63,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      borderRadius: 50,
      backgroundColor: "#7F51CF",
      marginTop: 20
    },
    blobContainer:{
        position: 'relative',
    },
    blobContainer:{
        position: 'absolute',
        top: -110,
        left: -220
    },

    leftBtn:{
        position: 'absolute',
        top: 70,
        zIndex: 1,
        left: 20  
    },

    blobText:{
        
        zIndex: 1, 
        top: -200,
        color: 'black'
    }

})