import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import { saveReminder } from '../storage/reminders';

export default function ReminderForm({ onSave }) {
  const [title, setTitle] = useState('');
  const [seconds, setSeconds] = useState('');

  const scheduleNotification = async () => {
    if (!title.trim() || !seconds) {
      alert("Completa todos los campos");
      return;
    }

    const secs = parseInt(seconds);

    if (isNaN(secs) || secs <= 0) {
      alert("Los segundos deben ser un número mayor a 0");
      return;
    }

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: `Recordatorio: ${title}`
      },
      trigger: {
        seconds: secs,
        repeats: false
      }
    });

    const reminder = {
      id,
      title,
      seconds: secs,
      createdAt: Date.now()
    };

    const updatedList = await saveReminder(reminder);
    onSave(updatedList);

    setTitle('');
    setSeconds('');
    alert("Recordatorio programado");
  };

  return (
    <View style={{ padding: 15, borderWidth: 1, marginBottom: 20 }}>
      <Text style={{ fontWeight: 'bold' }}>Crear Recordatorio</Text>

      <Text>Título:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Ej: Tomar agua"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Text>Tiempo en segundos:</Text>
      <TextInput
        value={seconds}
        onChangeText={setSeconds}
        placeholder="Ej: 60"
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />

      <Button title="Programar" onPress={scheduleNotification} />
    </View>
  );
}
