import { WeatherData } from '../types';

export const useWeatherData = () => {
  const getCurrentWeather = (): WeatherData => {
    const hour = new Date().getHours();
    
    if (hour >= 5 && hour < 12) {
      return {
        temperature: Math.floor(Math.random() * 6) + 26,
        condition: 'Ensolarado',
        rainChance: Math.floor(Math.random() * 8),
        irrigation: 'Regar abundantemente',
        icon: 'sunny',
      };
    } else if (hour >= 12 && hour < 18) {
      return {
        temperature: Math.floor(Math.random() * 8) + 32,
        condition: 'Sol forte',
        rainChance: Math.floor(Math.random() * 5),
        irrigation: 'Essencial - regar abundantemente',
        icon: 'sunny',
      };
    } else {
      return {
        temperature: Math.floor(Math.random() * 8) + 22,
        condition: 'Céu limpo',
        rainChance: Math.floor(Math.random() * 10),
        irrigation: 'Irrigação noturna recomendada',
        icon: 'moon',
      };
    }
  };

  return {
    getCurrentWeather,
  };
}; 