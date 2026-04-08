import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function StepsScreen({ route, navigation }) {
  const { receitaCompleta } = route.params || {};
  const [mostrarVideo, setMostrarVideo] = useState(false);
  const listaPassos = receitaCompleta?.passos || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={Platform.OS === 'web'}
      >
        <Text style={styles.title}>Preparando {receitaCompleta?.nome}</Text>
        
        {receitaCompleta?.videoUrl && (
          <TouchableOpacity style={styles.videoButton} onPress={() => setMostrarVideo(!mostrarVideo)}>
            <Text style={styles.buttonText}>{mostrarVideo ? "🔼 Fechar Vídeo" : "🎥 Assistir Modo de Preparo"}</Text>
          </TouchableOpacity>
        )}

        {mostrarVideo && receitaCompleta?.videoUrl && (
          <View style={styles.videoWrapper}>
            <Video
              source={{ uri: receitaCompleta.videoUrl }}
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isMuted={false}
              shouldPlay={false}
              videoStyle={{ width: '100%', height: '100%' }}
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
  title: { fontSize: 22, fontWeight: 'bold', color: '#f4511e', marginBottom: 20 },
  videoButton: { backgroundColor: '#f4511e', padding: 15, borderRadius: 10, marginBottom: 15 },
  videoWrapper: { 
    width: '100%', 
    aspectRatio: 16/9, 
    backgroundColor: '#000', 
    borderRadius: 15, 
    overflow: 'hidden', 
    marginBottom: 20,
    alignSelf: 'center'
  },
  video: { 
    width: '100%', 
    height: '100%' 
  },
  stepCard: { padding: 15, backgroundColor: '#fdf2f0', borderRadius: 10, marginBottom: 15, borderLeftWidth: 5, borderLeftColor: '#f4511e' },
  stepNum: { fontSize: 12, fontWeight: 'bold', color: '#f4511e' },
  stepText: { fontSize: 16, marginTop: 5 },
  homeButton: { backgroundColor: '#4CAF50', padding: 18, borderRadius: 12, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
