import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../types';

export const useUserData = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async () => {
    try {
      const userProfileInfo = await AsyncStorage.getItem('userProfile');
      if (userProfileInfo) {
        const userInfos = JSON.parse(userProfileInfo);
        setUserProfile(userInfos);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserDisplayName = (): string => {
    if (!userProfile) return 'Usuário';
    return userProfile.first_name || 'Usuário';
  };

  const getUserFullName = (): string => {
    if (!userProfile) return 'Usuário';
    return `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim() || 'Usuário';
  };

  const getAcronym = (): string => {
    if (!userProfile) return 'U';
    const firstName = userProfile.first_name || '';
    const lastName = userProfile.last_name || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || 'U';
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  return {
    userProfile,
    loading,
    getUserDisplayName,
    getUserFullName,
    getAcronym,
    loadUserProfile,
  };
}; 