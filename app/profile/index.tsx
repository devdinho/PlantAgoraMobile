import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Logo from '@/components/ui/Logo';
import styles from './styles';
import cards from '@/constants/ProfileCards';
import  { useBottomNav } from '../context/BottomNavContext';

export default function Profile() {
  const [selectedCard, setSelectedCard] = useState('dados');
  const [userFirstName, setUserFirstName] = useState(null);
  const [userPicture, setUserPicture] = useState(null);
  const [acronym, setAcronym] = useState(null);
  const [registerApproved, setRegisterApproved] = useState(false);

  const { setVisible, setSelectedIndex } = useBottomNav();
  
  useEffect(() => {
    setVisible(true);
    setSelectedIndex(3)
    const fetchUserProfile = async () => {
      try {
        const userProfileInfo = await AsyncStorage.getItem('userProfile');
        if (userProfileInfo) {
          const userInfos = JSON.parse(userProfileInfo);
          setUserFirstName(userInfos.first_name);
          setRegisterApproved(userInfos.grower.registerApproved);
          setAcronym(userInfos.first_name.charAt(0).toUpperCase() + userInfos.last_name.charAt(0).toUpperCase());
        }
        const userProfilePicture = await AsyncStorage.getItem('userProfilePicture');
        if (userProfilePicture) {
          setUserPicture(userProfilePicture);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userProfile');
      await AsyncStorage.removeItem('userSessionKeys');
      
      router.push('/auth/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

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
            <Text style={styles.welcomeTitle}>Olá, {userFirstName}!</Text>
            <Text style={styles.welcomeSubtitle}>
              Por favor, selecione um card abaixo para preencher
              ou atualizar suas informações
            </Text>
          </View>
          <View style={styles.profileImageContainer}>
            {userPicture ? (
              <Image
                source={{ uri: userPicture }}
                style={styles.profileImage}
              />
            ) : (
              <Text style={styles.avatarText}>{acronym}</Text>
            )}
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
        {registerApproved ? (
          <>
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
          </>
        ): (
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>
              Seu cadastro ainda não foi aprovado. Por favor, aguarde a aprovação.
            </Text>
          </View>
        )}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={20} color="#fff" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}