import { Slot } from 'expo-router';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/ui/CustomToast';
import BottomNavProvider, { useBottomNav } from './context/BottomNavContext';
import BottomNav from '../components/ui/BottomNav';
import { useEffect } from 'react';

export default function Layout() {
  return (
    <BottomNavProvider>
      <LayoutContent />
    </BottomNavProvider>
  );
}

function LayoutContent() {
  const { setVisible } = useBottomNav();

  useEffect(() => {
    setVisible(false);
    return () => setVisible(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Slot />
      <Toast config={toastConfig} />
      <BottomNav />
    </>
  );
}
