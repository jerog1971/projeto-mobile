import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

// 1. DICIONÁRIO DE IMAGENS (Para as receitas que virão do JSON)
const IMAGENS_EXTERNAS = {
  'pao_de_queijo.jpg': require('./img/pao_de_queijo.jpg'), // ajuste o nome do arquivo se necessário
  'mousse_limao.jpg': require('./img/mousse_limao.jpg'), // usando chocolate como exemplo se não tiver a do limão
};

const RECEITAS_PADRAO = [
  { 
    id: 1, nome: 'Bolo de Chocolate', img: require('./img/bolo_chocolate.jpg'),
    ingredientes: ["3 Ovos", "2 xícaras de Farinha", "1 xícara de Açúcar"],
    utensilios: ["Batedeira", "Forno"], passos: ["Bata tudo", "Asse por 40min"]
  },
  { 
    id: 2, nome: 'Bolo de Fubá', img: require('./img/bolo_fuba.jpg'),
    ingredientes: ["2 xícaras de Fubá", "1 xícara de Leite"],
    utensilios: ["Liquidificador", "Forno"], passos: ["Bata o milho", "Asse"]
  },
  { 
    id: 3, nome: 'Bolo de Cenoura', img: require('./img/bolo_cenoura.jpg'),
    ingredientes: ["3 Cenouras", "1 xícara de Óleo"],
    utensilios: ["Liquidificador", "Forno"], passos: ["Bata a cenoura", "Asse"]
  },
  { 
    id: 4, nome: 'Bolo de Laranja', img: require('./img/bolo_laranja.jpg'),
    ingredientes: ["1 Laranja", "2 xícaras de Farinha"],
    utensilios: ["Liquidificador", "Forno"], passos: ["Bata a laranja", "Asse"]
  },
];

export default function HomeScreen({ navigation }) {
  const [receitas, setReceitas] = useState(RECEITAS_PADRAO);
  const [carregando, setCarregando] = useState(false);

  const baixarNovasReceitas = async () => {
    setCarregando(true);
    try {
      const response = await fetch('https://raw.githubusercontent.com/jerog1971/projeto-mobile/refs/heads/main/receitas.json');
      const dadosNovos = await response.json();

      const receitasFiltradas = dadosNovos.filter(nova => 
        !receitas.some(atual => atual.id === nova.id)
      );

      if (receitasFiltradas.length === 0) {
        Alert.alert("Aviso", "As receitas do evento já foram baixadas!");
      } else {
        setReceitas([...receitas, ...receitasFiltradas]);
        Alert.alert("Sucesso", "Novas receitas de convidados adicionadas!");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao conectar com o servidor do GitHub.");
    } finally {
      setCarregando(false);
    }
  };

 // FUNÇÃO 2: Deletar da Lista com Confirmação
  const deletarReceita = (id) => {
    Alert.alert(
      "Confirmar Exclusão", // Título
      "Tem certeza que deseja remover esta receita da sua lista?", // Mensagem
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel"
        },
        { 
          text: "Sim, Remover", 
          onPress: () => {
            const novaLista = receitas.filter(r => r.id !== id);
            setReceitas(novaLista);
          },
          style: "destructive" // No iOS, o texto fica vermelho
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Minhas Receitas 🍰</Text>
      <Text style={styles.headerSubtitle}>Escolha o que preparar hoje:</Text>

      <TouchableOpacity style={styles.btnDownload} onPress={baixarNovasReceitas} disabled={carregando}>
        {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Baixar Receitas do Evento ☁️</Text>}
      </TouchableOpacity>

      <View style={styles.vitrine}>
        {receitas.map((receita) => (
          <View key={receita.id} style={styles.cardContainer}>
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('Ingredientes', { receitaCompleta: receita })}
            >
              <Image 
                source={
                  typeof receita.img === 'number' 
                  ? receita.img 
                  : IMAGENS_EXTERNAS[receita.img]
                } 
                style={styles.image} 
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.recipeTitle}>{receita.nome}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={() => deletarReceita(receita.id)}>
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ... (estilos permanecem os mesmos que enviei anteriormente)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', paddingHorizontal: 20, paddingTop: 20, color: '#333' },
  headerSubtitle: { fontSize: 16, color: '#888', paddingHorizontal: 20, marginBottom: 10 },
  btnDownload: { backgroundColor: '#f4511e', margin: 20, padding: 15, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  vitrine: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', paddingHorizontal: 10 },
  cardContainer: { width: '45%', marginBottom: 20 },
  card: { width: '100%', height: 180, borderRadius: 15, overflow: 'hidden', elevation: 5 },
  image: { width: '100%', height: '100%' },
  cardOverlay: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.6)', padding: 10 },
  recipeTitle: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 12 },
  deleteBtn: { position: 'absolute', top: -5, right: -5, backgroundColor: 'red', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  deleteText: { color: 'white', fontWeight: 'bold' }
});
