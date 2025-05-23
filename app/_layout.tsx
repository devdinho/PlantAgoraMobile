// app/_layout.tsx
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/ui/CustomToast';

export default function Layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast config={toastConfig}/>
    </>
  );
}
