import Logo from '@/components/ui/Logo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// Obtendo a largura da tela para responsividade
const { width } = Dimensions.get('window');

export default function HomePage() {
  const [selectedCard, setSelectedCard] = useState('dados');
  
  // Dados dos cartões
  const cards = [
    { 
      id: 'dados', 
      title: 'Dados Pessoais', 
      icon: 'person-outline',
      description: 'Gerencie suas informações pessoais e de contato'
    },
    { 
      id: 'estrutura', 
      title: 'Estrutura da Horta', 
      icon: 'leaf-outline',
      description: 'Configure detalhes sobre sua horta e plantações'
    },
    { 
      id: 'producao', 
      title: 'Produção e Comercialização', 
      icon: 'bar-chart-outline',
      description: 'Acompanhe sua produção e vendas'
    },
    { 
      id: 'tecnologias', 
      title: 'Tecnologias e Perfil Familiar', 
      icon: 'people-outline',
      description: 'Gerencie tecnologias e dados familiares'
    },
    { 
      id: 'infraestrutura', 
      title: 'Infraestrutura e Apoio', 
      icon: 'construct-outline',
      description: 'Configure recursos e suporte para sua produção'
    },
    { 
      id: 'sugestoes', 
      title: 'Questões abertas/Sugestões', 
      icon: 'chatbubble-ellipses-outline',
      description: 'Envie perguntas ou sugestões para nossa equipe'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Logo style={styles.logo} />
        </View>
        <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => router.push('/config')}
        >
          {/* Icone de configurações */}
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <LinearGradient
        colors={['#f9f9f9', '#ffffff']}
        style={styles.welcomeContainer}
      >
        <View style={styles.welcomeContent}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>Olá, Joaquim!</Text>
            <Text style={styles.welcomeSubtitle}>
              Por favor, selecione um card abaixo para preencher
              ou atualizar suas informações
            </Text>
          </View>
          <View style={styles.profileImageContainer}>
            <Logo style={styles.logo} />
            <View style={styles.statusIndicator} />
          </View>
        </View>
      </LinearGradient>

      {/* Cards */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[
              styles.card,
              selectedCard === card.id && styles.selectedCard
            ]}
            activeOpacity={0.8}
            onPress={() => setSelectedCard(card.id)}
          >
            <View style={[
              styles.iconContainer,
              selectedCard === card.id && styles.selectedIconContainer
            ]}>
              <Ionicons 
                name={card.icon} 
                size={22} 
                color={selectedCard === card.id ? '#fff' : '#0c8b56'} 
              />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={[
                styles.cardTitle,
                selectedCard === card.id && styles.selectedCardTitle
              ]}>
                {card.title}
              </Text>
              <Text style={styles.cardDescription}>
                {card.description}
              </Text>
            </View>
            <View style={styles.cardArrow}>
              <Ionicons 
                name="chevron-forward" 
                size={20} 
                color={selectedCard === card.id ? '#0c8b56' : '#ccc'} 
              />
            </View>
            
            {/* Indicator Dot */}
            {selectedCard === card.id && (
              <View style={styles.selectedIndicator} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={24} color="#0c8b56" />
          <Text style={[styles.navText, styles.activeNavText]}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="calendar-outline" size={24} color="#aaa" />
          <Text style={styles.navText}>Agenda</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="notifications-outline" size={24} color="#aaa" />
          <Text style={styles.navText}>Notificações</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person-outline" size={24} color="#aaa" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 8,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  welcomeContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  welcomeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#777',
    lineHeight: 20,
  },
  profileImageContainer: {
    marginLeft: 20,
    position: 'relative',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  statusIndicator: {
    position: 'absolute',
    width: 12,
    height: 12,
    backgroundColor: '#0c8b56',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    position: 'relative',
  },
  selectedCard: {
    borderColor: '#e0f2ea',
    backgroundColor: '#f7fdfb',
    shadowColor: '#0c8b56',
    shadowOpacity: 0.1,
    elevation: 3,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#f0f8f4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  selectedIconContainer: {
    backgroundColor: '#0c8b56',
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  selectedCardTitle: {
    color: '#0c8b56',
  },
  cardDescription: {
    fontSize: 12,
    color: '#888',
    lineHeight: 16,
  },
  cardArrow: {
    marginLeft: 10,
  },
  selectedIndicator: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0c8b56',
    top: 15,
    right: 15,
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
  activeNavText: {
    color: '#0c8b56',
    fontWeight: '500',
  },
});