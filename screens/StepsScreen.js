import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

export default function StepsScreen({ route, navigation }) {
  const { nomeReceita } = route.params || {};

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Preparando {nomeReceita}</Text>
      
      <Image 
        source={{ uri: 'https://media.giphy.com/media/l41lTjJp0N8HnZz9S/giphy.gif' }} 
        style={styles.gif} 
      />

      <View style={styles.stepCard}>
        <Text style={styles.stepNum}>PASSO 1</Text>
        <Text style={styles.stepText}>Misture os ingredientes líquidos primeiro e bata bem no liquidificador.</Text>
      </View>

      <View style={styles.stepCard}>
        <Text style={styles.stepNum}>PASSO 2</Text>
        <Text style={styles.stepText}>Adicione a farinha e o fermento aos poucos, mexendo com cuidado.</Text>
      </View>

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
  stepCard: { padding: 15, backgroundColor: '#fdf2f0', borderRadius: 10, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#f4511e' },
  stepNum: { fontSize: 12, fontWeight: 'bold', color: '#f4511e' },
  stepText: { fontSize: 16, marginTop: 5 },
  homeButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10, marginTop: 20, marginBottom: 40 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});