import React, { useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

interface IncomeModalProps {
  visible: boolean;
  onClose: () => void;
  selectedValue: string;
  onSelect: (value: string) => void;
}

const INCOME_OPTIONS = [
  'Até R$100,00',
  'Entre R$100,00 e R$199,00',
  'Entre R$200,00 e R$299,00',
  'Entre R$300,00 e R$499,00',
  'Entre R$500,00 e R$999,00',
  'R$1.000,00 ou mais'
];

const IncomeModal: React.FC<IncomeModalProps> = ({
  visible,
  onClose,
  selectedValue,
  onSelect
}) => {
  // Animações
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const modalTranslateY = useRef(new Animated.Value(300)).current;

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(modalTranslateY, {
        toValue: 300,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      onClose();
    });
  };

  // Animar quando o modal abre
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(modalTranslateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [visible]);

  const handleSelect = (value: string) => {
    onSelect(value);
    closeModal();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={closeModal}
    >
      <Animated.View 
        style={[
          styles.modalOverlay,
          { opacity: overlayOpacity }
        ]}
      >
        <TouchableOpacity 
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={closeModal}
        />
        <Animated.View 
          style={[
            styles.modalContent,
            { transform: [{ translateY: modalTranslateY }] }
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Selecione a faixa de renda</Text>
            <TouchableOpacity onPress={closeModal}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalScrollView}>
            {INCOME_OPTIONS.map((income, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.modalOption,
                  selectedValue === income && styles.modalOptionSelected
                ]}
                onPress={() => handleSelect(income)}
              >
                <Text style={[
                  styles.modalOptionText,
                  selectedValue === income && styles.modalOptionTextSelected
                ]}>
                  {income}
                </Text>
                {selectedValue === income && (
                  <Ionicons name="checkmark" size={20} color="#46A56C" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalScrollView: {
    maxHeight: 400,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  modalOptionSelected: {
    backgroundColor: '#f0f8f4',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  modalOptionTextSelected: {
    color: '#46A56C',
    fontWeight: '600',
  },
});

export default IncomeModal; 