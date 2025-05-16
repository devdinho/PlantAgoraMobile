import { useState } from 'react';
import { 
  Alert,
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

import styles from './styles';
import { DocumentType, LevelOfEducation, Gender, ProfileType } from '@/constants/contants';
import { callApi } from '@/services/api';

const buscarCep = async (cep:string) => {
  try {
    const result = await callApi('get_address', {
      urlParams: { cep: cep },
    });
    return result;
  } catch (error) {
    console.error('Erro ao buscar o CEP:', error);
  }
};

const registerUser = async (userData:any) => {
  console.log('userData', userData);
  try {
    const result = await callApi('register', {
      body: userData,
    });
    return result;
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
  }
}
export default function RegisterFinish() {

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
  const [documentType, setDocumentType] = useState(DocumentType.CPF);
  
  const [birthdate, setBirthdate] = useState('');
  
  const [gender, setGender] = useState('');
  const [showGenderOptions, setShowGenderOptions] = useState(false);
  
  const [caf, setCaf] = useState('');

  const [scholarity, setScholarity] = useState('');
  const [showScholarityOptions, setShowScholarityOptions] = useState(false);
  
  
  const router = useRouter();

  const handleTabs = () => {
    if(activeTab === 0) {
      router.back();
    }
    setActiveTab(activeTab - 1);
  };
  
  const handleFinishRegistration = () => {
    let allInseted = true;

    switch (activeTab) {
      case 0:
        allInseted = [fullname, documentType, document, birthdate, gender, scholarity, tel, cep]
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
      Alert.alert('Preencha todos os campos obrigatórios!');
      return;
    }

    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }

    if (activeTab === 0) {
      var result = buscarCep(cep);

      result.then((res) => {
        if (res) {
          setAddress(res.logradouro);
          setDistrict(res.bairro);
          setCity(res.localidade);
          setState(res.uf);
        } else {
          Alert.alert('Erro ao buscar o CEP');
        }
      });
    }

    if (activeTab === tabs.length - 1) {
      var endereco = `${address}, ${number} ${complement ? `, ${complement}` : ''}`;

      const userData = {
        fullname,
        caf,
        endereco: endereco,
        scholarity,
        document,
        document_type: documentType,
        gender,
        birthdate,
        tel,
      }
      
      const result = registerUser(userData);
      result.then((res) => {
        if (res) {
          Alert.alert('Cadastro realizado com sucesso!');
          router.push('/auth/login');
        } else {
          Alert.alert('Erro ao realizar o cadastro');
        }
      }
      );32


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

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          {DocumentType.DOCUMENT_TYPE_CHOICES.map((typeOption) => (
            <TouchableOpacity
              key={typeOption.value}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 16,
                marginBottom: 8,
                padding: 8,
              }}
              onPress={() => setDocumentType(typeOption.value)}
              activeOpacity={0.7}
            >
              <View
                style={{
                  height: 18,
                  width: 18,
                  borderRadius: 9,
                  borderWidth: 2,
                  borderColor: Colors.light.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 6,
                }}
              >
                {documentType === typeOption.value && (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: Colors.light.primary,
                    }}
                  />
                )}
              </View>
              <Text style={{ color: '#444', fontSize: 14 }}>{typeOption.label}</Text>
            </TouchableOpacity>
          ))}
        </View>


        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            {documentType === DocumentType.CNPJ ? 'CNPJ:' : 'CPF:'}
          </Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="card-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInputMask
            type={documentType === DocumentType.CNPJ ? 'cnpj' : 'cpf'}
            placeholder={documentType === DocumentType.CNPJ ? '00.000.000/0000-00' : '000.000.000-00'}
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
                dddMask: '(63) ',
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
          >
            <Text style={styles.buttonText}>{activeTab + 1  === tabs.length ? 'Finalizar':'Avançar'}</Text>
            <Ionicons name={activeTab + 1  === tabs.length ?'checkmark-circle':'arrow-forward'} size={20} color="#fff" style={styles.buttonIcon} />
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