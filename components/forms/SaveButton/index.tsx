import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

interface SaveButtonProps {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({
  onPress,
  title = 'Salvar',
  disabled = false
}) => {
  return (
    <TouchableOpacity 
      style={[styles.saveButton, disabled && styles.saveButtonDisabled]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.saveButtonText, disabled && styles.saveButtonTextDisabled]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SaveButton; 