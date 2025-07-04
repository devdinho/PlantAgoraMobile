import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import styles from './styles';

const mockNotifications = [
  {
    id: 1,
    title: 'Assistência técnica agendada',
    description: 'A SEASI agendou visita técnica para quinta-feira às 14h para orientações sobre irrigação.',
    time: '2 horas atrás',
    type: 'technical',
    isRead: false,
    icon: 'people-outline',
  },
  {
    id: 2,
    title: 'Insumos disponíveis para retirada',
    description: 'Sementes de alface e adubo orgânico estão disponíveis na Secretaria de Agricultura.',
    time: '1 dia atrás',
    type: 'supplies',
    isRead: false,
    icon: 'leaf-outline',
  },
  {
    id: 3,
    title: 'Atualização de dados pendente',
    description: 'Por favor, atualize suas informações de produção mensal no sistema.',
    time: '2 dias atrás',
    type: 'update',
    isRead: false,
    icon: 'document-text-outline',
  },
  {
    id: 4,
    title: 'Capacitação em horticultura',
    description: 'Curso sobre controle de pragas e doenças - Inscrições abertas até sexta-feira.',
    time: '3 dias atrás',
    type: 'training',
    isRead: true,
    icon: 'school-outline',
  },
  {
    id: 5,
    title: 'Programa de microcrédito',
    description: 'Novas vagas abertas para financiamento de equipamentos agrícolas. Prazo até dia 25.',
    time: '5 dias atrás',
    type: 'program',
    isRead: true,
    icon: 'card-outline',
  },
];

export default function Notifications() {
  const unreadCount = mockNotifications.filter(notification => !notification.isRead).length;

  const handleNotificationPress = (notification: typeof mockNotifications[0]) => {
    console.log('Notificação pressionada:', notification.title);
    // Ação de abrir a notificação?
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'technical':
        return '#46A56C';
      case 'supplies':
        return '#89C6A7';
      case 'training':
        return '#0c8b56';
      case 'update':
        return '#FF6B6B';
      case 'weather':
        return '#4A90E2';
      case 'program':
        return '#F5A623';
      default:
        return '#46A56C';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header} >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
         </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Notifications List */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {mockNotifications.length > 0 ? (
          mockNotifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                !notification.isRead && styles.unreadCard
              ]}
              activeOpacity={0.8}
              onPress={() => handleNotificationPress(notification)}
            >
              <View style={[
                styles.iconContainer,
                { backgroundColor: notification.isRead ? '#f0f8f4' : '#e0f2ea' }
              ]}>
                <Ionicons 
                  name={notification.icon as any} 
                  size={22} 
                  color={getIconColor(notification.type)} 
                />
              </View>
              
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text style={[
                    styles.notificationTitle,
                    !notification.isRead && styles.unreadTitle
                  ]}>
                    {notification.title}
                  </Text>
                  <Text style={styles.notificationTime}>
                    {notification.time}
                  </Text>
                </View>
                <Text style={styles.notificationDescription}>
                  {notification.description}
                </Text>
              </View>

              {!notification.isRead && (
                <View style={styles.unreadIndicator} />
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons 
              name="notifications-off-outline" 
              size={64} 
              color="#ccc" 
            />
            <Text style={styles.emptyTitle}>Nenhuma notificação</Text>
            <Text style={styles.emptyDescription}>
              Você receberá notificações sobre assistência técnica, insumos, capacitações e programas da prefeitura aqui.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 