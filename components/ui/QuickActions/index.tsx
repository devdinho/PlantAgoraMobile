import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

interface QuickActionsProps {
  onUpdateData: () => void;
  onContactSeasi: () => void;
}

export default function QuickActions({ onUpdateData, onContactSeasi }: QuickActionsProps) {
  return (
    <View style={styles.quickActions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onUpdateData}
      >
        <Ionicons name="refresh" size={20} color="#46A56C" />
        <Text style={styles.actionText}>Atualizar Dados</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onContactSeasi}
      >
        <Ionicons name="call" size={20} color="#46A56C" />
        <Text style={styles.actionText}>Contatar SEASI</Text>
      </TouchableOpacity>
    </View>
  );
} 