import React from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';

import { FeedbackType } from '../Widget';

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { ScreenshotButtom } from '../ScreenshotButtom';
import { SendButtom } from '../SendButtom';

interface Props {
    feedbackType: FeedbackType;
}

export function Form({ feedbackType }: Props) {
    //informações do conteúdo selecionado para pergamos sua image e texto
    const feedbackTypeInfo = feedbackTypes[feedbackType];


  return (
    <View style={styles.container}>
        <View style={styles.header}>

            <TouchableOpacity>
                <ArrowLeft 
                    size={24}
                    weight="bold"
                    color={theme.colors.text_secondary}
                />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
                <Image 
                    source={feedbackTypeInfo.image}
                    style={styles.image}                
                />
                <Text style={styles.titleText}>
                    {feedbackTypeInfo.title}
                </Text>
            </View>

        </View>

        <TextInput
            multiline
            style={styles.input}
            placeholder="Conte com detalhes o seu problema"
            placeholderTextColor={theme.colors.text_secondary}
        />

        <View style={styles.footer}>
            <ScreenshotButtom 
                onTakeShot={() => {}}
                onRemoveShot={() => {}}
                screenshot="https://github.com/gustbitencourt.png"            
            />

            <SendButtom 
                isLoading={false}            
            />

        </View>

    </View>
  );
}