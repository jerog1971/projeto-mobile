import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function IngredientsScreen({ route, navigation }) {
  // 1. Pegamos o objeto completo enviado pela Home
  const { receitaCompleta } = route.params || {};

  // 2. Estado para controlar a lista de ingredientes com o checkbox (Switch)
  const [items, setItems] = useState([]);

  // 3. Efeito para carregar os ingredientes assim que a tela abre
  useEffect(() => {
    if (receitaCompleta && receitaCompleta.ingredientes) {
      // Transformamos o Array de strings em um Array de objetos com 'checked'
      const dadosFormatados = receitaCompleta.ingredientes.map((ingrediente, index) => ({
        id: index.toString(),
        name: ingrediente,
        checked: false,
      }));
      setItems(dadosFormatados);
    }
  }, [receitaCompleta]);

  // 4. Função para marcar/desmarcar o ingrediente
  const toggleCheck = (id) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ingredientes para:</Text>
      <Text style={styles.recipeSubtitle}>{receitaCompleta?.nome || "Receita Selecionada"}</Text>
      
      {items.length > 0 ? (
        items.map(item => (
          <View key={item.id} style={styles.itemRow}>
            <Switch 
              value={item.checked} 
              onValueChange={() => toggleCheck(item.id)} 
              trackColor={{ false: "#767577", true: "#f4511e" }}
              thumbColor={item.checked ? "#fff" : "#f4f3f4"}
            />
            <Text style={[styles.itemText, item.checked && styles.checkedText]}>
              {item.name}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>Nenhum ingrediente encontrado.</Text>
      )}

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Utensílios', { receitaCompleta })}>
        <Text style={styles.buttonText}>Ver Utensílios 🥄</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, color: '#666' },
  recipeSubtitle: { fontSize: 24, fontWeight: 'bold', color: '#f4511e', marginBottom: 20 },
  itemRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 8, 
    padding: 12, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee'
  },
  itemText: { marginLeft: 10, fontSize: 18, color: '#333' },
  checkedText: { textDecorationLine: 'line-through', color: '#aaa' },
  emptyText: { textAlign: 'center', marginTop: 20, color: '#999' },
  button: { backgroundColor: '#f4511e', padding: 18, borderRadius: 12, marginTop: 30, marginBottom: 50, elevation: 3 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});