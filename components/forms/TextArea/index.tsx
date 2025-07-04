import React from 'react';
import { TextInput, View, Text } from 'react-native';
import styles from './styles';

interface TextAreaProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  numberOfLines?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChangeText,
  placeholder = '',
  label,
  numberOfLines = 4
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}
      <TextInput
        style={styles.textArea}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
      />
    </View>
  );
};

export default TextArea; 