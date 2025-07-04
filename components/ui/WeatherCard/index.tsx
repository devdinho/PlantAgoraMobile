import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

interface WeatherData {
  temperature: number;
  condition: string;
  rainChance: number;
  irrigation: string;
  icon: string;
}

interface WeatherCardProps {
  weatherData: WeatherData;
}

export default function WeatherCard({ weatherData }: WeatherCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Clima & Irrigação</Text>
        <Ionicons name={weatherData.icon as any} size={24} color="#46A56C" />
      </View>
      <View style={styles.weatherContainer}>
        <View style={styles.weatherInfo}>
          <Text style={styles.temperature}>{weatherData.temperature}°C</Text>
          <Text style={styles.condition}>{weatherData.condition}</Text>
          <Text style={styles.rainChance}>Chuva: {weatherData.rainChance}%</Text>
        </View>
        <View style={styles.irrigationSection}>
          <Text style={styles.irrigationLabel}>Irrigação</Text>
          <Text style={[
            styles.irrigationValue,
            { 
              color: weatherData.irrigation.includes('Essencial') ? '#e74c3c' : '#46A56C' 
            }
          ]}>
            {weatherData.irrigation}
          </Text>
        </View>
      </View>
    </View>
  );
} 