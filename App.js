import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AuthProvider, AuthContext} from './components/authentication/contexts/AuthContext';
import {RootNavigator} from "./components/authentication/navigators/RootNavigator"

export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

