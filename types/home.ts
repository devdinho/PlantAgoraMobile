export interface SalesData {
  monthlyTotal: number;
  dailyAverage: number;
  lastSale: number;
  target: number;
}

export interface GardenStatusData {
  plantsCount: number;
  activeCrops: number;
  nextHarvest: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  rainChance: number;
  irrigation: string;
  icon: string;
}

export interface NotificationData {
  id: string;
  title: string;
  message: string;
  read: boolean;
  type: 'assistencia' | 'insumos' | 'dados' | 'capacitacao' | 'financeiro';
} 