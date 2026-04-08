import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

export default function IngredientsScreen({ route, navigation }) {
  const { receitaCompleta } = route.params || {};
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (receitaCompleta?.ingredientes) {
      setItems(receitaCompleta.ingredientes.map((ing, index) => ({ id: index.toString(), name: ing, checked: false })));
    }
  }, [receitaCompleta]);

  const toggleCheck = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Ingredientes para:</Text>
        <Text style={styles.recipeSubtitle}>{receitaCompleta?.nome}</Text>
        {items.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <Switch value={item.checked} onValueChange={() => toggleCheck(item.id)} trackColor={{ true: "#f4511e" }} />
            <Text style={[styles.itemText, item.checked && styles.checkedText]}>{item.name}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Utensílios', { receitaCompleta })}>
          <Text style={styles.buttonText}>Ver Utensílios 🥄</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: 20, flexGrow: 1, paddingBottom: 40 },
  title: { fontSize: 18, color: '#666' },
  recipeSubtitle: { fontSize: 24, fontWeight: 'bold', color: '#f4511e', marginBottom: 20 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 8, padding: 12, backgroundColor: '#f9f9f9', borderRadius: 10 },
  itemText: { marginLeft: 10, fontSize: 18 },
  checkedText: { textDecorationLine: 'line-through', color: '#aaa' },
  button: { backgroundColor: '#f4511e', padding: 18, borderRadius: 12, marginTop: 30 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
