import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
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
        // Melhora a resposta ao toque no mobile
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={true}
      >
        <Text style={styles.title}>Preparando {receitaCompleta?.nome}</Text>
        
        {receitaCompleta?.videoUrl && (
          <TouchableOpacity 
            style={styles.videoButton} 
            onPress={() => setMostrarVideo(!mostrarVideo)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>
              {mostrarVideo ? "🔼 Fechar Vídeo" : "🎥 Assistir Modo de Preparo"}
            </Text>
          </TouchableOpacity>
        )}

        {mostrarVideo && receitaCompleta?.videoUrl && (
          <View style={styles.videoWrapper}>
            <Video
              source={{ uri: receitaCompleta.videoUrl }}
              style={styles.video}
              videoStyle={{ width: '100%', height: '100%' }} // Enquadramento sem zoom
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

        <TouchableOpacity 
          style={styles.homeButton} 
          onPress={() => navigation.popToTop()}
          activeOpacity={0.8}
        >
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
    // IMPORTANTE: Destrava a altura para o navegador do celular
    minHeight: Platform.OS === 'web' ? '100vh' : '100%',
  },
  scrollView: { 
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: { 
    padding: 20, // Cria as margens laterais e superior que faltavam
    flexGrow: 1, 
    paddingBottom: 100, // Garante que o último botão não fique escondido
    width: '100%',
    alignSelf: 'center',
    // Limita a largura em telas muito grandes (telão) para não esticar demais o texto
    maxWidth: Platform.OS === 'web' ? 600 : '100%', 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#f4511e', 
    marginBottom: 20,
    textAlign: 'left'
  },
  videoButton: { 
    backgroundColor: '#f4511e', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  videoWrapper: { 
    width: '100%', 
    aspectRatio: 16 / 9, 
    backgroundColor: '#000', 
    borderRadius: 15, 
    overflow: 'hidden', 
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#eee'
  },
  video: { 
    flex: 1 
  },
  stepCard: { 
    padding: 18, 
    backgroundColor: '#fdf2f0', 
    borderRadius: 12, 
    marginBottom: 15, 
    borderLeftWidth: 6, 
    borderLeftColor: '#f4511e',
    // Suporte para sombra leve
    elevation: 1,
  },
  stepNum: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    color: '#f4511e',
    marginBottom: 4
  },
  stepText: { 
    fontSize: 17, 
    color: '#333',
    lineHeight: 24
  },
  homeButton: { 
    backgroundColor: '#4CAF50', 
    padding: 20, 
    borderRadius: 15, 
    marginTop: 20,
    marginBottom: 40 
  },
  buttonText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 16
  }
});
