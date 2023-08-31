import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Messages from "./components/Messages"
import Register from './components/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './components/authentication/navigators/AuthNavigator';
import AppNavigator from './components/authentication/navigators/AppNavigator';
import RootNavigator from './components/authentication/navigators/RootNavigator';
import { AuthProvider } from './components/authentication/contexts/AuthContext';


export default function App() {
  const Stack = createStackNavigator();


  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

