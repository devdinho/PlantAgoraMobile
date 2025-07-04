import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import styles from './styles';

interface FormHeaderProps {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onBack?: () => void;
}

const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  iconName,
  onBack = () => router.back()
}) => {
  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} size={32} color="#fff" />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </>
  );
};

export default FormHeader; 