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
  // Status Container
  statusContainer: {
    gap: 16,
  },
  statusSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statusItem: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#46A56C',
  },
  // Harvest Section
  harvestSection: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  harvestLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  harvestValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#46A56C',
  },
});

export default styles; 