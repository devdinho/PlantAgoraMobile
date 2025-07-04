import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

interface GardenStructureData {
  bedsCount: number;
  areaSize: string;
  irrigationType: string;
  allBedsPlanted: boolean | null;
  areaProtection: string[];
  crops: string[];
  otherVarieties: string;
}

// Opções de área de 10 em 10 m² até 200m²
const AREA_OPTIONS = Array.from({ length: 20 }, (_, i) => `${(i + 1) * 10} m²`);

const IRRIGATION_OPTIONS = [
  { value: 'regador', label: 'Com regador' },
  { value: 'mangueira', label: 'Com mangueira' },
  { value: 'ambos', label: 'Com regador e mangueira' }
];

const PROTECTION_OPTIONS = [
  { value: 'filme', label: 'Com Filme Agrícola' },
  { value: 'sombrite', label: 'Com Sombrite' },
  { value: 'nenhuma', label: 'Não é protegida' }
];

const CROP_OPTIONS = [
  [
    { value: 'alface', label: 'Alface' },
    { value: 'rucula', label: 'Rúcula' },
    { value: 'maxixe', label: 'Maxixe' },
    { value: 'quiabo', label: 'Quiabo' }
  ],
  [
    { value: 'cheiro-verde', label: 'Cheiro Verde' },
    { value: 'couve', label: 'Couve' },
    { value: 'salsa', label: 'Salsa' },
    { value: 'agriao', label: 'Agrião' }
  ]
];

export default function GardenStructureScreen() {
  const [data, setData] = useState<GardenStructureData>({
    bedsCount: 1,
    areaSize: '10 m²',
    irrigationType: '',
    allBedsPlanted: null,
    areaProtection: [],
    crops: [],
    otherVarieties: ''
  });

  const [showAreaModal, setShowAreaModal] = useState(false);

  const handleSave = async () => {
    try {
      // Validações básicas
      if (!data.irrigationType) {
        Alert.alert('Erro', 'Por favor, selecione o tipo de irrigação');
        return;
      }
      if (data.allBedsPlanted === null) {
        Alert.alert('Erro', 'Por favor, informe se todos os canteiros estão plantados');
        return;
      }
      if (data.areaProtection.length === 0) {
        Alert.alert('Erro', 'Por favor, selecione pelo menos uma opção de proteção');
        return;
      }

      await AsyncStorage.setItem('gardenStructure', JSON.stringify(data));
      Alert.alert('Sucesso', 'Dados salvos com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  };

  const handleCropToggle = (cropValue: string) => {
    setData(prev => ({
      ...prev,
      crops: prev.crops.includes(cropValue)
        ? prev.crops.filter(c => c !== cropValue)
        : [...prev.crops, cropValue]
    }));
  };

  const handleProtectionToggle = (protectionValue: string) => {
    setData(prev => ({
      ...prev,
      areaProtection: prev.areaProtection.includes(protectionValue)
        ? prev.areaProtection.filter(p => p !== protectionValue)
        : [...prev.areaProtection, protectionValue]
    }));
  };

  const handleAreaSelect = (area: string) => {
    setData(prev => ({ ...prev, areaSize: area }));
    setShowAreaModal(false);
  };

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

  const renderCheckboxOption = (value: string, label: string) => (
    <TouchableOpacity
      style={styles.checkboxOption}
      onPress={() => handleCropToggle(value)}
    >
      <View style={[
        styles.checkbox,
        data.crops.includes(value) && styles.checkboxSelected
      ]}>
        {data.crops.includes(value) && (
          <Ionicons name="checkmark" size={16} color="#fff" />
        )}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const renderProtectionCheckbox = (value: string, label: string) => (
    <TouchableOpacity
      style={styles.radioOption}
      onPress={() => handleProtectionToggle(value)}
    >
      <View style={[
        styles.checkbox,
        data.areaProtection.includes(value) && styles.checkboxSelected
      ]}>
        {data.areaProtection.includes(value) && (
          <Ionicons name="checkmark" size={16} color="#fff" />
        )}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
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
              <Ionicons name="leaf" size={32} color="#fff" />
            </View>
            <Text style={styles.title}>Estrutura da Horta</Text>
            <Text style={styles.subtitle}>
              Por favor, informe os dados sobre a estrutura da sua horta
            </Text>
          </View>

          {/* Quantidade de canteiros */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Qual é a quantidade de canteiros/área m² ?
            </Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setData(prev => ({ 
                  ...prev, 
                  bedsCount: Math.max(1, prev.bedsCount - 1) 
                }))}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              
              <TextInput
                style={styles.quantityInput}
                value={data.bedsCount.toString()}
                onChangeText={(text) => {
                  const num = parseInt(text) || 1;
                  setData(prev => ({ ...prev, bedsCount: num }));
                }}
                keyboardType="numeric"
              />
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setData(prev => ({ 
                  ...prev, 
                  bedsCount: prev.bedsCount + 1 
                }))}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.areaSelector}
                onPress={() => setShowAreaModal(true)}
              >
                <Text style={styles.areaSelectorText}>{data.areaSize}</Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Irrigação */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              De que forma é feita a irrigação?
            </Text>
            <View style={styles.radioGroup}>
              {IRRIGATION_OPTIONS.map((option, index) => (
                <View key={`irrigation-${option.value}-${index}`}>
                  {renderRadioOption(
                    option.value,
                    option.label,
                    data.irrigationType,
                    (value) => setData(prev => ({ ...prev, irrigationType: value }))
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Canteiros plantados */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Todos os canteiros estão plantados?
            </Text>
            {renderBooleanRadio(data.allBedsPlanted, (value) => 
              setData(prev => ({ ...prev, allBedsPlanted: value }))
            )}
          </View>

          {/* Área protegida - Multiselector */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              A área de cultivo é protegida?
            </Text>
            <View style={styles.radioGroup}>
              {PROTECTION_OPTIONS.map((option, index) => (
                <View key={`protection-${option.value}-${index}`}>
                  {renderProtectionCheckbox(option.value, option.label)}
                </View>
              ))}
            </View>
          </View>

          {/* Culturas plantadas - Layout em duas colunas */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Qual é a cultura plantada nesses espaços?
            </Text>
            <View style={styles.cropsContainer}>
              <View style={styles.cropsColumn}>
                {CROP_OPTIONS[0].map((option, index) => (
                  <View key={`crop-left-${option.value}-${index}`}>
                    {renderCheckboxOption(option.value, option.label)}
                  </View>
                ))}
              </View>
              <View style={styles.cropsColumn}>
                {CROP_OPTIONS[1].map((option, index) => (
                  <View key={`crop-right-${option.value}-${index}`}>
                    {renderCheckboxOption(option.value, option.label)}
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Outras variedades */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Quais outras variedades são cultivadas nesses espaços?
            </Text>
            <TextInput
              style={styles.textArea}
              placeholder="Descreva outras variedades que você planta..."
              value={data.otherVarieties}
              onChangeText={(text) => setData(prev => ({ ...prev, otherVarieties: text }))}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal para seleção de área */}
      <Modal
        visible={showAreaModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAreaModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione a área</Text>
              <TouchableOpacity onPress={() => setShowAreaModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {AREA_OPTIONS.map((area, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.modalOption,
                    data.areaSize === area && styles.modalOptionSelected
                  ]}
                  onPress={() => handleAreaSelect(area)}
                >
                  <Text style={[
                    styles.modalOptionText,
                    data.areaSize === area && styles.modalOptionTextSelected
                  ]}>
                    {area}
                  </Text>
                  {data.areaSize === area && (
                    <Ionicons name="checkmark" size={20} color="#46A56C" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
} 