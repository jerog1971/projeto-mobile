import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';

export default function ToolsScreen({ route, navigation }) {
  const { receitaCompleta } = route.params || {};
  const listaUtensilios = receitaCompleta?.utensilios || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Utensílios necessários</Text>
        
        {listaUtensilios.map((item, index) => (
          <View key={index} style={styles.toolCard}>
            <View style={styles.iconCircle}>
              <Text style={styles.toolIcon}>🛠️</Text>
            </View>
            <Text style={styles.toolName}>{item}</Text>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Passo a Passo', { receitaCompleta })}
        >
          <Text style={styles.buttonText}>Ir para o Passo a Passo 👨‍🍳</Text>
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
    padding: 25, // MARGEM DESCOLADA AQUI
    flexGrow: 1, 
    paddingBottom: 80 
  },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 25, color: '#333' },
  toolCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 15, 
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee'
  },
  iconCircle: {
    width: 45,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    elevation: 2
  },
  toolIcon: { fontSize: 20 },
  toolName: { fontSize: 18, color: '#444', fontWeight: '500' },
  button: { 
    backgroundColor: '#f4511e', 
    padding: 18, 
    borderRadius: 15, 
    marginTop: 20 
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});
