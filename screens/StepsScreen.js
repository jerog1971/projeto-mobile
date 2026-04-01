import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function StepsScreen({ route, navigation }) {
  // 1. Recebemos o objeto completo da receita vindo da ToolsScreen
  const { receitaCompleta } = route.params || {};

  // 2. Pegamos a lista de passos. Se não existir, criamos uma lista padrão.
  const listaPassos = receitaCompleta?.passos || ["Prepare os ingredientes com carinho.", "Siga as instruções de preparo."];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Preparando {receitaCompleta?.nome || "sua receita"}</Text>
      
      {/* GIF animado para dar um clima de "mão na massa" */}
      <Image 
        source={{ uri: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3enZwMXgwMDBvdHFpazVrbWZiNnQwYnpkenBtaXh5d2VnNmhxZHc5MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JWSgfzUOcsPux6VVHe/giphy.gif' }} 
        style={styles.gif} 
      />

      {/* 3. Mapeamos a lista de passos para criar os cards dinamicamente */}
      {listaPassos.map((item, index) => (
        <View key={index} style={styles.stepCard}>
          <Text style={styles.stepNum}>PASSO {index + 1}</Text>
          <Text style={styles.stepText}>{item}</Text>
        </View>
      ))}

      {/* Botão para resetar o fluxo e voltar para a Home */}
      <TouchableOpacity 
        style={styles.homeButton} 
        onPress={() => navigation.popToTop()}>
        <Text style={styles.buttonText}>Finalizar e Voltar ao Início ✨</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#f4511e', marginBottom: 20 },
  gif: { width: '100%', height: 200, borderRadius: 15, marginBottom: 20 },
  stepCard: { 
    padding: 15, 
    backgroundColor: '#fdf2f0', 
    borderRadius: 10, 
    marginBottom: 15, 
    borderLeftWidth: 5, 
    borderLeftColor: '#f4511e',
    elevation: 2 
  },
  stepNum: { fontSize: 12, fontWeight: 'bold', color: '#f4511e' },
  stepText: { fontSize: 16, marginTop: 5, color: '#333', lineHeight: 22 },
  homeButton: { 
    backgroundColor: '#4CAF50', 
    padding: 18, 
    borderRadius: 12, 
    marginTop: 20, 
    marginBottom: 50, 
    elevation: 3 
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});
