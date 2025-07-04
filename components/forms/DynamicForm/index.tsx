import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Alert,
  Text,
  TextInput
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormHeader from '../FormHeader';
import QuestionSection from '../QuestionSection';
import BooleanRadio from '../BooleanRadio';
import Checkbox from '../Checkbox';
import RadioButton from '../RadioButton';
import SaveButton from '../SaveButton';
import TextArea from '../TextArea';
import commonStyles from '../common/styles';
import { FormConfig, FormField, FormData } from './types';

interface DynamicFormProps {
  config: FormConfig;
  customComponents?: Record<string, React.ComponentType<any>>;
}

export default function DynamicForm({ config, customComponents = {} }: DynamicFormProps) {
  const [data, setData] = useState<FormData>({});

  // Inicializar valores padrão
  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem(config.storageKey);
        if (stored) {
          setData(JSON.parse(stored));
        } else {
          // Inicializar com valores vazios baseado nos campos
          const initialData: FormData = {};
          config.fields.forEach(field => {
            if (field.type === 'checkbox') {
              initialData[field.id] = [];
            } else if (field.type === 'boolean') {
              initialData[field.id] = null;
            } else {
              initialData[field.id] = '';
            }
          });
          setData(initialData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    loadData();
  }, [config]);

  const handleSave = async () => {
    try {
      // Validar campos obrigatórios
      const errors = validateForm();
      if (errors.length > 0) {
        Alert.alert('Erro', errors[0]);
        return;
      }

      await AsyncStorage.setItem(config.storageKey, JSON.stringify(data));
      Alert.alert('Sucesso', 'Dados salvos com sucesso!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
    
    config.fields.forEach(field => {
      if (field.required) {
        const value = data[field.id];
        
        if (field.type === 'boolean' && value === null) {
          errors.push(`Por favor, responda: ${field.question}`);
        } else if (field.type === 'checkbox' && (!value || value.length === 0)) {
          errors.push(`Por favor, selecione pelo menos uma opção em: ${field.question}`);
        } else if (field.type === 'radio' && !value) {
          errors.push(`Por favor, selecione uma opção em: ${field.question}`);
        } else if ((field.type === 'text' || field.type === 'textarea') && !value) {
          errors.push(`Por favor, preencha: ${field.question}`);
        }
      }
    });
    
    return errors;
  };

  const updateData = (fieldId: string, value: any) => {
    setData(prev => ({ ...prev, [fieldId]: value }));
  };

  const toggleArrayValue = (fieldId: string, value: string) => {
    setData(prev => {
      const currentArray = prev[fieldId] || [];
      return {
        ...prev,
        [fieldId]: currentArray.includes(value)
          ? currentArray.filter((item: string) => item !== value)
          : [...currentArray, value]
      };
    });
  };

  const shouldShowConditionalField = (conditionalField: FormField['conditionalField']): boolean => {
    if (!conditionalField) return false;
    
    const dependentValue = data[conditionalField.showWhen];
    
    if (typeof conditionalField.equals === 'boolean') {
      return dependentValue === conditionalField.equals;
    } else if (typeof conditionalField.equals === 'string') {
      if (Array.isArray(dependentValue)) {
        return dependentValue.includes(conditionalField.equals);
      }
      return dependentValue === conditionalField.equals;
    }
    
    return false;
  };

  const renderField = (field: FormField) => {
    const fieldValue = data[field.id];

    switch (field.type) {
      case 'boolean':
        return (
          <QuestionSection key={field.id} question={field.question}>
            <BooleanRadio
              value={fieldValue}
              onSelect={(value) => updateData(field.id, value)}
            />
          </QuestionSection>
        );

      case 'radio':
        return (
          <QuestionSection key={field.id} question={field.question}>
            <View style={commonStyles.radioGroup}>
              {field.options?.map((option, index) => (
                <RadioButton
                  key={`${field.id}-${option.value}-${index}`}
                  value={option.value}
                  label={option.label}
                  selectedValue={fieldValue || ''}
                  onSelect={(value) => updateData(field.id, value)}
                />
              ))}
            </View>
          </QuestionSection>
        );

      case 'checkbox':
        return (
          <QuestionSection key={field.id} question={field.question}>
            <View style={commonStyles.checkboxGroup}>
              {field.options?.map((option, index) => (
                <Checkbox
                  key={`${field.id}-${option.value}-${index}`}
                  value={option.value}
                  label={option.label}
                  selectedValues={fieldValue || []}
                  onToggle={(value) => toggleArrayValue(field.id, value)}
                />
              ))}
            </View>
          </QuestionSection>
        );

      case 'text':
        return (
          <QuestionSection key={field.id} question={field.question}>
            <TextInput
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#ddd',
                padding: 16,
                fontSize: 16,
                color: '#333',
              }}
              placeholder={field.placeholder || ''}
              value={fieldValue || ''}
              onChangeText={(text) => updateData(field.id, text)}
            />
          </QuestionSection>
        );

      case 'textarea':
        return (
          <QuestionSection key={field.id} question={field.question}>
            <TextArea
              value={fieldValue || ''}
              onChangeText={(text) => updateData(field.id, text)}
              placeholder={field.placeholder}
            />
          </QuestionSection>
        );

      case 'custom':
        if (field.customComponent && customComponents[field.customComponent]) {
          const CustomComponent = customComponents[field.customComponent];
          return (
            <QuestionSection key={field.id} question={field.question}>
              <CustomComponent
                value={fieldValue}
                onValueChange={(value: any) => updateData(field.id, value)}
                {...(field.customProps || {})}
              />
            </QuestionSection>
          );
        }
        return (
          <QuestionSection key={field.id} question={field.question}>
            <Text>Componente customizado não encontrado: {field.customComponent}</Text>
          </QuestionSection>
        );

      default:
        return null;
    }
  };

  const renderFieldWithConditional = (field: FormField) => {
    const mainField = renderField(field);
    const conditionalFields = [];

    // Renderizar campo condicional se existir e a condição for atendida
    if (field.conditionalField && shouldShowConditionalField(field.conditionalField)) {
      conditionalFields.push(renderField(field.conditionalField.field));
    }

    return (
      <React.Fragment key={field.id}>
        {mainField}
        {conditionalFields}
      </React.Fragment>
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />

      <ScrollView style={commonStyles.scrollView} showsVerticalScrollIndicator={false}>
        <FormHeader title={config.title} iconName={config.icon as any} />
        
        <View style={commonStyles.content}>
          {config.fields.map(renderFieldWithConditional)}
          <SaveButton onPress={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 