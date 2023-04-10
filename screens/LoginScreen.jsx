import { View, Text ,Alert} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from "react";
import { Input, Button, Image } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation=useNavigation()

  const login=()=>{
    alert('done')
  }

useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigation.replace('Home')
      
    } 
  });
},[])

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://branditechture.agency/brand-logos/wp-content/uploads/wpdm-cache/Signal-Messenger-Icon-900x0.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View>
      <Input
        type="email"
        placeholder="Email"
        autoFocus
        value={email}
        onChangeText={(text) => setEmail(text)}
        inputContainerStyle={{width:300}}
      />
      <Input
      inputContainerStyle={{width:300}}
        type="password"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      </View>

      <Button containerStyle={{width:200,marginTop:10}} title='Login' onPress={login}/>
      <Button onPress={()=>{navigation.navigate('Register')}} containerStyle={{width:200,marginTop:10}} title='Register' type="outline"/>
    </View>
  );
};

export default LoginScreen;
