import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Input, Button } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";

const AddChatScreen = ({ navigation }) => {
  const [chat, setChat] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "chats",
    });
  }, []);
  return (
    <View>
      <Input
        placeholder="Enter a chat name"
        value={chat}
        onChangeText={(text) => setChat(text)}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={22} color="black" />
        }
      />

      <Button title={'Create new chat'} />
    </View>
  );
};

export default AddChatScreen;
