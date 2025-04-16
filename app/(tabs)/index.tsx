import { StyleSheet, Platform, View, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import Logo from '@/components/ui/Logo';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.indexContainer}>

      <View style={styles.logoContainer}>
        <Logo style={styles.Logo}/>
      </View>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Conheça o app</ThemedText>
        <ThemedText type="subtitle">Descubra as hortas comunitárias mais próximas de você</ThemedText>
      </ThemedView>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].primary }]}
        onPress={() => {
          // Handle button press
        }}
        activeOpacity={0.8}
      >
        <ThemedText type="subtitle" style={{color: '#fff',}}>
            Seguinte
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  indexContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  Logo: {
    marginBottom: 52,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleContainer: {
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    paddingTop: 20,
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 72,
    width: 350,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
