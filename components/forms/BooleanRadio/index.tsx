import React from 'react';
import { View } from 'react-native';
import RadioButton from '../RadioButton';
import styles from './styles';

interface BooleanRadioProps {
  value: boolean | null | undefined;
  onSelect: (value: boolean) => void;
}

const BooleanRadio: React.FC<BooleanRadioProps> = ({ value, onSelect }) => {
  const selectedValue = value === null || value === undefined ? '' : value.toString();
  
  return (
    <View style={styles.radioGroup}>
      <RadioButton
        value="true"
        label="Sim"
        selectedValue={selectedValue}
        onSelect={() => onSelect(true)}
      />
      <RadioButton
        value="false"
        label="Não"
        selectedValue={selectedValue}
        onSelect={() => onSelect(false)}
      />
    </View>
  );
};

export default BooleanRadio; 