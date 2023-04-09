import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const StackNav = () => {

    const Stack = createNativeStackNavigator();
const globalScreensOptions={
    headerStyle:{backgroundColor:'#2C6BED',
   },
    headerTitleStyle:{color:'white', alignSelf:'flex-end'},
    headerTintColor:'white',
    headerTitleAlign:'center'
}
    
  return (
   <Stack.Navigator screenOptions={globalScreensOptions}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
   </Stack.Navigator>
  )
}

export default StackNav