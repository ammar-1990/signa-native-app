import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Input, Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";
import { StatusBar } from "expo-status-bar";
import { collection, addDoc } from "firebase/firestore"; 

const AddChatScreen = ({ navigation }) => {
  const [chat, setChat] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "chats",
    });
  }, []);

  const createChat=async()=> {
    
    try {
        const docRef = await addDoc(collection(db, "chat"), {
        chatName:chat,
        });
       navigation.goBack()
      } catch (e) {
        alert(e);
      }
      

  }
  return (
    <View className='p-4'>
        <StatusBar style="light" />
      <Input
        placeholder="Enter a chat name"
        value={chat}
        onChangeText={(text) => setChat(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={22} color="black" />
        }
      />

      <Button disabled={!chat} title={'Create new chat'}  onPress={createChat}/>
    </View>
  );
};

export default AddChatScreen;
