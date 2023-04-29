import React from 'react';
import { Image } from 'react-native';

export default function App() {
    return (
        <Image style={{height: 100, width: 100}} source={require('../../assets/loading.gif')}></Image>
    )
}