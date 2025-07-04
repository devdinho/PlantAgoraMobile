import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ddd',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#46A56C',
    borderColor: '#46A56C',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    lineHeight: 20,
  },
});

export default styles; 