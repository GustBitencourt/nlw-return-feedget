import { View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { ChatTeardropDots } from 'phosphor-react-native';
import { theme } from '../../theme';

export const Widget = () => {
    return (
        <>
            <TouchableOpacity
                style={styles.button}
            >
                <ChatTeardropDots
                    size={24}
                    weight="bold"
                    color={theme.colors.text_on_brand_color}
                />

            </TouchableOpacity>
        </>
    )
}
