import { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';

import { FeedbackType } from '../Widget';
import { SendButtom } from '../SendButtom';
import { ScreenshotButtom } from '../ScreenshotButtom';

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';

interface Props {
    feedbackType: FeedbackType;
}

export function Form({ feedbackType }: Props) {
    //informações do conteúdo selecionado para pergamos sua image e texto
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    const [screenshot, setScreenshot] = useState<string | null>(null);

    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8,
        })
        .then(uri => setScreenshot(uri))
        .catch(err => console.error(err));
    }

    function handleScreenshotRemove() {
        setScreenshot(null);
    }


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
                onTakeShot={handleScreenshot}
                onRemoveShot={handleScreenshotRemove}
                screenshot={screenshot}         
            />

            <SendButtom 
                isLoading={false}            
            />

        </View>

    </View>
  );
}