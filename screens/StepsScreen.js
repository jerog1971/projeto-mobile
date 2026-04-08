import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function StepsScreen({ route, navigation }) {
  const { receitaCompleta } = route.params || {};
  const [mostrarVideo, setMostrarVideo] = useState(false);
  const listaPassos = receitaCompleta?.passos || [];
  const videoUri = receitaCompleta?.videoUrl; 

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Preparando {receitaCompleta?.nome}</Text>
        
        {videoUri && (
          <TouchableOpacity style={styles.videoButton} onPress={() => setMostrarVideo(!mostrarVideo)}>
            <Text style={styles.buttonText}>{mostrarVideo ? "🔼 Fechar Vídeo" : "🎥 Assistir Modo de Preparo"}</Text>
          </TouchableOpacity>
        )}

        {mostrarVideo && videoUri && (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: videoUri }}
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isMuted={Platform.OS === 'web' ? true : false} 
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
          <Text style={styles.buttonText}>Finalizar e Voltar ao Início ✨</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 60, flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#f4511e', marginBottom: 20 },
  videoButton: { backgroundColor: '#f4511e', padding: 12, borderRadius: 10, marginBottom: 15 },
  videoContainer: { width: '100%', height: 220, backgroundColor: '#000', borderRadius: 15, overflow: 'hidden', marginBottom: 20 },
  video: { width: '100%', height: '100%' },
  stepCard: { padding: 15, backgroundColor: '#fdf2f0', borderRadius: 10, marginBottom: 15, borderLeftWidth: 5, borderLeftColor: '#f4511e' },
  stepNum: { fontSize: 12, fontWeight: 'bold', color: '#f4511e' },
  stepText: { fontSize: 16, marginTop: 5 },
  homeButton: { backgroundColor: '#4CAF50', padding: 18, borderRadius: 12, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
});
