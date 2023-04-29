import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentsHeader:{
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    height: 80,
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -4, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 3, 
    elevation: 3,
    backgroundColor: '#f0f0f0'
    /*    borderBottomColor: '#7F51CF',
    borderWidth: 10,
    
    borderLeftColor: '#fff',
    borderRightColor: '#fff',
    borderTopColor: '#fff',*/
  },

  leftBtn: {
    position: 'absolute',
    left: 10
  },

  input:{
    shadowColor: '#171717',
    shadowOffset: {width: -4, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 3, 
    elevation: 3,
  },
  text:{
    color: '#1f1f1f',
    fontSize: 16
  }
});