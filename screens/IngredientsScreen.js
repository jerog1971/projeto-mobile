import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function IngredientsScreen({ route, navigation }) {
  const { receitaCompleta } = route.params || {};
  const [grupos, setGrupos] = useState({});
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    if (receitaCompleta?.ingredientes) {
      const novoEstado = {};
      
      Object.entries(receitaCompleta.ingredientes).forEach(([titulo, lista]) => {
        novoEstado[titulo] = lista.map((ing, index) => ({
          id: `${titulo}-${index}`,
          name: ing,
          checked: false
        }));
      });
      
      setGrupos(novoEstado);
    }
  }, [receitaCompleta]);

  const toggleCheck = (categoria, id) => {
    setGrupos(prev => ({
      ...prev,
      [categoria]: prev[categoria].map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[styles.title, { color: colors.subtext }]}>Ingredientes para:</Text>
        <Text style={styles.recipeSubtitle}>{receitaCompleta?.nome}</Text>
        
        {Object.entries(grupos).map(([categoria, listaDeItens]) => (
          <View key={categoria} style={styles.categoriaContainer}>
            <View style={styles.badgeCategoria}>
              <Text style={styles.badgeText}>{categoria}</Text>
            </View>

            {listaDeItens.map(item => (
              <View 
                key={item.id} 
                style={[
                  styles.itemRow, 
                  { 
                    backgroundColor: colors.cardBackground, 
                    borderColor: colors.cardBorder 
                  }
                ]}
              >
                <Switch 
                  value={item.checked} 
                  onValueChange={() => toggleCheck(categoria, item.id)} 
                  trackColor={{ true: "#f4511e" }} 
                />
                <Text style={[
                  styles.itemText, 
                  { color: colors.text },
                  item.checked && { color: isDarkMode ? '#666' : '#aaa', textDecorationLine: 'line-through' }
                ]}>
                  {item.name}
                </Text>
              </View>
            ))}
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
    minHeight: Platform.OS === 'web' ? '100vh' : '100%' 
  },
  scrollView: { flex: 1 },
  scrollContent: { 
    padding: 20, 
    flexGrow: 1, 
    paddingBottom: 60 
  },
  title: { fontSize: 18 },
  recipeSubtitle: { fontSize: 24, fontWeight: 'bold', color: '#326696', marginBottom: 15 },
  categoriaContainer: {
    marginTop: 15,
    marginBottom: 10
  },
  badgeCategoria: {
    backgroundColor: '#326696',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase'
  },
  itemRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 4, 
    padding: 12, 
    borderRadius: 12,
    borderWidth: 1,
  },
  itemText: { marginLeft: 10, fontSize: 16, flex: 1 },
  button: { 
    backgroundColor: '#326696', 
    padding: 18, 
    borderRadius: 15, 
    marginTop: 30,
    marginBottom: 20 
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});
