import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

interface NotificationData {
  id: string;
  title: string;
  message: string;
  read: boolean;
  type: 'assistencia' | 'insumos' | 'dados' | 'capacitacao' | 'financeiro';
}

interface NotificationsCardProps {
  notifications: NotificationData[];
  onViewAll: () => void;
}

export default function NotificationsCard({ notifications, onViewAll }: NotificationsCardProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'assistencia':
        return 'construct-outline';
      case 'insumos':
        return 'leaf-outline';
      case 'dados':
        return 'document-text-outline';
      case 'capacitacao':
        return 'school-outline';
      case 'financeiro':
        return 'card-outline';
      default:
        return 'notifications-outline';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Notificações</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAllText}>Ver todas</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.notificationsList}>
        {notifications.slice(0, 3).map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Ionicons
                name={getNotificationIcon(notification.type) as any}
                size={20}
                color="#46A56C"
                style={styles.notificationIcon}
              />
              <View style={styles.notificationText}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
              </View>
            </View>
            {!notification.read && <View style={styles.unreadIndicator} />}
          </View>
        ))}
      </View>
    </View>
  );
} 