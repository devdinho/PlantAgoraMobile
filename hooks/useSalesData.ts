import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SalesData } from '../types';

const STORAGE_KEY = 'salesData';

export const useSalesData = () => {
  const [salesData, setSalesData] = useState<SalesData>({
    monthlyTotal: 0,
    dailyAverage: 0,
    lastSale: 0,
    target: 5000,
  });

  const loadSalesData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        setSalesData(parsed);
      }
    } catch (error) {
      console.error('Erro ao carregar dados de vendas:', error);
    }
  };

  const saveSalesData = async (data: SalesData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar dados de vendas:', error);
    }
  };

  const addSale = (amount: number): SalesData => {
    const currentDay = new Date().getDate();
    const newTotal = salesData.monthlyTotal + amount;
    const newDailyAverage = newTotal / currentDay;
    
    const newSalesData: SalesData = {
      ...salesData,
      monthlyTotal: newTotal,
      dailyAverage: newDailyAverage,
      lastSale: amount,
    };
    
    setSalesData(newSalesData);
    saveSalesData(newSalesData);
    
    return newSalesData;
  };

  useEffect(() => {
    loadSalesData();
  }, []);

  return {
    salesData,
    addSale,
  };
}; 