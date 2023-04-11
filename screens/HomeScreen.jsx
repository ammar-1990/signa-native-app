import { View, Text, SafeAreaView, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native'
import React, { useLayoutEffect,useEffect,useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from '@rneui/themed'
import { auth } from '../firebase'
import {AntDesign ,SimpleLineIcons} from '@expo/vector-icons'
import { collection,onSnapshot  } from "firebase/firestore";
import { db } from '../firebase'

const HomeScreen = ({navigation}) => {
    const signOutUser=()=>{
auth.signOut().then(()=>{
    navigation.replace('Login')
})
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Signal',
            headerStyle:{backgroundColor:'white'},
            headerTitleStyle:{color:'black'},
            headerTintColor:'black',
            headerTitleAlign:'left',
            headerLeft:()=>(
                <View className='mr-5'>
                    <TouchableOpacity onPress={signOutUser}>
                    
                    <Avatar rounded source={{uri:auth?.currentUser?.photoURL}} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight:()=>(
                <View className='flex-row w-20 justify-between items-center'>
                   <TouchableOpacity>
                    <AntDesign name='camerao' size={22} color={'black'} />
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>navigation.navigate('AddChat')}>
                    <SimpleLineIcons name='pencil' size={22} color={'black'} />
                   </TouchableOpacity>
                </View>
            )
         
        })
    },[navigation])

    const [chats,setChats]=useState([])
    const [loading,setLoading]=useState(true)


useEffect(()=>{
    const unsub = onSnapshot(collection(db, "chat"), (snapShot) => {
        let list =[];
        snapShot.docs.forEach(doc=>{
         list.push({id:doc.id,data:doc.data()})
        })
     setChats(list)
     setLoading(false)
        
       },(error)=>{
         console.log(error)
       });
       return ()=> {
         unsub();
       };
   
},[])

const enterChat =(id,chatName)=> {
navigation.navigate('Chat',{id,chatName})
}

  return (
    <SafeAreaView >
         <StatusBar style="auto" />
        <ScrollView className='h-full'>
         <ActivityIndicator animating={loading} size='large' color='#2B68E6' />
          {chats.map(({id,data:{chatName}})=>  <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/>)}
  
    </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen