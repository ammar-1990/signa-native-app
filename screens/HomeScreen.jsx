import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from '@rneui/themed'
import { auth } from '../firebase'
import {AntDesign ,SimpleLineIcons} from '@expo/vector-icons'

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
  return (
    <SafeAreaView className=''>
          <StatusBar style="auto" />
    <CustomListItem />
    </SafeAreaView>
  )
}

export default HomeScreen