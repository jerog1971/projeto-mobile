import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function StepsScreen({ route, navigation }) {
  const { receitaCompleta } = route.params || {};
  const [mostrarVideo, setMostrarVideo] = useState(false);
  const listaPassos = receitaCompleta?.passos || [];

  return (
    // No Web, o SafeAreaView às vezes trava. Usamos uma View comum com estilo de tela cheia.
    <View style={styles.outerContainer}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        // Propriedades para garantir que o scroll responda ao toque e mouse
        scrollEnabled={true}
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Preparando {receitaCompleta?.nome}</Text>
        
        {receitaCompleta?.videoUrl && (
          <TouchableOpacity style={styles.videoButton} onPress={() => setMostrarVideo(!mostrarVideo)}>
            <Text style={styles.buttonText}>
              {mostrarVideo ? "🔼 Fechar Vídeo" : "🎥 Assistir Modo de Preparo"}
            </Text>
          </TouchableOpacity>
        )}

        {mostrarVideo && (
          <View style={styles.videoWrapper}>
            <Video
              source={{ uri: receitaCompleta.videoUrl }}
              style={styles.video}
              videoStyle={{ width: '100%', height: '100%' }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isMuted={false}
              shouldPlay={false}
            />
          </View>
        )}

        {listaPassos.map((item, index) => (
          <View key={index} style={styles.stepCard}>
            <Text style={styles.stepNum}>PASSO {index + 1}</Text>
            <Text style={styles.stepText}>{item}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.popToTop()}>
          <Text style={styles.buttonText}>Finalizar e Voltar ✨</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // O SEGREDO ESTÁ AQUI:
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // Se for Web, removemos qualquer restrição de altura que impeça o scroll
    height: Platform.OS === 'web' ? '100vh' : '100%',
    overflow: 'hidden', 
  },
  scrollView: { 
    flex: 1,
    // No Web, garantimos que o overflow do CSS permita rolagem
    overflowY: Platform.OS === 'web' ? 'auto' : 'scroll',
    WebkitOverflowScrolling: 'touch', // Suaviza o scroll no iPhone/Safari
  },
  scrollContent: { 
    padding: 20,
    flexGrow: 1, 
    paddingBottom: 80,
    // Garante que o conteúdo tenha uma altura mínima para "empurrar" o scroll
    minHeight: '100%', 
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#f4511e', marginBottom: 20 },
  videoButton: { backgroundColor: '#f4511e', padding: 15, borderRadius: 12, marginBottom: 20 },
  videoWrapper: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#000', borderRadius: 15, overflow: 'hidden', marginBottom: 25 },
  video: { flex: 1 },
  stepCard: { padding: 18, backgroundColor: '#fdf2f0', borderRadius: 12, marginBottom: 15, borderLeftWidth: 6, borderLeftColor: '#f4511e' },
  stepNum: { fontSize: 12, fontWeight: 'bold', color: '#f4511e', marginBottom: 4 },
  stepText: { fontSize: 17, color: '#333', lineHeight: 24 },
  homeButton: { backgroundColor: '#4CAF50', padding: 20, borderRadius: 15, marginTop: 20, marginBottom: 40 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});
