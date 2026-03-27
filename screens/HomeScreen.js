import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  // Lista de receitas agora usando imagens locais com 'require'
  const receitas = [
    { id: 1, nome: 'Bolo de Chocolate', img: require('./img/bolo_chocolate.jpg') },
    { id: 2, nome: 'Bolo de Fubá', img: require('./img/bolo_fuba.jpg') },
    { id: 3, nome: 'Bolo de Cenoura', img: require('./img/bolo_cenoura.jpg') },
    { id: 4, nome: 'Bolo de Laranja', img: require('./img/bolo_laranja.jpg') },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Minhas Receitas 🍰</Text>
      <Text style={styles.headerSubtitle}>Escolha o que preparar hoje:</Text>

      <View style={styles.vitrine}>
        {receitas.map((receita) => (
          <TouchableOpacity 
            key={receita.id} 
            style={styles.card}
            onPress={() => navigation.navigate('Ingredientes', { nomeReceita: receita.nome })}
          >
            {/* Usamos a propriedade 'img' diretamente, sem o {{ uri: ... }} */}
            <Image source={receita.img} style={styles.image} resizeMode="cover" />
            
            <View style={styles.cardOverlay}>
              <Text style={styles.recipeTitle}>{receita.nome}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 20, color: '#333' },
  headerSubtitle: { fontSize: 16, color: '#888', paddingHorizontal: 20, marginBottom: 20 },
  vitrine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  card: {
    width: '45%',
    height: 180, // Um pouco menor para garantir que caiba bem
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  image: { width: '100%', height: '100%' },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  recipeTitle: { color: '#fff', fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
});