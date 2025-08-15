import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function App() {
  const [items, setItems] = useState('');
  const [result, setResult] = useState(null);

  const findStore = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/find-store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.split(',').map(i => i.trim()) })
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grocery Deal Finder</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter items separated by commas"
        value={items}
        onChangeText={setItems}
      />
      <Button title="Find Cheapest Store" onPress={findStore} />
      {result && <Text style={styles.result}>Cheapest Store: {result.store} - Total: ${result.total}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 20 },
  result: { marginTop: 20, fontSize: 18, textAlign: 'center' }
});
