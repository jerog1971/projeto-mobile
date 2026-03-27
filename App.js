import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando os arquivos das telas
import HomeScreen from './screens/HomeScreen';
import IngredientsScreen from './screens/IngredientsScreen';
import ToolsScreen from './screens/ToolsScreen';
import StepsScreen from './screens/StepsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#f4511e' }, headerTintColor: '#fff' }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Receitas Incríveis' }} />
        <Stack.Screen name="Ingredientes" component={IngredientsScreen} />
        <Stack.Screen name="Utensílios" component={ToolsScreen} />
        <Stack.Screen name="Passo a Passo" component={StepsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}