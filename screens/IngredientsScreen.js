import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function IngredientsScreen({ route, navigation }) {
  // Pegando o nome da receita enviado pela Home
  const { nomeReceita } = route.params || { nomeReceita: 'Receita' };

  const [items, setItems] = useState([
    { id: '1', name: '3 Ovos', checked: false },
    { id: '2', name: '2 xícaras de Farinha', checked: false },
    { id: '3', name: '1 xícara de Açúcar', checked: false },
    { id: '4', name: 'Leite ou Suco', checked: false },
  ]);

  const toggleCheck = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ingredientes para:</Text>
      <Text style={styles.recipeSubtitle}>{nomeReceita}</Text>
      
      {items.map(item => (
        <View key={item.id} style={styles.itemRow}>
          <Switch 
            value={item.checked} 
            onValueChange={() => toggleCheck(item.id)} 
            trackColor={{ false: "#767577", true: "#f4511e" }}
          />
          <Text style={[styles.itemText, item.checked && styles.checkedText]}>{item.name}</Text>
        </View>
      ))}

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Utensílios', { nomeReceita })}>
        <Text style={styles.buttonText}>Ver Utensílios 🥄</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, color: '#666' },
  recipeSubtitle: { fontSize: 24, fontWeight: 'bold', color: '#f4511e', marginBottom: 20 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 },
  itemText: { marginLeft: 10, fontSize: 18 },
  checkedText: { textDecorationLine: 'line-through', color: '#aaa' },
  button: { backgroundColor: '#f4511e', padding: 15, borderRadius: 10, marginTop: 30, marginBottom: 30 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});