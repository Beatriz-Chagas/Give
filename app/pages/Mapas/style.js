import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    map: {
        height: Dimensions.get('screen').height * 0.75,
        width: Dimensions.get('screen').width
    },
    bottom: {
        height: '25%',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#fffafa',
        shadowColor: '#171717',
        shadowOffset: {width: -8, height: 16},
        shadowOpacity: 0.2,
        shadowRadius: 3, 
        elevation: 3,
    },
    img: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginHorizontal: 10,
        marginTop: 10
    },
    icon:{
        width: 50,
        height: 50
    }
})