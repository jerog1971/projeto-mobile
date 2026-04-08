import React from 'react';
// ADICIONADO: Platform aqui nos imports
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Platform } from 'react-native';

export default function ToolsScreen({ route, navigation }) {
  const { receitaCompleta } = route.params || {};
  const listaUtensilios = receitaCompleta?.utensilios || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Utensílios necessários</Text>
        <FlatList
          data={listaUtensilios}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 30 }}
          style={{ flex: 1 }} 
          renderItem={({ item }) => (
            <View style={styles.toolCard}>
              <Text style={styles.toolIcon}>🛠️</Text>
              <Text style={styles.toolName}>{item}</Text>
            </View>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Passo a Passo', { receitaCompleta })}>
          <Text style={styles.buttonText}>Ir para o Passo a Passo 👨‍🍳</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#fff',
    // Agora o Platform vai funcionar porque foi importado
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  container: { 
    flex: 1, 
    padding: 20,
    // No Web, precisamos garantir que o container não trave o scroll
    maxHeight: Platform.OS === 'web' ? '100vh' : undefined, 
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  toolCard: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#f5f5f5', borderRadius: 12, marginBottom: 10 },
  toolIcon: { fontSize: 24, marginRight: 15 },
  toolName: { fontSize: 18 },
  button: { backgroundColor: '#f4511e', padding: 18, borderRadius: 12, marginTop: 10 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
