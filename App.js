import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import HomeScreen from './src/screens/HomeScreen';
import registerForNotificationsAsync from './src/notifications/register';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {

  useEffect(() => {
    registerForNotificationsAsync();
  }, []);

  return <HomeScreen />;
}
