import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';

import { useBottomNav } from '../context/BottomNavContext';

import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ConfiguracoesScreen(){
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [userLastName, setUserLastName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPicture, setUserPicture] = useState<string | null>(null);
  const [acronym, setAcronym] = useState<string | null>(null);

  const { setVisible } = useBottomNav();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileInfo = await AsyncStorage.getItem('userProfile');
        const userProfilePicture = await AsyncStorage.getItem('userProfilePicture');

        if (userProfileInfo) {
          const userInfos = JSON.parse(userProfileInfo);
          setUserFirstName(userInfos.first_name);
          setUserLastName(userInfos.last_name);
          setUserEmail(userInfos.email);
          setAcronym(userInfos.first_name.charAt(0).toUpperCase() + userInfos.last_name.charAt(0).toUpperCase());
        }
        if (userProfilePicture) {
          setUserPicture(userProfilePicture);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
    
  }, []);

  const renderMenuItem = (
    iconName: keyof typeof Ionicons.glyphMap, 
    title: string, 
    subtitle: string | null = null, 
    hasChevron: boolean = true, 
    onPress: () => void = () => {}
  ) => {
    return (
      <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <View style={styles.menuItemLeft}>
          <View style={styles.menuIcon}>
            <Ionicons name={iconName} size={22} color="#666" />
          </View>
          <View>
            <Text style={styles.menuItemTitle}>{title}</Text>
            {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
          </View>
        </View>
        {hasChevron && (
          <Ionicons name="chevron-forward" size={20} color="#999" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}
         onPress={() => (setVisible(true), router.push('/profile'))}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity >
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <View style={styles.profileContainer}>
            <Text style={styles.sectionTitle}>Perfil</Text>
            <Text style={styles.sectionSubtitle}>Suas informações pessoais</Text>
            
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                {userPicture ? (
                  <Image
                    source={{ uri: userPicture }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                ) : (
                  <Text style={styles.avatarText}>{acronym}</Text>
                )}
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{userFirstName} {userLastName}</Text>
                <Text style={styles.userEmail}>{userEmail}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>GERENCIAMENTO</Text>
          
          {renderMenuItem(
            'notifications',
            'Notificações',
            null,
            true,
            () => (setVisible(false), router.push('/notifications/config'))
          )}
          
          {renderMenuItem(
            'lock-closed',
            'Privacidade e Segurança'
          )}
          
          {renderMenuItem(
            'trash',
            'Limpar dados do formulário',
            null,
            false,
            () => {}
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SUPORTE</Text>
          
          {renderMenuItem(
            'help-circle',
            'Ajuda e Suporte'
          )}
          
          {renderMenuItem(
            'information-circle',
            'Sobre o aplicativo',
            null,
            true,
            () => (setVisible(false), router.push('/config/about'))
          )}
        </View>

        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

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
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 16,
    marginBottom: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileContainer: {
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
    marginLeft: 16,
    marginTop: -8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D6F5E3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2B9564',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuItemTitle: {
    fontSize: 16,
    color: '#333',
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  footer: {
    height: 32,
  },
});