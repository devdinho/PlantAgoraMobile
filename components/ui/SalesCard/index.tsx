import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

interface SalesData {
  monthlyTotal: number;
  dailyAverage: number;
  lastSale: number;
  target: number;
}

interface SalesCardProps {
  salesData: SalesData;
  onAddSale: () => void;
}

export default function SalesCard({ salesData, onAddSale }: SalesCardProps) {
  return (
    <View style={styles.salesCard}>
      <LinearGradient
        colors={['#46A56C', '#0c8b56']}
        style={styles.salesGradient}
      >
        <View style={styles.salesHeader}>
          <View>
            <Text style={styles.salesLabel}>Vendas do Mês</Text>
            <Text style={styles.salesValue}>
              R$ {salesData.monthlyTotal.toFixed(2).replace('.', ',')}
            </Text>
            <Text style={styles.salesTarget}>
              Meta: R$ {salesData.target.toFixed(2).replace('.', ',')}
            </Text>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${Math.min((salesData.monthlyTotal / salesData.target) * 100, 100)}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {Math.round((salesData.monthlyTotal / salesData.target) * 100)}% da meta
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addSaleButton}
            onPress={onAddSale}
          >
            <Ionicons name="add" size={24} color="#46A56C" />
          </TouchableOpacity>
        </View>
        <View style={styles.salesStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Média Diária</Text>
            <Text style={styles.statValue}>R$ {salesData.dailyAverage.toFixed(2).replace('.', ',')}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Última Venda</Text>
            <Text style={styles.statValue}>R$ {salesData.lastSale.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
} 