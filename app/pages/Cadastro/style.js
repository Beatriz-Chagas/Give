import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginBottom: -20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textInput: {
        width: 335,
        height: 53,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 50,
        backgroundColor: "#F0F0F0",
        marginTop: 20,
        marginBottom: 20,
        borderColor: "#7F51CF",
        borderWidth: 1
    },
    roundButton1: {
        width: 335,
        height: 50,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 50,
        backgroundColor: "#7F51CF",
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
    },
    content:{
        marginTop: 180
    }
})