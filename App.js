import * as React from 'react';
import { Image, View, Text } from 'react-native'; // Importamos Image, View e Text
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import IngredientsScreen from './screens/IngredientsScreen';
import ToolsScreen from './screens/ToolsScreen';
import StepsScreen from './screens/StepsScreen';

const Stack = createStackNavigator();

// Criamos um componente para o cabeçalho personalizado
function LogoTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        style={{ width: 30, height: 30, marginRight: 10 }}
        source={require('./assets/logo.png')} // Certifique-se de que o caminho do logo está correto
      />
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
        Receitas Incríveis
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerStyle: { backgroundColor: '#f4511e' }, 
          headerTintColor: '#fff' 
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerTitle: props => <LogoTitle {...props} /> }} 
        />
        <Stack.Screen name="Ingredientes" component={IngredientsScreen} />
        <Stack.Screen name="Utensílios" component={ToolsScreen} />
        <Stack.Screen name="Passo a Passo" component={StepsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
