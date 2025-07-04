import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

interface AddSaleModalProps {
  visible: boolean;
  onClose: () => void;
  onAddSale: (amount: number) => void;
}

export default function AddSaleModal({ visible, onClose, onAddSale }: AddSaleModalProps) {
  const [saleAmount, setSaleAmount] = useState('');

  const handleAddSale = () => {
    if (!saleAmount.trim()) {
      Alert.alert('Erro', 'Por favor, insira o valor da venda');
      return;
    }

    const amount = parseFloat(saleAmount.replace(',', '.'));
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return;
    }

    onAddSale(amount);
    setSaleAmount('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Nova Venda</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Valor da Venda</Text>
            <TextInput
              style={styles.input}
              placeholder="0,00"
              value={saleAmount}
              onChangeText={setSaleAmount}
              keyboardType="numeric"
              autoFocus
            />
          </View>
          
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleAddSale}
            >
              <Text style={styles.confirmButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
} 