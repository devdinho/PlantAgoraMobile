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

import styles from './styles';
import cards from '@/constants/ProfileCards';

import { useBottomNav } from '@/app/context/BottomNavContext';

export default function Profile() {
  const [userFirstName, setUserFirstName] = useState<string>('');
  const [userPicture, setUserPicture] = useState<string>('');
  const [acronym, setAcronym] = useState<string>('');
  const [registerApproved, setRegisterApproved] = useState(true);
  
  const { setVisible, setSelectedIndex } = useBottomNav();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileInfo = await AsyncStorage.getItem('userProfile');
        if (userProfileInfo) {
          const userInfos = JSON.parse(userProfileInfo);
          setUserFirstName(userInfos.first_name);
          setRegisterApproved(userInfos.grower?.registerApproved ?? true);
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
      
      setVisible(false)
      setSelectedIndex(0)

      router.push('/auth/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      {registerApproved ?
      <View style={styles.header}>
        <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => router.push('/config')}
        >
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      :''}

      {/* Welcome Section */}
      <LinearGradient
        colors={['#f9f9f9', '#ffffff']}
        style={styles.welcomeContainer}
      >
        <View style={styles.welcomeContent}>
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeTitle}>Olá, {userFirstName}!</Text>
            {registerApproved ?
            <Text style={styles.welcomeSubtitle}>
              Por favor, selecione um card abaixo para preencher
              ou atualizar suas informações
            </Text>:''}
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
                ]}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.iconContainer,
                ]}>
                  <Ionicons 
                    name={card.icon} 
                    size={22} 
                    color={'#0c8b56'} 
                  />
                </View>
                <View style={styles.cardTextContainer}>
                  <Text style={[
                    styles.cardTitle,
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
                    color={'#ccc'} 
                  />
                </View>
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