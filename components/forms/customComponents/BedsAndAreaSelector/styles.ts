import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Layout compacto numa linha horizontal
  compactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  // Botões compactos para + e -
  compactButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#46A56C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactButtonDisabled: {
    backgroundColor: '#ddd',
  },
  compactButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  compactButtonTextDisabled: {
    color: '#999',
  },
  // Display da quantidade
  quantityDisplay: {
    minWidth: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  // Seletor de área (similar ao income selector)
  areaSelector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 8,
  },
  areaSelectorText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  // Modal para área
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  areaOptions: {
    maxHeight: 300,
    gap: 8,
  },
  areaOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  areaOptionSelected: {
    backgroundColor: '#f0f8f4',
    borderColor: '#46A56C',
  },
  areaOptionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  areaOptionTextSelected: {
    color: '#46A56C',
    fontWeight: '600',
  },
});

export default styles; 