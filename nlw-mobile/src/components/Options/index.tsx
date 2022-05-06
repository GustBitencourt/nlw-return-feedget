import React from 'react';
import { View, Text } from 'react-native';

import { Copyright } from '../Copyright';
import { OptionItem } from '../OptionItem';

import {feedbackTypes} from '../../utils/feedbackTypes'
import { styles } from './styles';

export function Options() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Deixe seu feedback
      </Text>

      <View style={styles.options}>
        {
          /* Fazendo o mesmo do react para a exibição das opções */
          Object
            .entries(feedbackTypes)
            .map(([key, value]) => (
              <OptionItem
                key={key}
                title={value.title}
                image={value.image}
              />
            ))
        }

      </View>

      <Copyright />

      

    </View>
  );
}