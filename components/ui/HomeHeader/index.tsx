import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

interface HomeHeaderProps {
  greeting: string;
  userName: string;
  urgentCount: number;
  onNotificationPress: () => void;
}

export default function HomeHeader({ 
  greeting, 
  userName, 
  urgentCount, 
  onNotificationPress 
}: HomeHeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={onNotificationPress}
      >
        <Ionicons name="notifications-outline" size={24} color="#333" />
        {urgentCount > 0 && (
          <View style={styles.urgentBadge}>
            <Text style={styles.urgentText}>{urgentCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
} 