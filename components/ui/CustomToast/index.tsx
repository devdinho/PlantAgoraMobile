// components/CustomToast.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <View style={styles.toastContainer}>
      <Text style={styles.title}>{text1}</Text>
      <Text style={styles.message}>{text2}</Text>
    </View>
  ),
  error: ({ text1, text2 }: any) => (
    <View style={[styles.toastContainer, { borderLeftColor: '#F44336' }]}>
      <Text style={styles.title}>{text1}</Text>
      <Text style={styles.message}>{text2}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: '#fff',
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
    width: '95%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  message: {
    fontSize: 14,
    color: '#333',
    flexWrap: 'wrap',
  },
});
