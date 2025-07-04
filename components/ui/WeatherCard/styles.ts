import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Card base
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  // Weather Container
  weatherContainer: {
    gap: 16,
  },
  weatherInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#46A56C',
  },
  condition: {
    fontSize: 14,
    color: '#666',
  },
  rainChance: {
    fontSize: 14,
    color: '#666',
  },
  // Irrigation Section
  irrigationSection: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  irrigationLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  irrigationValue: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles; 