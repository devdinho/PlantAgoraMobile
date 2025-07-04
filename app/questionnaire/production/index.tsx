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

interface ProductionData {
  monthlyIncome: string;
  productDestination: string[];
  otherDestinations: string;
  commercializationDifficulties: string[];
  otherDifficulties: string;
  salesChannels: string[];
  otherChannels: string;
  calculatesCosts: boolean | null;
}

// Opções de renda mensal
const INCOME_OPTIONS = [
  'Até R$100,00',
  'Entre R$100,00 e R$199,00',
  'Entre R$200,00 e R$299,00',
  'Entre R$300,00 e R$499,00',
  'Entre R$500,00 e R$999,00',
  'R$1.000,00 ou mais'
];

const PRODUCT_DESTINATION_OPTIONS = [
  { value: 'consumo', label: 'Consumo próprio' },
  { value: 'venda', label: 'Venda local' },
  { value: 'doacao', label: 'Doação' },
  { value: 'outros', label: 'Outros' }
];

const DIFFICULTIES_OPTIONS = [
  { value: 'baixa-demanda', label: 'Baixa demanda dos consumidores' },
  { value: 'falta-canais', label: 'Falta de canais de venda' },
  { value: 'preco-baixo', label: 'Preço baixo dos produtos' },
  { value: 'concorrencia', label: 'Concorrência com grandes produtores' },
  { value: 'outros', label: 'Outros' }
];

const CHANNELS_OPTIONS = [
  { value: 'feiras', label: 'Feiras locais' },
  { value: 'venda-direta', label: 'Venda direta para consumidores' },
  { value: 'outros', label: 'Outros' }
];

export default function ProductionScreen() {
  const [data, setData] = useState<ProductionData>({
    monthlyIncome: 'Entre R$200,00 e R$299,00',
    productDestination: [],
    otherDestinations: '',
    commercializationDifficulties: [],
    otherDifficulties: '',
    salesChannels: [],
    otherChannels: '',
    calculatesCosts: null
  });

  const [showIncomeModal, setShowIncomeModal] = useState(false);

  const handleSave = async () => {
    try {
      if (data.calculatesCosts === null) {
        Alert.alert('Erro', 'Por favor, informe se você calcula o custo de produção');
        return;
      }

      await AsyncStorage.setItem('production', JSON.stringify(data));
      Alert.alert('Sucesso', 'Dados salvos com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  };

  const handleIncomeSelect = (income: string) => {
    setData(prev => ({ ...prev, monthlyIncome: income }));
    setShowIncomeModal(false);
  };

  const handleDestinationToggle = (destinationValue: string) => {
    setData(prev => ({
      ...prev,
      productDestination: prev.productDestination.includes(destinationValue)
        ? prev.productDestination.filter(d => d !== destinationValue)
        : [...prev.productDestination, destinationValue]
    }));
  };

  const handleDifficultyToggle = (difficultyValue: string) => {
    setData(prev => ({
      ...prev,
      commercializationDifficulties: prev.commercializationDifficulties.includes(difficultyValue)
        ? prev.commercializationDifficulties.filter(d => d !== difficultyValue)
        : [...prev.commercializationDifficulties, difficultyValue]
    }));
  };

  const handleChannelToggle = (channelValue: string) => {
    setData(prev => ({
      ...prev,
      salesChannels: prev.salesChannels.includes(channelValue)
        ? prev.salesChannels.filter(c => c !== channelValue)
        : [...prev.salesChannels, channelValue]
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
              <Ionicons name="bar-chart" size={32} color="#fff" />
            </View>
            <Text style={styles.title}>Produção e</Text>
            <Text style={styles.title}>Comercialização</Text>
          </View>

          {/* Renda mensal */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Qual a média de renda mensal com a comercialização?
            </Text>
            <TouchableOpacity 
              style={styles.incomeSelector}
              onPress={() => setShowIncomeModal(true)}
            >
              <Text style={styles.incomeSelectorText}>{data.monthlyIncome}</Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Destino dos produtos */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              O que você faz com os produtos cultivados?
            </Text>
            <View style={styles.checkboxGroup}>
              {PRODUCT_DESTINATION_OPTIONS.map((option, index) => (
                <View key={`destination-${option.value}-${index}`}>
                  {renderCheckboxOption(
                    option.value,
                    option.label,
                    data.productDestination,
                    handleDestinationToggle
                  )}
                </View>
              ))}
            </View>
            
            {/* Campo condicional - Outros destinos */}
            {data.productDestination.includes('outros') && (
              <View style={styles.conditionalField}>
                <Text style={styles.conditionalLabel}>
                  Especifique "outros" destinos dos produtos
                </Text>
                <TextInput
                  style={styles.textArea}
                  placeholder=""
                  value={data.otherDestinations}
                  onChangeText={(text) => setData(prev => ({ ...prev, otherDestinations: text }))}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            )}
          </View>

          {/* Dificuldades na comercialização */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Quais dificuldades você enfrenta na comercialização?
            </Text>
            <View style={styles.checkboxGroup}>
              {DIFFICULTIES_OPTIONS.map((option, index) => (
                <View key={`difficulty-${option.value}-${index}`}>
                  {renderCheckboxOption(
                    option.value,
                    option.label,
                    data.commercializationDifficulties,
                    handleDifficultyToggle
                  )}
                </View>
              ))}
            </View>
            
            {/* Campo condicional - Outras dificuldades */}
            {data.commercializationDifficulties.includes('outros') && (
              <View style={styles.conditionalField}>
                <Text style={styles.conditionalLabel}>
                  Quais "outras" dificuldades você enfrenta na comercialização dos produtos?
                </Text>
                <TextInput
                  style={styles.textArea}
                  placeholder=""
                  value={data.otherDifficulties}
                  onChangeText={(text) => setData(prev => ({ ...prev, otherDifficulties: text }))}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            )}
          </View>

          {/* Canais de comercialização */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Qual canal de comercialização você utiliza com mais frequência?
            </Text>
            <View style={styles.checkboxGroup}>
              {CHANNELS_OPTIONS.map((option, index) => (
                <View key={`channel-${option.value}-${index}`}>
                  {renderCheckboxOption(
                    option.value,
                    option.label,
                    data.salesChannels,
                    handleChannelToggle
                  )}
                </View>
              ))}
            </View>
            
            {/* Campo condicional - Outros canais */}
            {data.salesChannels.includes('outros') && (
              <View style={styles.conditionalField}>
                <Text style={styles.conditionalLabel}>
                  Quais "outros" canais de você utiliza para a comercialização dos produtos?
                </Text>
                <TextInput
                  style={styles.textArea}
                  placeholder=""
                  value={data.otherChannels}
                  onChangeText={(text) => setData(prev => ({ ...prev, otherChannels: text }))}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            )}
          </View>

          {/* Cálculo de custos */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Você calcula o custo de produção?
            </Text>
            {renderBooleanRadio(data.calculatesCosts, (value) => 
              setData(prev => ({ ...prev, calculatesCosts: value }))
            )}
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal para seleção de renda */}
      <Modal
        visible={showIncomeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowIncomeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione a faixa de renda</Text>
              <TouchableOpacity onPress={() => setShowIncomeModal(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {INCOME_OPTIONS.map((income, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.modalOption,
                    data.monthlyIncome === income && styles.modalOptionSelected
                  ]}
                  onPress={() => handleIncomeSelect(income)}
                >
                  <Text style={[
                    styles.modalOptionText,
                    data.monthlyIncome === income && styles.modalOptionTextSelected
                  ]}>
                    {income}
                  </Text>
                  {data.monthlyIncome === income && (
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