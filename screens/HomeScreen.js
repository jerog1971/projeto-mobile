import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

// Dicionário de Imagens (Certifique-se que os nomes batem com os arquivos na pasta /img)
const IMAGENS_LOCAIS = {
  'bolo_chocolate.jpg': require('./img/bolo_chocolate.jpg'),
  'bolo_fuba.jpg': require('./img/bolo_fuba.jpg'),
  'bolo_cenoura.jpg': require('./img/bolo_cenoura.jpg'),
  'bolo_laranja.jpg': require('./img/bolo_laranja.jpg'),
  'pao_de_queijo.jpg': require('./img/pao_de_queijo.jpg'), // ajuste se houver erro de digitação no nome
  'mousse_limao.jpg': require('./img/mousse_limao.jpg'),
};

const RECEITAS_INICIAIS = [
  { id: "1", nome: 'Bolo de Chocolate', img: 'bolo_chocolate.jpg', ingredientes: ["3 Ovos", "Farinha"], utensilios: ["Forno"], passos: ["Bata", "Asse"] },
  { id: "2", nome: 'Bolo de Fubá', img: 'bolo_fuba.jpg', ingredientes: ["Fubá", "Leite"], utensilios: ["Forno"], passos: ["Misture", "Asse"] },
  { id: "3", nome: 'Bolo de Cenoura', img: 'bolo_cenoura.jpg', ingredientes: ["Cenoura", "Óleo"], utensilios: ["Liquidificador"], passos: ["Bata", "Asse"] },
  { id: "4", nome: 'Bolo de Laranja', img: 'bolo_laranja.jpg', ingredientes: ["Laranja", "Trigo"], utensilios: ["Forno"], passos: ["Bata", "Asse"] },
];

export default function HomeScreen({ navigation }) {
  const [receitas, setReceitas] = useState(RECEITAS_INICIAIS);
  const [carregando, setCarregando] = useState(false);

  const sincronizarReceitas = async () => {
    setCarregando(true);
    try {
      const response = await fetch('https://raw.githubusercontent.com/jerog1971/projeto-mobile/refs/heads/main/receitas.json');
      const receitasDoServidor = await response.json();

      const novasParaAdicionar = receitasDoServidor.filter(resServidor => 
        !receitas.some(resLocal => resLocal.id === resServidor.id)
      );

      if (novasParaAdicionar.length === 0) {
        Alert.alert("Sincronizado", "Você já possui todas as receitas disponíveis!");
      } else {
        setReceitas([...receitas, ...novasParaAdicionar]);
        Alert.alert("Sucesso", "Novas receitas adicionadas com sucesso!");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  };

  const deletarReceita = (id) => {
    Alert.alert("Excluir", "Deseja remover esta receita?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Remover", onPress: () => setReceitas(receitas.filter(r => r.id !== id)), style: "destructive" }
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Minhas Receitas 🍰</Text>
      <Text style={styles.headerSubtitle}>Receitas fixas e novidades da nuvem</Text>

      <TouchableOpacity style={styles.btnSync} onPress={sincronizarReceitas} disabled={carregando}>
        {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Baixar Novidades ☁️</Text>}
      </TouchableOpacity>

      <View style={styles.vitrine}>
        {receitas.map((receita) => (
          <View key={receita.id} style={styles.cardContainer}>
            <TouchableOpacity 
              style={styles.card}
              onPress={() => navigation.navigate('Ingredientes', { receitaCompleta: receita })}
            >
              <Image source={IMAGENS_LOCAIS[receita.img]} style={styles.image} />
              <View style={styles.cardOverlay}>
                <Text style={styles.recipeTitle}>{receita.nome}</Text>
              </View>
            </TouchableOpacity>

            {/* TRAVA DE SEGURANÇA: Só mostra o botão 'X' se o ID não for 1, 2, 3 ou 4 */}
            { !["1", "2", "3", "4"].includes(receita.id) && (
              <TouchableOpacity style={styles.deleteBtn} onPress={() => deletarReceita(receita.id)}>
                <Text style={styles.deleteText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ... Estilos iguais aos anteriores
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerTitle: { fontSize: 26, fontWeight: 'bold', padding: 20, paddingBottom: 5 },
  headerSubtitle: { fontSize: 14, color: '#666', paddingHorizontal: 20, marginBottom: 10 },
  btnSync: { backgroundColor: '#f4511e', margin: 20, padding: 15, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  vitrine: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 10 },
  cardContainer: { width: '46%', marginBottom: 20 },
  card: { width: '100%', height: 160, borderRadius: 15, overflow: 'hidden', backgroundColor: '#eee' },
  image: { width: '100%', height: '100%' },
  cardOverlay: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', padding: 8 },
  recipeTitle: { color: '#fff', fontWeight: 'bold', fontSize: 12, textAlign: 'center' },
  deleteBtn: { position: 'absolute', top: -5, right: -5, backgroundColor: '#ff4444', width: 26, height: 26, borderRadius: 13, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  deleteText: { color: '#fff', fontWeight: 'bold' }
});
