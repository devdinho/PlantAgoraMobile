import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { LevelOfEducation } from '@/constants/contants';

const PersonalData = () => {
  const [userProfileInfo, setUserProfileInfo] = useState<any>(null);

  const [scholarity, setScholarity] = useState('');
  const [showScholarityOptions, setShowScholarityOptions] = useState(false);

  const [ageRange, setAgeRange] = useState('');
  const [hortaTime, setHortaTime] = useState('');
  const [familyWorking, setFamilyWorking] = useState('');
  const [familyMaleCount, setFamilyMaleCount] = useState('');
  const [familyFemaleCount, setFamilyFemaleCount] = useState('');
  const [residentsCount, setResidentsCount] = useState('');
  const [participatesAssociation, setParticipatesAssociation] = useState('');
  const [associationName, setAssociationName] = useState('');
  const [otherOccupation, setOtherOccupation] = useState('');
  const [otherOccupationDetails, setOtherOccupationDetails] = useState('');
  const [mainIncome, setMainIncome] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const upi = await AsyncStorage.getItem('userProfile');
        const parsed = upi ? JSON.parse(upi) : null;
        setUserProfileInfo(parsed);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dados Pessoais</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={[styles.headerTitle, { fontSize: 22, padding: 16, paddingBottom: 0 }]}>
          Recadastramento de Horticultores Comunitários
        </Text>

        <Text style={styles.description}>
          Por favor, preencha o formulário abaixo com suas informações.
        </Text>

        {/* Seção Dados Pessoais */}
        <View style={styles.formContainer}>
          {/** Nome */}
          <FormInput label="Nome completo" icon="person-outline" value={`${userProfileInfo?.first_name} ${userProfileInfo?.last_name}`} editable={false} />

          {/** CPF */}
          <MaskedInput label="CPF" icon="card-outline" type="cpf" value={userProfileInfo?.grower?.document} />

          {/** Data de nascimento */}
          <MaskedInput label="Data de nascimento" icon="calendar-outline" type="datetime" options={{ format: 'DD/MM/YYYY' }} value={userProfileInfo?.grower?.birthDate} />

          {/** Endereço */}
          <FormInput label="Endereço / Localidade" icon="location-outline" value={userProfileInfo?.grower?.address} />

          {/** Telefone */}
          <MaskedInput
            label="Telefone"
            icon="call-outline"
            type="cel-phone"
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }}
            value={userProfileInfo?.grower?.cell}
          />
        </View>

        {/* Seção Perfil Socioeconômico */}
        <Text style={styles.sectionTitle}>Perfil Socioeconômico</Text>
        <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Escolaridade:</Text>
                <View style={styles.inputWrapper}>
                    <Ionicons name="school-outline" size={20} color="#888" style={styles.inputIcon} />
                    <TouchableOpacity
                        style={[styles.input, { justifyContent: 'center' }]}
                        activeOpacity={0.7}
                        onPress={() => setShowScholarityOptions(true)}
                        >
                        <Text style={{ color: scholarity ? '#222' : '#aaa' }}>
                            {LevelOfEducation.LEVEL_OF_EDUCATION_CHOICES.find((option) => option.value === scholarity)?.label || 'Selecione a escolaridade'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {showScholarityOptions && (
                <View style={styles.optionsContainer}>
                    {LevelOfEducation.LEVEL_OF_EDUCATION_CHOICES.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={styles.optionItem}
                        onPress={() => {
                        setScholarity(option.value);
                        setShowScholarityOptions(false);
                        }}
                    >
                        <Text style={styles.optionText}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
                </View>
                )}
            </View>
          <FormInput label="Idade" value={ageRange} onChangeText={setAgeRange} />
          <FormInput label="Tempo de participação na horta comunitária" value={hortaTime} onChangeText={setHortaTime} />
          <FormInput label="Quantas pessoas da sua família trabalham na horta?" value={familyWorking} onChangeText={setFamilyWorking} />
          <FormInput label="Familiares do sexo masculino" value={familyMaleCount} onChangeText={setFamilyMaleCount} />
          <FormInput label="Familiares do sexo feminino" value={familyFemaleCount} onChangeText={setFamilyFemaleCount} />
          <FormInput label="Quantas pessoas moram com você?" value={residentsCount} onChangeText={setResidentsCount} />
          <FormInput label="Participa de Associação ou Cooperativa?" value={participatesAssociation} onChangeText={setParticipatesAssociation} />
          {participatesAssociation.toLowerCase() === 'sim' && (
            <FormInput label="Nome da Associação/Cooperativa" value={associationName} onChangeText={setAssociationName} />
          )}
          <FormInput label="Outra ocupação exercida" value={otherOccupation} onChangeText={setOtherOccupation} />
          {otherOccupation.toLowerCase() === 'outros' && (
            <FormInput label="Especifique a ocupação" value={otherOccupationDetails} onChangeText={setOtherOccupationDetails} />
          )}
          <FormInput label="Fonte principal de renda" value={mainIncome} onChangeText={setMainIncome} />
        </View>
      </ScrollView>
    </>
  );
};

const FormInput = ({ label, icon, value, onChangeText, editable = true }: any) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputWrapper}>
      {icon && <Ionicons name={icon} size={20} color="#888" style={styles.inputIcon} />}
      <TextInput
        style={styles.input}
        placeholder={label}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
      />
    </View>
  </View>
);

const MaskedInput = ({ label, icon, type, options = {}, value, onChangeText }: any) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputWrapper}>
      {icon && <Ionicons name={icon} size={20} color="#888" style={styles.inputIcon} />}
      <TextInputMask
        type={type}
        options={options}
        placeholder={label}
        placeholderTextColor="#aaa"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType="default"
      />
    </View>
  </View>
);

export default PersonalData;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    marginBottom: 0,
    padding: 12,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    marginBottom: 4,
    fontSize: 14,
    color: '#444',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F8',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 24,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
    alignItems: 'center',
  },
 logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 12,
  },
  logo: {},
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    color: '#2e7d32',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
    marginHorizontal: 16,
    color: '#333',
    textAlign: 'justify',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
    color: '#2e7d32',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  footer: {
    fontSize: 14,
    color: '#888',
    marginTop: 32,
    marginBottom: 0,
    textAlign: 'center',
  },
    optionsContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
  },
});
