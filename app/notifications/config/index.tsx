import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, View, Text, Switch, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componentes
import { ConfigHeader } from '../../../components/ui';

// Estilos
import styles from './styles';

interface NotificationSettings {
  pushEnabled: boolean;
  salesNotifications: boolean;
  gardenNotifications: boolean;
  weatherNotifications: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  quietHours: boolean;
  quietStart: string;
  quietEnd: string;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  pushEnabled: true,
  salesNotifications: true,
  gardenNotifications: true,
  weatherNotifications: true,
  soundEnabled: true,
  vibrationEnabled: true,
  quietHours: false,
  quietStart: '22:00',
  quietEnd: '07:00',
};

export default function NotificationConfigScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('notificationSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackPress = () => {
    router.push('/config');
  };

  const updateSetting = async (key: keyof NotificationSettings, value: boolean | string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    try {
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
    }
  };

  const renderToggleItem = (
    icon: string,
    title: string,
    subtitle: string,
    settingKey: keyof NotificationSettings,
    iconColor: string = '#46A56C'
  ) => {
    return (
      <View style={styles.toggleItem}>
        <View style={styles.itemLeft}>
          <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
            <Ionicons name={icon as any} size={20} color={iconColor} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemSubtitle}>{subtitle}</Text>
          </View>
        </View>
        <Switch
          value={settings[settingKey] as boolean}
          onValueChange={(value) => updateSetting(settingKey, value)}
          trackColor={{ false: '#e0e0e0', true: '#46A56C' }}
          thumbColor={settings[settingKey] ? '#fff' : '#f4f3f4'}
        />
      </View>
    );
  };

  const renderTimeItem = (
    icon: string,
    title: string,
    subtitle: string,
    time: string,
    iconColor: string = '#46A56C'
  ) => {
    return (
      <TouchableOpacity style={styles.timeItem}>
        <View style={styles.itemLeft}>
          <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
            <Ionicons name={icon as any} size={20} color={iconColor} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemSubtitle}>{subtitle}</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{time}</Text>
          <Ionicons name="chevron-forward" size={16} color="#ccc" />
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
        <ConfigHeader title="Configurações de Notificações" onBackPress={handleBackPress} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando configurações...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fafafa" />
      
      <ConfigHeader title="Configurações de Notificações" onBackPress={handleBackPress} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Notificações Push */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>NOTIFICAÇÕES PUSH</Text>
          <View style={styles.sectionContent}>
            {renderToggleItem(
              'notifications-outline',
              'Notificações Push',
              'Receber notificações no dispositivo',
              'pushEnabled'
            )}
          </View>
        </View>

        {/* Tipos de Notificações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>TIPOS DE NOTIFICAÇÕES</Text>
          <View style={styles.sectionContent}>
            {renderToggleItem(
              'cash-outline',
              'Vendas',
              'Lembretes de vendas e metas',
              'salesNotifications'
            )}
            {renderToggleItem(
              'leaf-outline',
              'Horta',
              'Status da horta e colheitas',
              'gardenNotifications'
            )}
            {renderToggleItem(
              'cloud-outline',
              'Clima',
              'Condições climáticas e irrigação',
              'weatherNotifications'
            )}
          </View>
        </View>

        {/* Configurações de Som */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SOM E VIBRAÇÃO</Text>
          <View style={styles.sectionContent}>
            {renderToggleItem(
              'volume-high-outline',
              'Som',
              'Tocar som ao receber notificações',
              'soundEnabled'
            )}
            {renderToggleItem(
              'phone-portrait-outline',
              'Vibração',
              'Vibrar ao receber notificações',
              'vibrationEnabled'
            )}
          </View>
        </View>

        {/* Horário Silencioso */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HORÁRIO SILENCIOSO</Text>
          <View style={styles.sectionContent}>
            {renderToggleItem(
              'moon-outline',
              'Modo Silencioso',
              'Silenciar notificações em horários específicos',
              'quietHours'
            )}
            
            {settings.quietHours && (
              <>
                {renderTimeItem(
                  'time-outline',
                  'Início',
                  'Horário de início do modo silencioso',
                  settings.quietStart,
                  '#666'
                )}
                {renderTimeItem(
                  'time-outline',
                  'Fim',
                  'Horário de fim do modo silencioso',
                  settings.quietEnd,
                  '#666'
                )}
              </>
            )}
          </View>
        </View>

        {/* Informações */}
        <View style={styles.infoSection}>
          <View style={styles.infoContainer}>
            <Ionicons name="information-circle-outline" size={20} color="#666" />
            <Text style={styles.infoText}>
              As configurações de notificações são sincronizadas automaticamente. 
              Você pode alterar essas configurações a qualquer momento.
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
} 