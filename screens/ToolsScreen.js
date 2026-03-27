import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function ToolsScreen({ route, navigation }) {
  const { nomeReceita } = route.params || {};

  const tools = [
    { id: '1', name: 'Liquidificador', icon: '🌪️' },
    { id: '2', name: 'Forma Redonda', icon: '🎂' },
    { id: '3', name: 'Fritola/Espátula', icon: '🥄' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Utensílios necessários</Text>
      <Text style={styles.subtitle}>Para o seu {nomeReceita}:</Text>

      <FlatList
        data={tools}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.toolCard}>
            <Text style={styles.toolIcon}>{item.icon}</Text>
            <Text style={styles.toolName}>{item.name}</Text>
          </View>
        )}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Passo a Passo', { nomeReceita })}>
        <Text style={styles.buttonText}>Ir para o Passo a Passo 👨‍🍳</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  toolCard: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#eee', borderRadius: 10, marginBottom: 10 },
  toolIcon: { fontSize: 24, marginRight: 15 },
  toolName: { fontSize: 18 },
  button: { backgroundColor: '#f4511e', padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});