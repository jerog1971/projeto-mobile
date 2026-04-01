import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

// Receitas que já começam no App (Locais)
const RECEITAS_PADRAO = [
  { 
    id: 1, 
    nome: 'Bolo de Chocolate', 
    img: require('./img/bolo_chocolate.jpg'),
    ingredientes: ["3 Ovos", "2 xícaras de Farinha", "1 xícara de Açúcar", "1 xícara de Chocolate em pó"],
    utensilios: ["Batedeira", "Forma redonda", "Forno"],
    passos: ["Bata os ovos com açúcar", "Adicione a farinha e chocolate", "Asse por 40 min"]
  },
  { 
    id: 2, 
    nome: 'Bolo de Fubá', 
    img: require('./img/bolo_fuba.jpg'),
    ingredientes: ["2 xícaras de Fubá", "1 xícara de Leite", "3 Ovos", "1 xícara de Óleo"],
    utensilios: ["Liquidificador", "Forma com furo", "Forno"],
    passos: ["Bata tudo no liquidificador", "Despeje na forma untada", "Asse até dourar"]
  },
  { 
    id: 3, 
    nome: 'Bolo de Cenoura', 
    img: require('./img/bolo_cenoura.jpg'),
    ingredientes: ["3 Cenouras", "3 Ovos", "1 xícara de Óleo", "2 xícaras de Açúcar"],
    utensilios: ["Liquidificador", "Tigela", "Forno"],
    passos: ["Bata a cenoura com óleo e ovos", "Misture com o açúcar e farinha em uma tigela", "Asse por 40 min"]
  },
  { 
    id: 4, 
    nome: 'Bolo de Laranja', 
    img: require('./img/bolo_laranja.jpg'),
    ingredientes: ["1 Laranja inteira (sem sementes)", "3 Ovos", "2 xícaras de Farinha", "1 xícara de Açúcar"],
    utensilios: ["Liquidificador", "Peneira", "Forno"],
    passos: ["Bata a laranja com ovos e óleo", "Misture os secos", "Leve ao forno médio"]
  },
];

export default function HomeScreen({ navigation }) {
  const [receitas, setReceitas] = useState(RECEITAS_PADRAO);
  const [carregando, setCarregando] = useState(false);

  // FUNÇÃO 1: Baixar do GitHub
  const baixarNovasReceitas = async () => {
    setCarregando(true);
    try {
      const response = await fetch('https://raw.githubusercontent.com/jerog1971/projeto-mobile/refs/heads/main/receitas.json');
      const dadosNovos = await response.json();

      // Filtramos para não adicionar receitas que já existem (pelo ID)
      const receitasFiltradas = dadosNovos.filter(nova => 
        !receitas.some(atual => atual.id === nova.id)
      );

      if (receitasFiltradas.length === 0) {
        Alert.alert("Aviso", "Você já tem todas as receitas do servidor!");
      } else {
        setReceitas([...receitas, ...receitasFiltradas]);
        Alert.alert("Sucesso", `${receitasFiltradas.length} nova(s) receita(s) baixada(s)!`);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao GitHub.");
    } finally {
      setCarregando(false);
    }
  };

  // FUNÇÃO 2: Deletar da Lista
  const deletarReceita = (id) => {
    Alert.alert(
      "Excluir", 
      "Deseja remover esta receita?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Remover", 
          onPress: () => {
            const novaLista = receitas.filter(r => r.id !== id);
            setReceitas(novaLista);
          },
          style: "destructive" 
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Minhas Receitas 🍰</Text>
      <Text style={styles.headerSubtitle}>Escolha o que preparar hoje:</Text>

      <TouchableOpacity 
        style={styles.btnDownload} 
        onPress={baixarNovasReceitas}
        disabled={carregando}
      >
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.btnText}>Baixar Novas Receitas ☁️</Text>
        )}
      </TouchableOpacity>

      <View style={styles.vitrine}>
        {receitas.map((receita) => (
          <View key={receita.id} style={styles.cardContainer}>
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('Ingredientes', { receitaCompleta: receita })}
            >
              <Image 
                source={typeof receita.img === 'number' ? receita.img : { uri: receita.img }} 
                style={styles.image} 
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.recipeTitle}>{receita.nome}</Text>
              </View>
            </TouchableOpacity>

            {/* Ícone de Lixeira */}
            <TouchableOpacity 
              style={styles.deleteBtn} 
              onPress={() => deletarReceita(receita.id)}
            >
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 20, color: '#333' },
  headerSubtitle: { fontSize: 16, color: '#888', paddingHorizontal: 20, marginBottom: 10 },
  btnDownload: { backgroundColor: '#f4511e', margin: 20, padding: 15, borderRadius: 10, alignItems: 'center', elevation: 3 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  vitrine: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', paddingHorizontal: 10 },
  cardContainer: { width: '45%', marginBottom: 20, position: 'relative' },
  card: { width: '100%', height: 180, backgroundColor: '#fff', borderRadius: 15, overflow: 'hidden', elevation: 5 },
  image: { width: '100%', height: '100%' },
  cardOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10 },
  recipeTitle: { color: '#fff', fontWeight: 'bold', fontSize: 13, textAlign: 'center' },
  deleteBtn: { 
    position: 'absolute', top: -5, right: -5, backgroundColor: '#ff4444', 
    width: 28, height: 28, borderRadius: 14, justifyContent: 'center', 
    alignItems: 'center', elevation: 7, zIndex: 10 
  },
  deleteText: { color: 'white', fontWeight: 'bold', fontSize: 14 }
});
