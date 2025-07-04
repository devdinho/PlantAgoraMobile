import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

// Componentes
import {
  HomeHeader,
  SalesCard,
  GardenStatusCard,
  WeatherCard,
  NotificationsCard,
  QuickActions,
  AddSaleModal,
} from '../../components/ui';

// Hooks
import { useSalesData, useWeatherData, useHomeUtils, useUserData } from '../../hooks';

// Constantes
import {
  MOCK_GARDEN_DATA,
  MOCK_NOTIFICATIONS,
  URGENT_NOTIFICATIONS_COUNT,
  SEASI_CONTACT,
} from '../../constants/homeConstants';

// Estilos
import styles from './styles';

export default function Home() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  
  // Hooks
  const { salesData, addSale } = useSalesData();
  const { getCurrentWeather } = useWeatherData();
  const { getGreeting } = useHomeUtils();
  const { getUserDisplayName, loading: userLoading } = useUserData();

  const handleAddSale = (amount: number) => {
    const newSalesData = addSale(amount);
    
    Alert.alert(
      'Venda Adicionada!',
      `Valor: R$ ${amount.toFixed(2).replace('.', ',')}\nNovo total: R$ ${newSalesData.monthlyTotal.toFixed(2).replace('.', ',')}`
    );
  };

  const handleUpdateData = () => {
    Alert.alert(
      'Dados Atualizados',
      'Informações da horta foram atualizadas com sucesso!'
    );
  };

  const handleContactSeasi = () => {
    Alert.alert(
      'Contato SEASI',
      `Telefone: ${SEASI_CONTACT.phone}\nWhatsApp: ${SEASI_CONTACT.whatsapp}`,
      [
        { text: 'Fechar', style: 'cancel' },
        { text: 'Ligar', onPress: () => console.log('Ligar para SEASI') },
      ]
    );
  };

  const handleNotificationPress = () => {
    router.push('/notifications');
  };

  const handleViewAllNotifications = () => {
    router.push('/notifications');
  };

  // Exibe loading ou nome de fallback enquanto carrega os dados do usuário
  const displayName = userLoading ? 'Carregando...' : getUserDisplayName();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.content}>
          <HomeHeader
            greeting={getGreeting()}
            userName={displayName}
            urgentCount={URGENT_NOTIFICATIONS_COUNT}
            onNotificationPress={handleNotificationPress}
          />

          <SalesCard
            salesData={salesData}
            onAddSale={() => setModalVisible(true)}
          />

          <GardenStatusCard gardenData={MOCK_GARDEN_DATA} />

          <WeatherCard weatherData={getCurrentWeather()} />

          <NotificationsCard
            notifications={MOCK_NOTIFICATIONS}
            onViewAll={handleViewAllNotifications}
          />

          <QuickActions
            onUpdateData={handleUpdateData}
            onContactSeasi={handleContactSeasi}
          />
        </View>
      </ScrollView>

      <AddSaleModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddSale={handleAddSale}
      />
    </SafeAreaView>
  );
} 