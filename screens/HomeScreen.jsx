import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from '@rneui/themed'
import { auth } from '../firebase'

const HomeScreen = ({navigation}) => {

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Signal',
            headerStyle:{backgroundColor:'white'},
            headerTitleStyle:{color:'black'},
            headerTintColor:'black',
            headerLeft:()=>(
                <View>
                    <TouchableOpacity>
                    
                    <Avatar rounded source={{uri:auth?.currentUser?.photoURL}} />
                    </TouchableOpacity>
                </View>
            )
         
        })
    },[])
  return (
    <SafeAreaView className=''>
          <StatusBar style="auto" />
    <CustomListItem />
    </SafeAreaView>
  )
}

export default HomeScreen