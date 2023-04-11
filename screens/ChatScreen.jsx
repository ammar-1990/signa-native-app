import { View, Text, TouchableOpacity,SafeAreaView, KeyboardAvoidingView ,Platform, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, { useLayoutEffect,useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Avatar } from '@rneui/themed'
import { AntDesign,FontAwesome,Ionicons } from '@expo/vector-icons'
import {serverTimestamp,collection,addDoc,onSnapshot,orderBy,query, QuerySnapshot} from "firebase/firestore";
import { db,auth } from '../firebase'

const ChatScreen = ({navigation,route}) => {
    const {id,chatName}=route.params

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitleAlign:'left',
           
            headerTitle:()=>(
                <View className='flex-row items-center ml-[-8] '>
                    <Avatar rounded source={{uri:messages[0]?.data?.photoURL || 'https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif'}}/>
                    <Text className='text-white font-bold ml-2'>{chatName}</Text>
                </View>
            ),
            headerRight:()=>(
                <View className='flex-row gap-6'>
                    <TouchableOpacity>
                        <FontAwesome name='video-camera' size={20} color={'white'} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name='call' size={20} color={'white'} />
                    </TouchableOpacity>
                </View>
            )
         

        })
    },[navigation,messages])

const [input,setInput]=useState('')
const sendMessage=async()=> {
Keyboard.dismiss(),
await addDoc(collection(db,`chat/${id}`,`messages`), {
    timeStamp:serverTimestamp(),
        message:input,
        displayName:auth.currentUser.displayName,
        email:auth.currentUser.email,
        photoURL:auth.currentUser.photoURL
  });

setInput('')
}
const [messages,setMessages]=useState([])


useLayoutEffect(
    ()=>{
        const q = query(collection(db, `chat/${id}`,'messages'),orderBy("timeStamp", "desc"))
    const unsub = onSnapshot(q,(querySnapshot) => {
        let list =[];
       querySnapshot.forEach(doc=>{
         list.push({id:doc.id,data:doc.data()})
     
        })
     setMessages(list)
   
     
        
       },(error)=>{
         console.log(error)
       });
       return ()=> {
         unsub();
       };
   
},[])

  return (
    <SafeAreaView className='flex-1 bg-white'>
        <StatusBar  style='light'/>
        <KeyboardAvoidingView className='flex-1' behavior={Platform.OS==='ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}>
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
      <ScrollView className='flex-1  '>
{messages.map(({data,id})=>data.email===auth.currentUser.email ? 
(<View key={id} className='   relative self-end p-2 m-4 mb-3 mt-1 bg-[#ECECEC] rounded-2xl max-w-[80%]'>
    <Avatar rounded source={{uri:data.photoURL}} position='absolute' size={20} bottom={-10} right={-5} />
    <Text className='font-bold' >{data.message}</Text>
   
    </View>) 
: (<View key={id} className='   relative self-start p-2 px-3 m-4 mb-3 mt-1 bg-[#2B68E6] rounded-2xl max-w-[80%]'>
<Avatar rounded source={{uri:data.photoURL}} position='absolute' size={20} bottom={-10} left={-5} />
<Text className='text-white font-bold '>{data.message}</Text>
<Text className='mt-3 text-xs text-white capitalize '>{data.displayName}</Text>
</View>))}
      </ScrollView>
      <View className='flex-row items-center w-full p-4'>
        <TextInput onSubmitEditing={sendMessage} className='flex-1 bg-[#ECECEC] text-[gray] rounded-full p-1 mr-2 px-3' placeholder='enter your message' value={input} onChangeText={text=>setInput(text)}/>
        <TouchableOpacity onPress={sendMessage} disabled={!input}>
        <Ionicons  name='send'size={22} color={!input? 'gray' : '#2B68E6'} />
        </TouchableOpacity>
      </View>
      </>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen