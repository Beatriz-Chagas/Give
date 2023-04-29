import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';

export default function RoundImage(props) {
    return (
        <Image source={props.image} style={{height: props.size, width: props.size, borderRadius: (props.size/2)}}>

        </Image>
    )
}