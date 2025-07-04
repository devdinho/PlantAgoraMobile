import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

interface TechnologiesData {
  usesCertifiedSeeds: boolean | null;
  seedlingProduction: string[];
  usesFertilization: boolean | null;
  fertilizationProducts: string;
}

const SEEDLING_PRODUCTION_OPTIONS = [
  { value: 'propria', label: 'Própria' },
  { value: 'terceirizada', label: 'Terceirizada' }
];

const FERTILIZATION_PRODUCTS_OPTIONS = [
  { value: 'composto-quimico', label: 'Composto Químico' },
  { value: 'composto-organico', label: 'Composto orgânico (cama de frango, esterco, palha de arroz)' },
  { value: 'nenhuma', label: 'Nenhuma das alternativas' }
];

export default function TechnologiesScreen() {
  const [data, setData] = useState<TechnologiesData>({
    usesCertifiedSeeds: null,
    seedlingProduction: [],
    usesFertilization: null,
    fertilizationProducts: ''
  });

  const handleSave = async () => {
    try {
      // Validações básicas
      if (data.usesCertifiedSeeds === null) {
        Alert.alert('Erro', 'Por favor, informe se utiliza sementes fiscalizadas e certificadas');
        return;
      }
      if (data.seedlingProduction.length === 0) {
        Alert.alert('Erro', 'Por favor, selecione como é feita a produção das mudas');
        return;
      }
      if (data.usesFertilization === null) {
        Alert.alert('Erro', 'Por favor, informe se faz adubação');
        return;
      }
      if (!data.fertilizationProducts) {
        Alert.alert('Erro', 'Por favor, selecione quais produtos usa para adubagem');
        return;
      }

      await AsyncStorage.setItem('technologies', JSON.stringify(data));
      Alert.alert('Sucesso', 'Dados salvos com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  };

  const handleSeedlingProductionToggle = (value: string) => {
    setData(prev => ({
      ...prev,
      seedlingProduction: prev.seedlingProduction.includes(value)
        ? prev.seedlingProduction.filter(s => s !== value)
        : [...prev.seedlingProduction, value]
    }));
  };

  const renderBooleanRadio = (
    value: boolean | null,
    onSelect: (value: boolean) => void
  ) => (
    <View style={styles.radioGroup}>
      <TouchableOpacity
        style={styles.radioOption}
        onPress={() => onSelect(true)}
      >
        <View style={[
          styles.radioCircle,
          value === true && styles.radioCircleSelected
        ]}>
          {value === true && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.radioLabel}>Sim</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.radioOption}
        onPress={() => onSelect(false)}
      >
        <View style={[
          styles.radioCircle,
          value === false && styles.radioCircleSelected
        ]}>
          {value === false && <View style={styles.radioInner} />}
        </View>
        <Text style={styles.radioLabel}>Não</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRadioOption = (
    value: string,
    label: string,
    selectedValue: string,
    onSelect: (value: string) => void
  ) => (
    <TouchableOpacity
      style={styles.radioOption}
      onPress={() => onSelect(value)}
    >
      <View style={[
        styles.radioCircle,
        selectedValue === value && styles.radioCircleSelected
      ]}>
        {selectedValue === value && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const renderCheckboxOption = (value: string, label: string, selectedValues: string[], onToggle: (value: string) => void) => (
    <TouchableOpacity
      style={styles.checkboxOption}
      onPress={() => onToggle(value)}
    >
      <View style={[
        styles.checkbox,
        selectedValues.includes(value) && styles.checkboxSelected
      ]}>
        {selectedValues.includes(value) && (
          <Ionicons name="checkmark" size={16} color="#fff" />
        )}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

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
              <Ionicons name="laptop" size={32} color="#fff" />
            </View>
            <Text style={styles.title}>Tecnologias</Text>
          </View>

          {/* Sementes fiscalizadas e certificadas */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Utiliza sementes fiscalizadas e certificadas?
            </Text>
            {renderBooleanRadio(data.usesCertifiedSeeds, (value) => 
              setData(prev => ({ ...prev, usesCertifiedSeeds: value }))
            )}
          </View>

          {/* Produção das mudas */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Produção das mudas: própria/terceirizada (multichoice)
            </Text>
            <View style={styles.checkboxGroup}>
              {SEEDLING_PRODUCTION_OPTIONS.map((option, index) => (
                <View key={`seedling-${option.value}-${index}`}>
                  {renderCheckboxOption(
                    option.value,
                    option.label,
                    data.seedlingProduction,
                    handleSeedlingProductionToggle
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Faz adubação */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Faz adubação?
            </Text>
            {renderBooleanRadio(data.usesFertilization, (value) => 
              setData(prev => ({ ...prev, usesFertilization: value }))
            )}
          </View>

          {/* Produtos para adubagem */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Quais produtos usa para adubagem?
            </Text>
            <View style={styles.radioGroup}>
              {FERTILIZATION_PRODUCTS_OPTIONS.map((option, index) => (
                <View key={`fertilization-${option.value}-${index}`}>
                  {renderRadioOption(
                    option.value,
                    option.label,
                    data.fertilizationProducts,
                    (value) => setData(prev => ({ ...prev, fertilizationProducts: value }))
                  )}
                </View>
              ))}
            </View>
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