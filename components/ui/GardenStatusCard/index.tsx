import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

interface GardenStatusData {
  plantsCount: number;
  activeCrops: number;
  nextHarvest: string;
}

interface GardenStatusCardProps {
  gardenData: GardenStatusData;
}

export default function GardenStatusCard({ gardenData }: GardenStatusCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Status da Horta</Text>
        <Ionicons name="leaf" size={24} color="#46A56C" />
      </View>
      <View style={styles.statusContainer}>
        <View style={styles.statusSection}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Canteiros Plantados</Text>
            <Text style={styles.statusValue}>{gardenData.plantsCount}/12</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Culturas Ativas</Text>
            <Text style={styles.statusValue}>{gardenData.activeCrops} tipos</Text>
          </View>
        </View>
        <View style={styles.harvestSection}>
          <Text style={styles.harvestLabel}>Próxima Colheita</Text>
          <Text style={styles.harvestValue}>{gardenData.nextHarvest}</Text>
        </View>
      </View>
    </View>
  );
} 