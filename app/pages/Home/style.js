import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  textinput: {
    width: 300,
    height: 40,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f0f0f0'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7F51CF'
  },
  img: {
    height: 130,
    width: 150,
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 20,
    borderColor: '#7F51CF',
    borderWidth: 2
  },
  button: {
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginVertical: 20,
    backgroundColor: '#7F51CF'
  },
  txt: {
    padding: 10,
    position: 'absolute',
    bottom: -5,
    borderRadius: 30
  },      
  company:{
    flexDirection: 'row',
    padding: 24,
    backgroundColor: '#fff',
    marginBottom: 18,
    width: 337,
    position: 'relative',
    borderRadius: 10,
    justifyContent: "space-between",
    borderColor: "#7F51CF",
    borderLeftWidth: 5,
    shadowColor: '#171717',
    shadowOffset: {width: -4, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 3, 
    elevation: 3
  },    
  companyName: {
    fontSize: 18,
    color: "#1f1f1f",
    fontWeight: "bold",
    textAlign: 'center'
  },  
  companyValue: {
    color: "#1f1f1f",
    width: 200,
    fontSize: 12,
    textAlign: 'center'
  },    
  image: {
    width: 73,
    height: 73,
    borderRadius: 10,
    marginLeft: -10
  }
});