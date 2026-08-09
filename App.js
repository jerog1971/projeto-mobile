import * as React from 'react';
import { Image, View, Text, Platform, Switch } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeProvider, useTheme } from './ThemeContext';

import HomeScreen from './screens/HomeScreen';
import IngredientsScreen from './screens/IngredientsScreen';
import ToolsScreen from './screens/ToolsScreen';
import StepsScreen from './screens/StepsScreen';

const Stack = createStackNavigator();

function LogoTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        style={{ width: 30, height: 30, marginRight: 10 }}
        source={require('./assets/logo.png')} 
      />
      <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
        Receitas Incríveis
      </Text>
    </View>
  );
}

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
      <Text style={{ color: '#fff', marginRight: 5 }}>{isDarkMode ? '🌙' : '☀️'}</Text>
      <Switch 
        value={isDarkMode} 
        onValueChange={toggleTheme}
        trackColor={{ false: '#767577', true: '#f4511e' }}
        thumbColor={isDarkMode ? '#ffffff' : '#f4f3f4'}
      />
    </View>
  );
}

function MainNavigator() {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerStyle: { backgroundColor: colors.header }, 
          headerTintColor: '#fff',
          headerRight: () => <ThemeToggle />,
          cardStyle: { 
            flex: 1, 
            backgroundColor: colors.background, 
            overflow: Platform.OS === 'web' ? 'visible' : 'hidden' 
          }
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

export default function App() {
  return (
    <ThemeProvider>
      <MainNavigator />
    </ThemeProvider>
  );
}
