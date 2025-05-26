// app/_layout.tsx
import { Slot } from 'expo-router';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/ui/CustomToast';

export default function Layout() {
  return (
    <>
      <Slot />
      <Toast config={toastConfig} />
    </>
  );
}
