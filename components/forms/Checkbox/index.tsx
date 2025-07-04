import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

interface CheckboxProps {
  value: string;
  label: string;
  selectedValues: string[];
  onToggle: (value: string) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  value,
  label,
  selectedValues,
  onToggle
}) => {
  const isSelected = selectedValues.includes(value);
  
  return (
    <TouchableOpacity
      style={styles.checkboxOption}
      onPress={() => onToggle(value)}
    >
      <View style={[
        styles.checkbox,
        isSelected && styles.checkboxSelected
      ]}>
        {isSelected && (
          <Ionicons name="checkmark" size={16} color="#fff" />
        )}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox; 