import { useState } from 'react';
import {
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '@/components/ui/Logo';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import Toast from 'react-native-toast-message';

import styles from './styles';
import { LevelOfEducation, Gender } from '@/constants/contants';
import { callApi } from '@/services/api';
import ApiError from '../../../constants/errors'

// Função para validar CPF
const validarCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
};

// Função para buscar CEP
const buscarCep = async (cep: string) => {
  try {
    const result = await callApi('get_address', {
      urlParams: { cep: cep },
    });

    if (!result || !result.logradouro || !result.bairro || !result.localidade || !result.uf) {
      throw new Error('CEP não encontrado ou inválido.');
    }

    return result;
  } catch (error) {
    console.error('Erro ao buscar o CEP:', error);
    throw new Error('Erro ao buscar o CEP. Verifique o número informado.');
  }
};

const registerUser = async (userData: any) => {
  try {
    const result = await callApi('register', {
      body: userData,
    });
    return result;
  } catch (error) {
    const errorMsg = (error as any)?.message;

    let errorMessage = ApiError.ERROR_CHOICES.find(item => item.value === errorMsg).label;

    throw errorMessage;
  }
}

export default function RegisterFinish() {
  const [loading, setLoading] = useState(false);

  const [activeTab, setActiveTab] = useState(0);

  const [fullname, setFullname] = useState('');

  const [cep, setCep] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [tel, setTel] = useState('');
  
  const [document, setDocument] = useState('');
  
  const [birthdate, setBirthdate] = useState('');
  
  const [gender, setGender] = useState('');
  const [showGenderOptions, setShowGenderOptions] = useState(false);

  const [scholarity, setScholarity] = useState('');
  const [showScholarityOptions, setShowScholarityOptions] = useState(false);
  
  
  const router = useRouter();

  const handleTabs = () => {
    if (activeTab === 0) {
      router.push('/auth/login'); 
    } else {
      setActiveTab(prev => Math.max(prev - 1, 0)); 
    }
  };
  
  
  const handleFinishRegistration = async () => {
    setLoading(true);

    let allInseted = true;

    switch (activeTab) {
      case 0:
        allInseted = [fullname, document, birthdate, gender, scholarity, tel, cep]
          .every((item) => item !== null && item !== '');
        break;

      case 1:
        allInseted = [address, number, district, city, state]
          .every((item) => item !== '');
        break;

      default:
        allInseted = false;
    }

    if (!allInseted) {
      Toast.show({
        type: 'error',
        text1: 'Atenção',
        text2: 'Preencha todos os campos obrigatórios!',
      });
      setLoading(false);
      return;
    }

    // Validação de data de nascimento
    const birthdateNumeros = birthdate.replace(/\D/g, '');
    if (birthdateNumeros.length !== 8) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Data de nascimento inválida. Deve estar no formato DD/MM/AAAA.',
      });
      setLoading(false);
      return;
    }

    if (activeTab === 0) {
      if (!validarCPF(document)) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'CPF inválido. Verifique e tente novamente.',
        });
        setLoading(false);
        return;
      }

      const telNumeros = tel.replace(/\D/g, '');
      if (telNumeros.length < 10 || telNumeros.length > 11) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Telefone inválido. Deve conter 10 ou 11 dígitos.',
        });
        setLoading(false);
        return;
      }

      try {
        const result = await buscarCep(cep.replace(/\D/g, ''));
        if (result) {
          setAddress(result.logradouro || '');
          setDistrict(result.bairro || '');
          setCity(result.localidade || '');
          setState(result.uf || '');
          Toast.show({
            type: 'success',
            text1: 'Sucesso',
            text2: 'Endereço preenchido automaticamente!',
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: error.message || 'Erro ao buscar o CEP.',
        });
        setLoading(false);
        return;
      }
    }

    // Finalizar cadastro
    if (activeTab === tabs.length - 1) {
      const fulladdress = `${address}, ${number} ${complement ? `, ${complement}` : ''}`;

      const userData = {
        username: document.replace(/\D/g, ''),
        password: document.replace(/\D/g, ''),
        fullname: fullname,
        fulladdress: fulladdress,
        scholarity: scholarity,
        document: document.replace(/\D/g, ''),
        gender: gender,
        birthdate: birthdate,
        cell: tel.replace(/\D/g, ''),
        zipcode: cep.replace(/\D/g, ''),
        city: `${city}/${state}`,
      };

      try {
        const res = await registerUser(userData);
        if (res) {
          Toast.show({
            type: 'success',
            text1: 'Atenção',
            text2: 'Cadastro realizado com sucesso!',
          });
          router.push('/auth/login'); // Redireciona para a tela de login
        }
      } catch (err) {
        const errorMessage = typeof err === 'string' ? err : err.message || 'Erro ao realizar cadastro.';
        Toast.show({
          type: 'error',
          text1: 'Atenção',
          text2: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Avançar para a próxima etapa
      setActiveTab(activeTab + 1);
      setLoading(false);
    }
  };

  const tabProgress = [
    styles.progressFilled1,
    styles.progressFilled2,
  ];

  const tabs = [
    // step 1
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Preencha seus dados para começar!</Text>
      <Text style={styles.subtitle}>
        Por favor, informe todos os campos abaixo para finalizarmos o seu cadastro
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nome completo:</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              placeholder="Seu nome completo"
              style={styles.input}
              placeholderTextColor="#aaa"
              value={fullname}
              onChangeText={setFullname}
              autoCapitalize="words"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            CPF
          </Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="card-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInputMask
            type='cpf'
            placeholder='000.000.000-00'
            style={styles.input}
            placeholderTextColor="#aaa"
            value={document}
            onChangeText={setDocument}
            keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Data de nascimento:</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="calendar-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            placeholder="DD/MM/AAAA"
            style={styles.input}
            placeholderTextColor="#aaa"
            value={birthdate}
            onChangeText={setBirthdate}
            keyboardType="date-pad"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Gênero:</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="male-female-outline" size={20} color="#888" style={styles.inputIcon} />
            <TouchableOpacity
              style={[styles.input, { justifyContent: 'center' }]}
              activeOpacity={0.7}
              onPress={() => setShowGenderOptions(true)}
            >
              <Text style={{ color: gender ? '#222' : '#aaa' }}>
          {Gender.GENDER_CHOICES.find((option) => option.value === gender)?.label || 'Selecione o gênero'}
              </Text>
            </TouchableOpacity>
          </View>
          {showGenderOptions && (
            <View style={styles.optionsContainer}>
              {Gender.GENDER_CHOICES.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.optionItem}
            onPress={() => {
              setGender(option.value);
              setShowGenderOptions(false);
            }}
          >
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

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

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Telefone:</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInputMask
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(**) ',
              }}
              placeholder="(63) 9 9999-9999"
              keyboardType="phone-pad"
              style={styles.input}
              placeholderTextColor="#aaa"
              value={tel}
              onChangeText={setTel}
              autoCapitalize="words"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>CEP:</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInputMask
              type={'zip-code'}
              options={{
                mask: '99999-999',
              }}
              placeholder="CEP"
              style={styles.input}
              placeholderTextColor="#aaa"
              value={cep}
              onChangeText={setCep}
              autoCapitalize="words"
              keyboardType="numeric"
            />
          </View>
        </View>

      </View>    
    </View>,

    // step 2
    <View style={styles.contentContainer}>
      <Text style={styles.subtitle}>
        Por favor, informe todos os campos abaixo para finalizarmos o seu cadastro
      </Text>
      

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Endereço:</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="location-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              placeholder="Rua, avenida, etc."
              style={styles.input}
              placeholderTextColor="#aaa"
              value={address}
              onChangeText={setAddress}
              autoCapitalize="words"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Número:</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="home-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              placeholder="Número"
              style={styles.input}
              placeholderTextColor="#aaa"
              value={number}
              onChangeText={setNumber}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Complemento:</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="document-text-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              placeholder="Apartamento, bloco, etc. (opcional)"
              style={styles.input}
              placeholderTextColor="#aaa"
              value={complement}
              onChangeText={setComplement}
              autoCapitalize="words"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Bairro:</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="business-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              placeholder="Bairro"
              style={styles.input}
              placeholderTextColor="#aaa"
              value={district}
              onChangeText={setDistrict}
              autoCapitalize="words"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Cidade:</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="map" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              placeholder="Cidade"
              style={styles.input}
              placeholderTextColor="#aaa"
              value={city}
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Estado:</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="flag-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              placeholder="Estado"
              style={styles.input}
              placeholderTextColor="#aaa"
              value={state}
              editable={false}
              selectTextOnFocus={false}
              maxLength={2}
            />
          </View>
        </View>
      </View>
    </View>,
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => handleTabs()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.light.primary} />
            </TouchableOpacity>
            
            <Logo style={styles.logo} />
          </View>


          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={tabProgress[activeTab]} />
            </View>
            <Text style={styles.progressText}>Etapa {activeTab+1} de {tabs.length}</Text>
          </View>
          {tabs[activeTab]}

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleFinishRegistration}
            disabled={loading} // Desativa o botão enquanto o estado de loading for true
          >
            <Text style={styles.buttonText}>{activeTab + 1 === tabs.length ? 'Finalizar' : 'Avançar'}</Text>
            <Ionicons
              name={activeTab + 1 === tabs.length ? 'checkmark-circle' : 'arrow-forward'}
              size={20}
              color="#fff"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            <Ionicons name="information-circle-outline" size={20} color="#464444" />
            <Text style={styles.infoText}>
              Seus dados pessoais não ficarão visíveis para outros usuários do aplicativo.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}