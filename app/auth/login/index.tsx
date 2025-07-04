import { useState, useEffect } from 'react';
import {View,Text,TextInput,TouchableOpacity, Pressable,KeyboardAvoidingView,Platform,ScrollView,} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {ActivityIndicator} from 'react-native';

import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { callApi, API_BASE_URL } from '@/services/api';
import ApiError from '../../../constants/errors'
import LoginInterface from '../../../interfaces/login';

import Logo from '@/components/ui/Logo';
import styles from './styles';

import { useBottomNav } from '../../../app/context/BottomNavContext';


export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { setVisible } = useBottomNav();

  const router = useRouter();
  
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userSessionKeys = await AsyncStorage.getItem('userSessionKeys');

        if (userSessionKeys) {
          router.push('/profile');
        }
      } catch (error) {
        setError(error);
      }
    }
    checkUserSession();

  }, [router]);

  useEffect(() => {
    if (error) {      
      Toast.show({
        type: 'error',
        text1: 'Atenção',
        text2: error,
      });
    }
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: 'Login realizado com sucesso!',
      });
    }
  }, [error, success]);

  const login = async (userData: LoginInterface) => {
    try {
      const result = await callApi('login', {
        body: userData,
      });

      if (!result || !result.access) {
        throw 'Usuário ou senha inválidos';
      }

      return result;
    } catch (error) {
      let errorMessage = ApiError.ERROR_CHOICES.find(item => item.value === error.message)?.label;

      if (!errorMessage) {
        errorMessage = typeof error === 'string' ? error : 'User não encontrado';
      }
      throw errorMessage;
    }
  };

  const getUserProfile = async () => {
    try {
      const result = await callApi('profile', {
        headers: {
          Authorization: `Bearer ${JSON.parse(await AsyncStorage.getItem('userSessionKeys')).access}`,
        },
      });
      return result;
    } catch (error) {
      let errorMessage = ApiError.ERROR_CHOICES.find(item => item.value === error.message).label;
      if (!errorMessage) {
        errorMessage = 'Erro desconhecido'
      }
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (username && password) {
      const userData = {
        username: username.replace(/\D/g, ''),
        password: password,
      };
      try {
        const result = await login(userData);
        if (result) {
          AsyncStorage.setItem('userSessionKeys', JSON.stringify(result));

          const userProfile = await getUserProfile();
          AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
          
          const profilePicture = userProfile.profilePicture;
          if (profilePicture) {
            AsyncStorage.setItem('userProfilePicture', API_BASE_URL + profilePicture);
          } else {
            AsyncStorage.setItem('userProfilePicture', '');
          }

          setSuccess(true);

          if (userProfile.grower.registerApproved) {
            router.push('/home');
            setVisible(true)
          } else {
            setVisible(false);
            router.push('/profile');
          }

        }
      } catch (error) {
        setError(error); // Exibe a mensagem de erro
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError('Preencha todos os campos');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Logo style={styles.logo} />
        
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>
            Bem-vindo de volta
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Acesse sua conta para continuar
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>CPF</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInputMask
                type="cpf"
                placeholder="000.000.000-00"
                style={styles.input}
                placeholderTextColor="#aaa"
                value={username}
                onChangeText={setUsername}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Senha</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                placeholder="Sua senha"
                style={styles.input}
                placeholderTextColor="#aaa"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#888" />
              </Pressable>
            </View>
          </View>

        </View>

        
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.link}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading && <ActivityIndicator size="small" color="#c2c2c2"/> }
          {!loading && <Text style={styles.buttonText}>Entrar</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button_secondary}
          activeOpacity={0.8}
          onPress={() => router.push('/auth/register')}
        >
          <Text style={styles.buttonTextSecondary}>Crie seu cadastro de Hortelão</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>ou continue com</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Ionicons name="logo-google" size={22} color="#444" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Ionicons name="logo-apple" size={22} color="#444" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
            <Ionicons name="logo-facebook" size={22} color="#444" />
          </TouchableOpacity>
        </View>

      
      </ScrollView>
    </KeyboardAvoidingView>
  );
}