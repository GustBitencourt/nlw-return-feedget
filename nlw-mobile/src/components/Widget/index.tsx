import React, { useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { Options } from '../Options';
import { Form } from '../Form';
import { Sucess } from '../Sucess';

import { styles } from './styles';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';

//pega os tipos das chaves de feedbackTypes 'BUG', 'OTHER', 'IDEA
export type FeedbackType = keyof typeof feedbackTypes;

const Widget = () => {
    //useRef para abrir sem precisar manipular estado
    const bottomSheetRef = useRef<BottomSheet>(null);

    //funcao para abrir o bottomSheet e expandilo
    function handleOpen() {
        bottomSheetRef.current?.expand();
    }


    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={handleOpen}
            >
                <ChatTeardropDots
                    size={24}
                    weight="bold"
                    color={theme.colors.text_on_brand_color}
                />

            </TouchableOpacity>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[1, 280]}
                backgroundStyle={styles.modal}
                handleIndicatorStyle={styles.indicator}
            >
                <Form
                    feedbackType="BUG"                
                />

                {/* <Sucess /> */}

            </BottomSheet>
        </>
    )
}

export default gestureHandlerRootHOC(Widget);