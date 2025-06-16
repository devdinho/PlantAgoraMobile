import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import { useBottomNav } from '../../../app/context/BottomNavContext';
import { router } from 'expo-router';

export default function BottomNav() {
  const { visible, selectedIndex, setSelectedIndex } = useBottomNav();

  if (!visible) return null;

  const navItems = [
    { icon: 'home', label: 'Início', route: '/home' },
    { icon: 'calendar-outline', label: 'Agenda', route: '/agenda' },
    { icon: 'notifications-outline', label: 'Notificações', route: '/notifications' },
    { icon: 'person-outline', label: 'Perfil', route: '/profile' },
  ];

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.navButton}
          onPress={() => {
              setSelectedIndex(index);
              router.push(item.route);
          }
        }>
          <Ionicons
            name={item.icon as any}
            size={24}
            color={selectedIndex === index ? '#0c8b56' : '#aaa'}
          />
          <Text style={[styles.navText, selectedIndex === index && styles.activeNavText]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
