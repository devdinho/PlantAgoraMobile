import React from 'react';
import { router } from 'expo-router';
import {
    StatusBar,
    TouchableOpacity, 
    Text, 
    StyleSheet, 
    View 
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Logo from '@/components/ui/Logo';

const AboutScreen = () => {
  
  return (
    <>  
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
        onPress={() => router.push('/config')}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity >
        <Text style={styles.headerTitle}>Sobre o App</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.logoContainer}>
        <Logo style={styles.logo} />
      </View>

      <Text style={styles.title}>Sobre o PlantAgora</Text>

      <Text style={styles.paragraph}>
        O PlantAgora é um aplicativo dedicado ao monitoramento e gestão de hortas comunitárias.
        Nosso objetivo é facilitar o cuidado com a terra, promover o cultivo colaborativo e incentivar
        práticas sustentáveis nas cidades.
      </Text>

      <Text style={styles.paragraph}>
        Com o PlantAgora, horticultores e secretarias públicas podem acompanhar dados das plantações,
        organizar tarefas, registrar colheitas e tomar decisões baseadas em informações atualizadas.
      </Text>

      <Text style={styles.paragraph}>
        Acreditamos que a tecnologia pode fortalecer a conexão entre pessoas e natureza, contribuindo
        para comunidades mais verdes, saudáveis e integradas.
      </Text>

      <Text style={styles.footer}>Versão 0.1.0 • Desenvolvido por A6N Tecnologia</Text>
    </>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  backButton: {
    padding: 4,
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
    textAlign: 'center',
  },
});
