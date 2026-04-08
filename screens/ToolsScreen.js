import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

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
          // Importante para Web:
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
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  container: { 
    flex: 1, 
    padding: 20,
    // Garante que o conteúdo não "fuja" da tela
    maxHeight: Platform.OS === 'web' ? '100vh' : '100%', 
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  toolCard: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#f5f5f5', borderRadius: 12, marginBottom: 10 },
  toolIcon: { fontSize: 24, marginRight: 15 },
  toolName: { fontSize: 18 },
  button: { backgroundColor: '#f4511e', padding: 18, borderRadius: 12 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
