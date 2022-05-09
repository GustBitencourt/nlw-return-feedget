import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import sucessImg from '../../assets/success.png';
import { Copyright } from '../Copyright';

import { styles } from './styles';

export function Sucess() {
  return (
    <View style={styles.container}>
        <Image
            source={sucessImg}
            style={styles.image}
        />

        <Text style={styles.title}>
            Agradecemos o seu Feedback
        </Text>

        <TouchableOpacity style={styles.button}>

            <Text style={styles.buttonTitle}>
                Quer enviar outro Feedback?
            </Text>
        </TouchableOpacity>

        <Copyright />
    </View>
  );
}