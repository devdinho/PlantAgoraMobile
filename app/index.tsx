import { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Logo from '@/components/ui/Logo';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkFirstAccess = async () => {
      try{
        const valueFirstAccess = await AsyncStorage.getItem('firstAccess');

        if (valueFirstAccess === null) {
          await AsyncStorage.setItem('firstAccess', 'true');
        } else {
          valueFirstAccess === 'true' ? router.push('/auth/login'):''
        }
      } catch (error) {
        console.error('Error accessing AsyncStorage:', error);
      }
    }

    checkFirstAccess();

  },[]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Logo style={styles.logo} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Conheça o app</Text>
          <Text style={styles.subtitle}>
            Descubra as hortas comunitárias mais próximas de você
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/login')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Seguinte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  logo: {},
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '90%',
  },
  buttonWrapper: {
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 8,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
