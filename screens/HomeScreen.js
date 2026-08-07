import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, SafeAreaView, Platform, Alert } from 'react-native';

const IMAGENS_LOCAIS = {
  'bolo_chocolate.jpg': require('./img/bolo_chocolate.jpg'),
  'bolo_fuba.jpg': require('./img/bolo_fuba.jpg'),
  'bolo_cenoura.jpg': require('./img/bolo_cenoura.jpg'),
  'bolo_laranja.jpg': require('./img/bolo_laranja.jpg'),
  'pao_de_queijo.jpg': require('./img/pao_de_queijo.jpg'),
  'bolo_caneca.jpg': require('./img/bolo_caneca.jpg'),
  'mousse_limao.jpg': require('./img/mousse_limao.jpg'),
};

const RECEITAS_INICIAIS = [
  { id: "1", nome: 'Bolo de Chocolate', img: 'bolo_chocolate.jpg', ingredientes: {"Massa":["3 Ovos", "Farinha"], "Cobertura":["Açúcar", "Farinha"], "Recheio": ["leite condensado", "granulado"]}, utensilios: ["Forno"], passos: {"Massa":["Bata os ingredientes", "Asse por 40 min"], "Cobertura":["Misture até formar um creme"], "Recheio":["Misture tudo", "Abra o bolo no meio", "Espalhe em toda a área", "Recoloque a parte de cima"]}, videoUrl: 'https://raw.githubusercontent.com/jerog1971/projeto-mobile/blob/main/videos/chocolate.mp4?raw=true' },
  { id: "2", nome: 'Bolo de Fubá', img: 'bolo_fuba.jpg', ingredientes: {"Massa":["Fubá", "Leite"], "Cobertura":["Leite de côco", "côco ralado", "creme de leite"], "Recheio":["creme chantili"]}, utensilios: ["Forno"], passos: {"Massa": ["Misture o fubá", "Leve ao forno quente"], "Cobertura":["Misture até virar um creme", "Cubra o bolo inteiro"], "Recheio":["Preencha o meio do bolo com o chantili"]}, videoUrl: 'https://raw.githubusercontent.com/jerog1971/projeto-mobile/blob/main/videos/fuba.mp4?raw=true' },
  { id: "3", nome: 'Bolo de Cenoura', img: 'bolo_cenoura.jpg', ingredientes: {"Massa":["Cenoura", "Óleo"], "Cobertura":["calda de chocolate"], "Recheio":["pudim de chocolate"]}, utensilios: ["Liquidificador"], passos: {"Massa":["Bata no liquidificador", "Asse e faça a cobertura"], "Cobertura":["Espalhe a calda sobre o bolo deixando escorrer"], "Recheio":["Coloque o pudimde chocolate no meio de bolo, depois de assado"]}, videoUrl: 'https://raw.githubusercontent.com/jerog1971/projeto-mobile/blob/main/videos/cenoura.mp4?raw=true' },
  { id: "4", nome: 'Bolo de Laranja', img: 'bolo_laranja.jpg', ingredientes: {"Massa":["Laranja", "Trigo"], "Cobertura":["suco de laranja em calda"], "Recheio": ["pedaços de chocolate"]}, utensilios: ["Forno"], passos:{"Massa":["Extraia o suco", "Misture com carinho e asse"], "Cobertura":["Despeje o suco em forma de calda sobre o bolo"], "Recheio":["Abra o bolo ao meio e espalhe gotas de chocolate ou chocolate em pedaços na massa"]}, videoUrl: 'https://raw.githubusercontent.com/jerog1971/projeto-mobile/blob/main/videos/laranja.mp4?raw=true' },
];

export default function HomeScreen({ navigation }) {
  const [receitas, setReceitas] = useState(RECEITAS_INICIAIS);
  const [carregando, setCarregando] = useState(false);

  const sincronizarReceitas = async () => {
    setCarregando(true);
    try {
      const response = await fetch('https://github.com/jerog1971/projeto-mobile/refs/heads/main/receitas.json');
      const receitasDoServidor = await response.json();
      const novas = receitasDoServidor.filter(resServidor => !receitas.some(resLocal => resLocal.id === resServidor.id));
      
      if (novas.length === 0) {
        alert("Você já possui todas as receitas disponíveis!");
      } else {
        setReceitas(prev => [...prev, ...novas]);
        alert("Novas receitas adicionadas com sucesso!");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  };

  const deletarReceita = (id) => {
    const confirmar = Platform.OS === 'web' ? window.confirm("Deseja remover?") : true;
    if (confirmar) {
      setReceitas(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.headerTitle}>Minhas Receitas 🍰</Text>
        
        <TouchableOpacity style={styles.btnSync} onPress={sincronizarReceitas} disabled={carregando}>
          {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Baixar Novidades ☁️</Text>}
        </TouchableOpacity>

        <View style={styles.vitrine}>
          {receitas.map((receita) => (
            <View key={receita.id} style={styles.cardContainer}>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Ingredientes', { receitaCompleta: receita })}>
                <Image source={IMAGENS_LOCAIS[receita.img] || { uri: receita.imgUrl }} style={styles.image} />
                <View style={styles.cardOverlay}>
                  <Text style={styles.recipeTitle}>{receita.nome}</Text>
                </View>
              </TouchableOpacity>
              {!["1", "2", "3", "4"].includes(receita.id) && (
                <TouchableOpacity style={styles.deleteBtn} onPress={() => deletarReceita(receita.id)}>
                  <Text style={styles.deleteText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#fff',
    // No Web, removemos a altura fixa do SafeArea e deixamos o corpo da página crescer
    height: Platform.OS === 'web' ? 'auto' : '100%', 
    minHeight: Platform.OS === 'web' ? '100vh' : '100%',
  },
  scrollView: { 
    flex: 1,
    // Força o navegador a mostrar a barra de rolagem se o conteúdo transbordar
    overflow: Platform.OS === 'web' ? 'visible' : 'scroll', 
  },
  scrollContent: { 
    flexGrow: 1, 
    paddingBottom: 100, 
    // Garante que o conteúdo não fique preso
    alignItems: 'stretch', 
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', padding: 20 },
  btnSync: { backgroundColor: '#326696', margin: 20, padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  vitrine: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-around', 
    padding: 10 
  },
  cardContainer: { width: '46%', marginBottom: 20, position: 'relative' },
  card: { width: '100%', height: 160, borderRadius: 15, overflow: 'hidden', backgroundColor: '#eee' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  cardOverlay: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', padding: 8 },
  recipeTitle: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 12 },
  deleteBtn: { position: 'absolute', top: -10, right: -10, backgroundColor: '#ff4444', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', zIndex: 99 },
  deleteText: { color: '#fff', fontWeight: 'bold' }
});
