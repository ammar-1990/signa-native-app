import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import StackNav from './StackNav';


export default function App() {
  return (
    <NavigationContainer>
<StackNav />
    </NavigationContainer>
  );
}

