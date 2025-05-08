import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '@/components/ui/Logo';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterFinish() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();
  
  const handleFinishRegistration = () => {
    // Lógica para finalizar o cadastro
    console.log('Cadastro finalizado com:', firstName, lastName, username);
    router.push('/'); // Navegar para a home ou outra tela após o cadastro
  };

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
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.light.primary} />
            </TouchableOpacity>
            
            <Logo style={styles.logo} />
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={styles.progressFilled} />
            </View>
            <Text style={styles.progressText}>Etapa 2 de 2</Text>
          </View>
          
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Quase lá!</Text>
            <Text style={styles.subtitle}>
              Por favor, informe os campos abaixo para finalizarmos o seu cadastro
            </Text>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nome</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Seu nome"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    value={firstName}
                    onChangeText={setFirstName}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Sobrenome</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Seu sobrenome"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    value={lastName}
                    onChangeText={setLastName}
                    autoCapitalize="words"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nome de usuário</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="at-outline" size={20} color="#888" style={styles.inputIcon} />
                  <TextInput
                    placeholder="Seu nome de usuário"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Ionicons name="information-circle-outline" size={20} color="#888" />
              <Text style={styles.infoText}>
                Seu nome de usuário será visível para outros usuários do aplicativo.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={handleFinishRegistration}
            >
              <Text style={styles.buttonText}>Finalizar o cadastro</Text>
              <Ionicons name="checkmark-circle" size={20} color="#fff" style={styles.buttonIcon} />
            </TouchableOpacity>

          
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    height: 30,
    resizeMode: 'contain',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFilled: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.light.primary,
    borderRadius: 3,
  },
  progressText: {
    color: '#888',
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    color: '#666',
    fontSize: 16,
    marginBottom: 30,
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 24,
  },
  infoText: {
    color: '#666',
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
  },
  button: {
    backgroundColor: Colors.light.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
  },
  footerLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 4,
  },
  footerLink: {
    color: Colors.light.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});