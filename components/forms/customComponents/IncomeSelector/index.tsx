import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import IncomeModal from './IncomeModal';
import styles from './styles';

interface IncomeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const IncomeSelector: React.FC<IncomeSelectorProps> = ({ value, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity 
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectorText}>
          {value || 'Selecione uma opção'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      <IncomeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedValue={value}
        onSelect={(selectedValue: string) => {
          onValueChange(selectedValue);
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default IncomeSelector; 