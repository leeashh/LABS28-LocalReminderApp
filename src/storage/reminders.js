import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'REMINDERS';

export async function getReminders() {
  const saved = await AsyncStorage.getItem(KEY);
  return saved ? JSON.parse(saved) : [];
}

export async function saveReminder(reminder) {
  const reminders = await getReminders();
  const updated = [...reminders, reminder];
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export async function deleteReminder(id) {
  const reminders = await getReminders();
  const updated = reminders.filter(r => r.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}
