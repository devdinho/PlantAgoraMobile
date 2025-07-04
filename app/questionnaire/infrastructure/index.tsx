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

interface InfrastructureData {
  receivesSeasiSupport: boolean | null;
  infrastructureRating: string;
  infrastructureMeetsNeeds: boolean | null;
  infrastructureNeeds: string;
  accessDifficulties: string[];
  otherAccessDifficulties: string;
  receivedSupports: string[];
  participatedTraining: string;
  trainingContribution: string;
  receivedTechnicalAssistance: string;
  technicalAssistanceContribution: string;
  infrastructureEvaluation: string;
  appFeatures: string[];
}

const INFRASTRUCTURE_RATING_OPTIONS = [
  { value: 'excelente', label: 'Excelente' },
  { value: 'boa', label: 'Boa' },
  { value: 'regular', label: 'Regular' },
  { value: 'ruim', label: 'Ruim' },
  { value: 'muito-ruim', label: 'Muito ruim' }
];

const ACCESS_DIFFICULTIES_OPTIONS = [
  { value: 'sementes', label: 'Sementes' },
  { value: 'adubos', label: 'Adubos' },
  { value: 'ferramentas', label: 'Ferramentas' },
  { value: 'outros', label: 'Outros' }
];

const RECEIVED_SUPPORTS_OPTIONS = [
  { value: 'capacitacao', label: 'Capacitação' },
  { value: 'assistencia-tecnica', label: 'Assistência técnica' },
  { value: 'insumos', label: 'Insumos (sementes, adubo, ferramentas)' },
  { value: 'recursos-financeiros', label: 'Recursos financeiros ou microcrédito' },
  { value: 'acesso-mercados', label: 'Acesso a mercados' },
  { value: 'nenhum', label: 'Nenhum dessas alternativas' }
];

const TRAINING_PARTICIPATION_OPTIONS = [
  { value: 'sim-uma-vez', label: 'Sim, apenas uma vez' },
  { value: 'sim-mais-vezes', label: 'Sim, mais de uma vez' },
  { value: 'nao', label: 'Não' }
];

const TRAINING_CONTRIBUTION_OPTIONS = [
  { value: 'contribuiu-muito', label: 'Sim, contribuíram muito' },
  { value: 'contribuiu-parcialmente', label: 'Sim, contribuíram parcialmente' },
  { value: 'nao-contribuiu', label: 'Não contribuíram' }
];

const TECHNICAL_ASSISTANCE_OPTIONS = [
  { value: 'semanalmente', label: 'Sim, semanalmente' },
  { value: 'quinzenalmente', label: 'Sim, quinzenalmente' },
  { value: 'mensalmente', label: 'Sim, mensalmente' },
  { value: 'semestralmente', label: 'Sim, semestralmente' },
  { value: 'anualmente', label: 'Sim, anualmente' },
  { value: 'nao-recebi', label: 'Não recebi assistência técnica' }
];

const TECHNICAL_CONTRIBUTION_OPTIONS = [
  { value: 'contribuiu-muito', label: 'Sim, contribuiu muito' },
  { value: 'contribuiu-parcialmente', label: 'Sim, contribuiu parcialmente' },
  { value: 'nao-contribuiu', label: 'Não contribuiu' }
];

const INFRASTRUCTURE_EVALUATION_OPTIONS = [
  { value: 'muito-boa', label: 'Muito boa, atende totalmente às necessidades' },
  { value: 'boa', label: 'Boa, atende parcialmente às necessidades' },
  { value: 'regular', label: 'Regular, há algumas dificuldades' },
  { value: 'ruim', label: 'Ruim, há muitas dificuldades' },
  { value: 'muito-ruim', label: 'Muito ruim, não atende às necessidades' }
];

const APP_FEATURES_OPTIONS = [
  { value: 'planejamento-gestao', label: 'Organização do planejamento e gestão da produção' },
  { value: 'dados-horta', label: 'Atualização e armazenamento de dados sobre a horta' },
  { value: 'comunicacao-tecnicos', label: 'Comunicação direta com técnicos e especialistas para tirar dúvidas' },
  { value: 'cursos-treinamentos', label: 'Acesso a cursos, treinamentos e conteúdos educativos sobre horticultura' },
  { value: 'controle-insumos', label: 'Registro e controle de insumos, estoque e colheita' },
  { value: 'pragas-doencas', label: 'Informações sobre pragas, doenças e métodos de controle' },
  { value: 'previsao-clima', label: 'Previsão do clima e alertas meteorológicos para planejamento agrícola' },
  { value: 'mercados-compradores', label: 'Conexão com mercados e compradores para facilitar a comercialização' }
];

