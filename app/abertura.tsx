// import { StyleSheet, Platform, View, Text, TouchableOpacity } from 'react-native';

// import Logo from '@/components/ui/Logo';
// import { Colors } from '@/constants/Colors';
// import { useRouter } from 'expo-router';

// export default function OpenScreen() {
//   const router = useRouter();
//   return (
//     <View style={styles.indexContainer}>
//       <View style={styles.logoContainer}>
//         <Logo style={styles.Logo} />
//       </View>

//       <View style={styles.titleContainer}>
//         <Text style={styles.title}>Conheça o app</Text>
//         <Text style={styles.subtitle}>Descubra as hortas comunitárias mais próximas de você</Text>
//       </View>

//       {/* Botão Entrar */}
//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: Colors.light.primary }]}
//         onPress={() => router.push('/login')}
//         activeOpacity={0.8}
//       >
//         <Text style={styles.buttonText}>Entrar</Text>
//       </TouchableOpacity>

//       {/* Botão Cadastrar */}
//       <TouchableOpacity
//         style={[styles.button, styles.registerButton]} // Alterações específicas para o botão de cadastro
//         onPress={() => router.push('/register')}
//         activeOpacity={0.8}
//       >
//         <Text style={styles.registerButtonText}>Cadastrar</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   indexContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   Logo: {
//     marginBottom: 52,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 10,
//   },
//   titleContainer: {
//     marginTop: Platform.OS === 'ios' ? 40 : 30,
//     paddingTop: 20,
//     marginHorizontal: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#555',
//     textAlign: 'center',
//   },
//   button: {
//     paddingVertical: 12,
//     borderRadius: 5,
//     marginTop: 16, // Reduzido para aproximar os botões
//     width: 350,
//     height: 56,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   registerButton: {
//     backgroundColor: '#fff', // Fundo branco para o botão de cadastro
//     borderColor: Colors.light.primary, // Borda verde
//     borderWidth: 2, // Largura da borda
//     marginTop: 16, // Ajuste de espaçamento entre os botões
//   },
//   registerButtonText: {
//     color: Colors.light.primary, // Texto verde para o botão de cadastro
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
