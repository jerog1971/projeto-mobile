import React, { useState } from 'react';
// Importamos o SafeAreaView
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function StepsScreen({ route, navigation }) {
  const { receitaCompleta } = route.params || {};
  const [mostrarVideo, setMostrarVideo] = useState(false);

  const listaPassos = receitaCompleta?.passos || ["Prepare os ingredientes com carinho.", "Siga as instruções de preparo."];
  const videoUri = receitaCompleta?.videoUrl; 

  return (
    // SafeAreaView garante que nada fique escondido pelo entalhe (notch) ou botões do sistema
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Preparando {receitaCompleta?.nome || "sua receita"}</Text>
        
        {videoUri ? (
          <TouchableOpacity 
            style={styles.videoButton} 
            onPress={() => setMostrarVideo(!mostrarVideo)}
          >
            <Text style={styles.buttonText}>
              {mostrarVideo ? "🔼 Fechar Vídeo" : "🎥 Assistir Modo de Preparo"}
            </Text>
          </TouchableOpacity>
        ) : null}

        {/* Janela de Vídeo com Container para melhor controle de layout */}
        {mostrarVideo && videoUri && (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: videoUri }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay={false}
              useNativeControls
              style={styles.video}
            />
          </View>
        )}

        {!mostrarVideo && (
          <Image 
            source={{ uri: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3enZwMXgwMDBvdHFpazVrbWZiNnQwYnpkenBtaXh5d2VnNmhxZHc5MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/JWSgfzUOcsPux6VVHe/giphy.gif' }} 
            style={styles.gif} 
          />
        )}

        {listaPassos.map((item, index) => (
          <View key={index} style={styles.stepCard}>
            <Text style={styles.stepNum}>PASSO {index + 1}</Text>
            <Text style={styles.stepText}>{item}</Text>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.homeButton} 
          onPress={() => navigation.popToTop()}>
          <Text style={styles.buttonText}>Finalizar e Voltar ao Início ✨</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Estilo para a área segura
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: { 
    flex: 1, 
    paddingHorizontal: 20, // Padding lateral no ScrollView
    paddingTop: 10,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#f4511e', marginBottom: 20 },
  gif: { width: '100%', height: 200, borderRadius: 15, marginBottom: 20 },
  videoButton: {
    backgroundColor: '#f4511e',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  videoContainer: {
    width: '100%',
    height: 220,
    backgroundColor: '#000',
    borderRadius: 15,
    overflow: 'hidden', // Garante que o vídeo respeite o border radius do container
    marginBottom: 20,
    // Adicionando uma borda interna ou margem se necessário para afastar dos botões do celular
  },
  video: {
    width: '100%',
    height: '100%',
  },
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