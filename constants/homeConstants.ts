import { GardenStatusData, NotificationData } from '../types';

// Dados simulados para a home
export const MOCK_GARDEN_DATA: GardenStatusData = {
  plantsCount: 8,
  activeCrops: 5,
  nextHarvest: 'Alface - 3 dias',
};

export const MOCK_NOTIFICATIONS: NotificationData[] = [
  {
    id: '1',
    title: 'Assistência Técnica',
    message: 'Visita agendada para amanhã às 9h',
    read: false,
    type: 'assistencia',
  },
  {
    id: '2',
    title: 'Insumos Disponíveis',
    message: 'Sementes de tomate disponíveis para retirada',
    read: true,
    type: 'insumos',
  },
  {
    id: '3',
    title: 'Atualização de Dados',
    message: 'Favor atualizar informações da horta',
    read: false,
    type: 'dados',
  },
];

export const URGENT_NOTIFICATIONS_COUNT = 2;

export const SEASI_CONTACT = {
  phone: '(63) 3218-7000',
  whatsapp: '(63) 99999-9999',
}; 