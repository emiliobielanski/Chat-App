import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {RootNavigator} from './components/authentication/navigators/RootNavigator';
import {AuthProvider, AuthContext} from './components/authentication/contexts/AuthContext';


export default function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}

