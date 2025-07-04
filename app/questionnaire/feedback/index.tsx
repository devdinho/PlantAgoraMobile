import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

interface FeedbackData {
  dailyChallenges: string;
  improvementSuggestions: string;
  additionalComments: string;
}

export default function FeedbackScreen() {
  const [data, setData] = useState<FeedbackData>({
    dailyChallenges: '',
    improvementSuggestions: '',
    additionalComments: ''
  });

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('feedback', JSON.stringify(data));
      Alert.alert('Sucesso', 'Dados salvos com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Icon and Title */}
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="chatbubble-ellipses" size={32} color="#fff" />
            </View>
            <Text style={styles.title}>Questões Abertas/</Text>
            <Text style={styles.title}>Sugestões</Text>
          </View>

          {/* Principais desafios */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Principais desafios no dia a dia da horta
            </Text>
            <TextInput
              style={styles.textArea}
              placeholder=""
              value={data.dailyChallenges}
              onChangeText={(text) => setData(prev => ({ ...prev, dailyChallenges: text }))}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Sugestões de melhorias */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Sugestões de melhorias para infraestrutura ou gestão
            </Text>
            <TextInput
              style={styles.textArea}
              placeholder=""
              value={data.improvementSuggestions}
              onChangeText={(text) => setData(prev => ({ ...prev, improvementSuggestions: text }))}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Algo mais para compartilhar */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Algo mais que gostaria de compartilhar?
            </Text>
            <TextInput
              style={styles.textArea}
              placeholder=""
              value={data.additionalComments}
              onChangeText={(text) => setData(prev => ({ ...prev, additionalComments: text }))}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 