export default function InfrastructureScreen() {
  const [data, setData] = useState<InfrastructureData>({
    receivesSeasiSupport: null,
    infrastructureRating: '',
    infrastructureMeetsNeeds: null,
    infrastructureNeeds: '',
    accessDifficulties: [],
    otherAccessDifficulties: '',
    receivedSupports: [],
    participatedTraining: '',
    trainingContribution: '',
    receivedTechnicalAssistance: '',
    technicalAssistanceContribution: '',
    infrastructureEvaluation: '',
    appFeatures: []
  });

  const handleSave = async () => {
    try {
      // Validações básicas
      if (data.receivesSeasiSupport === null) {
        Alert.alert('Erro', 'Por favor, informe se recebe acompanhamento técnico da SEASI');
        return;
      }
      if (!data.infrastructureRating) {
        Alert.alert('Erro', 'Por favor, avalie a infraestrutura da horta comunitária');
        return;
      }
      if (data.infrastructureMeetsNeeds === null) {
        Alert.alert('Erro', 'Por favor, informe se a infraestrutura atende às necessidades');
        return;
      }

      await AsyncStorage.setItem('infrastructure', JSON.stringify(data));
      Alert.alert('Sucesso', 'Dados salvos com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  };

  const handleAccessDifficultyToggle = (value: string) => {
    setData(prev => ({
      ...prev,
      accessDifficulties: prev.accessDifficulties.includes(value)
        ? prev.accessDifficulties.filter(d => d !== value)
        : [...prev.accessDifficulties, value]
    }));
  };

  const handleSupportToggle = (value: string) => {
    setData(prev => ({
      ...prev,
      receivedSupports: prev.receivedSupports.includes(value)
        ? prev.receivedSupports.filter(s => s !== value)
        : [...prev.receivedSupports, value]
    }));
  };

  const handleAppFeatureToggle = (value: string) => {
    setData(prev => ({
      ...prev,
      appFeatures: prev.appFeatures.includes(value)
        ? prev.appFeatures.filter(f => f !== value)
        : [...prev.appFeatures, value]
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
              <Ionicons name="construct" size={32} color="#fff" />
            </View>
            <Text style={styles.title}>Infraestrutura e Apoio</Text>
          </View>

          {/* Acompanhamento técnico SEASI */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Recebe acompanhamento técnico da SEASI?
            </Text>
            {renderBooleanRadio(data.receivesSeasiSupport, (value) => 
              setData(prev => ({ ...prev, receivesSeasiSupport: value }))
            )}
          </View>

          {/* Avaliação da infraestrutura */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Avaliação da infraestrutura da horta comunitária
            </Text>
            <View style={styles.radioGroup}>
              {INFRASTRUCTURE_RATING_OPTIONS.map((option, index) => (
                <View key={`rating-${option.value}-${index}`}>
                  {renderRadioOption(
                    option.value,
                    option.label,
                    data.infrastructureRating,
                    (value) => setData(prev => ({ ...prev, infrastructureRating: value }))
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Infraestrutura atende às necessidades */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              A infraestrutura atende às necessidades?
            </Text>
            {renderBooleanRadio(data.infrastructureMeetsNeeds, (value) => 
              setData(prev => ({ ...prev, infrastructureMeetsNeeds: value }))
            )}
            
            {/* Campo condicional - O que falta */}
            {data.infrastructureMeetsNeeds === false && (
              <View style={styles.conditionalField}>
                <Text style={styles.conditionalLabel}>
                  Se "não", especifique o que falta
                </Text>
                <TextInput
                  style={styles.textArea}
                  placeholder=""
                  value={data.infrastructureNeeds}
                  onChangeText={(text) => setData(prev => ({ ...prev, infrastructureNeeds: text }))}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            )}
          </View>

          {/* Dificuldades de acesso a insumos */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Quais insumos você tem mais dificuldade de acessar?
            </Text>
            <View style={styles.checkboxGroup}>
              {ACCESS_DIFFICULTIES_OPTIONS.map((option, index) => (
                <View key={`access-${option.value}-${index}`}>
                  {renderCheckboxOption(
                    option.value,
                    option.label,
                    data.accessDifficulties,
                    handleAccessDifficultyToggle
                  )}
                </View>
              ))}
            </View>
            
            {/* Campo condicional - Outros insumos */}
            {data.accessDifficulties.includes('outros') && (
              <View style={styles.conditionalField}>
                <Text style={styles.conditionalLabel}>
                  Quais são os outros insumos de difícil acesso?
                </Text>
                <TextInput
                  style={styles.textArea}
                  placeholder=""
                  value={data.otherAccessDifficulties}
                  onChangeText={(text) => setData(prev => ({ ...prev, otherAccessDifficulties: text }))}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            )}
          </View>

          {/* Apoios recebidos */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Quais desses apoios da Prefeitura ou de outras instituições você já recebeu?
            </Text>
            <View style={styles.checkboxGroup}>
              {RECEIVED_SUPPORTS_OPTIONS.map((option, index) => (
                <View key={`support-${option.value}-${index}`}>
                  {renderCheckboxOption(
                    option.value,
                    option.label,
                    data.receivedSupports,
                    handleSupportToggle
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Participação em capacitação */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Já participou de capacitação da prefeitura ou outras instituições?
            </Text>
            <View style={styles.radioGroup}>
              {TRAINING_PARTICIPATION_OPTIONS.map((option, index) => (
                <View key={`training-${option.value}-${index}`}>
                  {renderRadioOption(
                    option.value,
                    option.label,
                    data.participatedTraining,
                    (value) => setData(prev => ({ ...prev, participatedTraining: value }))
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Contribuição das capacitações */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              As temáticas trabalhadas nas capacitações contribuíram com a melhoria das atividades diárias desenvolvidas nas hortas?
            </Text>
            <View style={styles.radioGroup}>
              {TRAINING_CONTRIBUTION_OPTIONS.map((option, index) => (
                <View key={`training-contrib-${option.value}-${index}`}>
                  {renderRadioOption(
                    option.value,
                    option.label,
                    data.trainingContribution,
                    (value) => setData(prev => ({ ...prev, trainingContribution: value }))
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Assistência técnica recebida */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Você já recebeu assistência técnica por parte da prefeitura ou de outra instituição?
            </Text>
            <View style={styles.radioGroup}>
              {TECHNICAL_ASSISTANCE_OPTIONS.map((option, index) => (
                <View key={`tech-assist-${option.value}-${index}`}>
                  {renderRadioOption(
                    option.value,
                    option.label,
                    data.receivedTechnicalAssistance,
                    (value) => setData(prev => ({ ...prev, receivedTechnicalAssistance: value }))
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Contribuição da assistência técnica */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              A assistência técnica recebida contribuiu com a melhoria das atividades desenvolvidas nas hortas?
            </Text>
            <View style={styles.radioGroup}>
              {TECHNICAL_CONTRIBUTION_OPTIONS.map((option, index) => (
                <View key={`tech-contrib-${option.value}-${index}`}>
                  {renderRadioOption(
                    option.value,
                    option.label,
                    data.technicalAssistanceContribution,
                    (value) => setData(prev => ({ ...prev, technicalAssistanceContribution: value }))
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Avaliação da infraestrutura */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Como você avalia a infraestrutura (portão, alambrado, calçada, depósito, estufa, etc.) disponível na horta comunitária para o desenvolvimento das atividades?
            </Text>
            <View style={styles.radioGroup}>
              {INFRASTRUCTURE_EVALUATION_OPTIONS.map((option, index) => (
                <View key={`infra-eval-${option.value}-${index}`}>
                  {renderRadioOption(
                    option.value,
                    option.label,
                    data.infrastructureEvaluation,
                    (value) => setData(prev => ({ ...prev, infrastructureEvaluation: value }))
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Funcionalidades do aplicativo */}
          <View style={styles.section}>
            <Text style={styles.questionText}>
              Caso fosse desenvolvido um aplicativo para celular voltado exclusivamente para horticultores, quais funcionalidades você consideraria mais úteis para facilitar sua rotina e otimizar sua produção?
            </Text>
            <View style={styles.checkboxGroup}>
              {APP_FEATURES_OPTIONS.map((option, index) => (
                <View key={`app-feature-${option.value}-${index}`}>
                  {renderCheckboxOption(
                    option.value,
                    option.label,
                    data.appFeatures,
                    handleAppFeatureToggle
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