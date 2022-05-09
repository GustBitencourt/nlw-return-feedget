import { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { FeedbackType } from '../Widget';
import { SendButtom } from '../SendButtom';
import { ScreenshotButtom } from '../ScreenshotButtom';

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { api } from '../../libs/api';

interface Props {
    feedbackType: FeedbackType;
    onFeedbackCanceled: () => void;
    onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
    //informações do conteúdo selecionado para pergamos sua image e texto
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    

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

   async function handleSendFeedback() {
       //verifica se o isSendingFeedback é verdadeiro logo a requisição está sendo enviada, return para para a plicação
       if (isSendingFeedback) {
           return;
       }

       setIsSendingFeedback(true);

       //transformando a string de screenshot em base64
       const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });

       try {
           await api.post('/feedbacks', {
               type: feedbackType,
               screenshot: `data:image/png;base64, ${screenshotBase64}`,
               comment,
           });

           onFeedbackSent();


       } catch (err) {
           console.log(err);
           setIsSendingFeedback(false);
       }
   }

  return (
    <View style={styles.container}>
        <View style={styles.header}>

            <TouchableOpacity onPress={onFeedbackCanceled}>
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
            autoCorrect={false}
            onChangeText={setComment}
        />

        <View style={styles.footer}>
            <ScreenshotButtom 
                onTakeShot={handleScreenshot}
                onRemoveShot={handleScreenshotRemove}
                screenshot={screenshot}         
            />

            <SendButtom
                onPress={handleSendFeedback}
                isLoading={isSendingFeedback}            
            />

        </View>

    </View>
  );
}