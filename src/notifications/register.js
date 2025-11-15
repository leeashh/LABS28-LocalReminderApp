import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export default async function registerForNotificationsAsync() {
  if (!Device.isDevice) {
    alert('Las notificaciones solo funcionan en dispositivo físico');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Permiso de notificaciones denegado.');
    return;
  }
}
