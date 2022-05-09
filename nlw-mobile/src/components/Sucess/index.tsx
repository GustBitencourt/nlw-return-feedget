import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import sucessImg from '../../assets/success.png';
import { Copyright } from '../Copyright';

import { styles } from './styles';

interface Props {
    onSendAnotherFeedback: () => void;
}

export function Sucess({ onSendAnotherFeedback }: Props) {
    return (
        <View style={styles.container}>
            <Image
                source={sucessImg}
                style={styles.image}
            />

            <Text style={styles.title}>
                Agradecemos o seu Feedback
            </Text>

            <TouchableOpacity
                style={styles.button}
                onPress={onSendAnotherFeedback}
            >

                <Text style={styles.buttonTitle}>
                    Quer enviar outro Feedback?
                </Text>
            </TouchableOpacity>

            <Copyright />
        </View>
    );
}