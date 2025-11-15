import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { deleteReminder } from '../storage/reminders';

export default function ReminderItem({ item, onDelete }) {
  
  const remove = async () => {
    await Notifications.cancelScheduledNotificationAsync(item.id);
    const updated = await deleteReminder(item.id);
    onDelete(updated);
  };

  return (
    <View style={{ 
      padding: 10, 
      borderWidth: 1, 
      marginVertical: 5,
      borderRadius: 5 
    }}>
      <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
      <Text>Se activará en: {item.seconds} segundos</Text>
      <Button title="Eliminar" onPress={remove} color="red" />
    </View>
  );
}
