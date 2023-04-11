import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const globalScreensOptions = {
    headerStyle: { backgroundColor: "#2C6BED" },
    headerTitleStyle: { color: "white", alignSelf: "flex-end" },
    headerTintColor: "white",
    headerTitleAlign: "center",
  };

  return (
    <Stack.Navigator screenOptions={globalScreensOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        options={{ headerBackButtonMenuEnabled: false }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="AddChat" component={AddChatScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default StackNav;
