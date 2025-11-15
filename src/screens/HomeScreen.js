import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ReminderForm from '../components/ReminderForm';
import ReminderItem from '../components/ReminderItem';
import { getReminders } from '../storage/reminders';

export default function HomeScreen() {

  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const items = await getReminders();
    setReminders(items);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15 }}>
        LocalReminderApp
      </Text>

      <ReminderForm onSave={setReminders} />

      <Text style={{ fontSize: 18, marginBottom: 10 }}>Recordatorios:</Text>
      
      {reminders.length === 0 ? (
        <Text>No hay recordatorios creados.</Text>
      ) : (
        reminders.map((item) => (
          <ReminderItem 
            key={item.id} 
            item={item} 
            onDelete={setReminders} 
          />
        ))
      )}
    </ScrollView>
  );
}
