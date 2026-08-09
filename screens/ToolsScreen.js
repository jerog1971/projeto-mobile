import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function ToolsScreen({ route, navigation }) {
  const { receitaCompleta } = route.params || {};
  const listaUtensilios = receitaCompleta?.utensilios || [];
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Utensílios necessários</Text>
      <Text style={[styles.subtitle, { color: colors.subtext }]}>Para o seu {receitaCompleta?.nome || "prato"}:</Text>

      <FlatList
        data={listaUtensilios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.toolCard, { backgroundColor: colors.cardBackground, borderColor: colors.cardBorder }]}>
            <Text style={styles.toolIcon}>🛠️</Text>
            <Text style={[styles.toolName, { color: colors.text }]}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.subtext }]}>Nenhum utensílio específico listado.</Text>
        }
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Passo a Passo', { receitaCompleta })}>
        <Text style={styles.buttonText}>Ir para o Passo a Passo 👨‍🍳</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginBottom: 20 },
  toolCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10,
    borderWidth: 1,
  },
  toolIcon: { fontSize: 24, marginRight: 15 },
  toolName: { fontSize: 18 },
  emptyText: { textAlign: 'center', marginTop: 20 },
  button: { 
    backgroundColor: '#326696', 
    padding: 18, 
    borderRadius: 12, 
    marginTop: 20,
    elevation: 3
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});
