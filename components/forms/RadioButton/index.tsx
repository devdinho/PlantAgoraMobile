import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './styles';

interface RadioButtonProps {
  value: string;
  label: string;
  selectedValue: string;
  onSelect: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  label,
  selectedValue,
  onSelect
}) => {
  const isSelected = selectedValue === value;
  
  return (
    <TouchableOpacity
      style={styles.radioOption}
      onPress={() => onSelect(value)}
    >
      <View style={[
        styles.radioCircle,
        isSelected && styles.radioCircleSelected
      ]}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton; 