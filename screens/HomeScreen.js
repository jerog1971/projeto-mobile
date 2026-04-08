import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView } from 'react-native';

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
  { id: "1", nome: 'Bolo de Chocolate', img: 'bolo_chocolate.jpg', ingredientes: ["3 Ovos", "Farinha"], utensilios: ["Forno"], passos: ["Bata os ingredientes", "Asse por 40 min"], videoUrl: 'https://raw.githubusercontent.com/jerog1971/projeto-mobile/main/videos/chocolate.mp4' },
  { id: "2", nome: 'Bolo de Fubá', img: 'bolo_fuba.jpg', ingredientes: ["Fubá", "Leite"], utensilios: ["Forno"], passos: ["Misture o fubá", "Leve ao forno quente"], videoUrl: 'https://raw.githubusercontent.com/jerog1971/projeto-mobile/main/videos/fuba.mp4' },
  { id: "3", nome: 'Bolo de Cenoura', img: 'bolo_cenoura.jpg', ingredientes: ["Cenoura", "Óleo"], utensilios: ["Liquidificador"], passos: ["Bata no liquidificador", "Asse e faça a cobertura"], videoUrl: 'https://raw.githubusercontent.com/jerog1971/projeto-mobile/main/videos/cenoura.mp4' },
  { id: "4", nome: 'Bolo de Laranja', img: 'bolo_laranja.jpg', ingredientes: ["Laranja", "Trigo"], utensilios: ["Forno"], passos: ["Extraia o suco", "Misture com carinho e asse"], videoUrl: 'https://raw.githubusercontent.com/jerog1971/projeto-mobile/main/videos/laranja.mp4' },
];

export default function HomeScreen({ navigation }) {
  const [receitas, setReceitas] = useState(RECEITAS_INICIAIS);
  const [carregando, setCarregando] = useState(false);

  const sincronizarReceitas = async () => {
    setCarregando(true);
    try {
      const response = await fetch('https://raw.githubusercontent.com/jerog1971/projeto-mobile/refs/heads/main/receitas.json');
      const receitasDoServidor = await response.json();
      const novasParaAdicionar = receitasDoServidor.filter(resServidor => !receitas.some(resLocal => resLocal.id === resServidor.id));
      if (novasParaAdicionar.length === 0) { Alert.alert("Sincronizado", "Você já possui todas as receitas!"); } 
      else { setReceitas([...receitas, ...novasParaAdicionar]); Alert.alert("Sucesso", "Receitas atualizadas!"); }
    } catch (error) { Alert.alert("Erro", "Falha na conexão."); } 
    finally { setCarregando(false); }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Minhas Receitas 🍰</Text>
        <TouchableOpacity style={[styles.btnSync, carregando && { opacity: 0.7 }]} onPress={sincronizarReceitas} disabled={carregando}>
          {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Baixar Novidades ☁️</Text>}
        </TouchableOpacity>
        <View style={styles.vitrine}>
          {receitas.map((receita) => (
            <View key={receita.id} style={styles.cardContainer}>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Ingredientes', { receitaCompleta: receita })}>
                <Image source={IMAGENS_LOCAIS[receita.img] || { uri: receita.imgUrl }} style={styles.image} />
                <View style={styles.cardOverlay}><Text style={styles.recipeTitle}>{receita.nome}</Text></View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 40 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', padding: 20 },
  btnSync: { backgroundColor: '#f4511e', margin: 20, padding: 15, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  vitrine: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 10 },
  cardContainer: { width: '46%', marginBottom: 20 },
  card: { width: '100%', height: 160, borderRadius: 15, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  cardOverlay: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', padding: 8 },
  recipeTitle: { color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 12 }
});
