import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';

export default function IngredientsScreen({ route, navigation }) {
  const { receitaCompleta } = route.params || {};
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (receitaCompleta?.ingredientes) {
      setItems(receitaCompleta.ingredientes.map((ing, index) => ({ 
        id: index.toString(), 
        name: ing, 
        checked: false 
      })));
    }
  }, [receitaCompleta]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Ingredientes para:</Text>
        <Text style={styles.recipeSubtitle}>{receitaCompleta?.nome}</Text>
        
        {items.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <Switch 
              value={item.checked} 
              onValueChange={() => {
                setItems(prev => prev.map(i => i.id === item.id ? {...i, checked: !i.checked} : i));
              }} 
              trackColor={{ true: "#f4511e" }} 
            />
            <Text style={[styles.itemText, item.checked && styles.checkedText]}>
              {item.name}
            </Text>
          </View>
        ))}
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Utensílios', { receitaCompleta })}
        >
          <Text style={styles.buttonText}>Ver Utensílios 🥄</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#fff',
    minHeight: Platform.OS === 'web' ? '100vh' : '100%' 
  },
  scrollView: { flex: 1 },
  scrollContent: { 
    padding: 20, // MARGEM DESCOLADA AQUI
    flexGrow: 1, 
    paddingBottom: 60 
  },
  title: { fontSize: 18, color: '#666' },
  recipeSubtitle: { fontSize: 24, fontWeight: 'bold', color: '#f4511e', marginBottom: 20 },
  itemRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 8, 
    padding: 15, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee'
  },
  itemText: { marginLeft: 10, fontSize: 18, color: '#333', flex: 1 },
  checkedText: { textDecorationLine: 'line-through', color: '#aaa' },
  button: { 
    backgroundColor: '#f4511e', 
    padding: 18, 
    borderRadius: 15, 
    marginTop: 30,
    marginBottom: 20 
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});
