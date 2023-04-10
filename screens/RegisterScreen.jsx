import { View } from 'react-native'
import { Text } from '@rneui/themed'
import { Input,Button } from '@rneui/themed'
import React, { useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword,updateProfile  } from 'firebase/auth'

const RegisterScreen = ({navigation}) => {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [image,setImage]=useState('')


const register=()=>{
  

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

   updateProfile(userCredential.user,{
    displayName:name,
    photoURL: image ||  'https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif'

   });
 
  })
  .catch((error) => {
   alert(error.message)
    // ..
  });


}






  return (
    <KeyboardAvoidingView behavior='height' className='flex-1 items-center justify-center text-zinc-600'>
        <StatusBar style='light' />
      <Text h3>Create a Signal Account</Text>
      <View className='w-[90%] mt-10'>
        <Input autoFocus type='text' placeholder='Full Name'  value={name} onChangeText={text=>setName(text)} />
        <Input type='email' placeholder='Your Email'  value={email} onChangeText={text=>setEmail(text)} />
        <Input type='password' secureTextEntry  placeholder='Password' value={password} onChangeText={text=>setPassword(text)} />
        <Input type='text'  placeholder='Profile Image URL (Optional)' value={image}  onChangeText={text=>setImage(text)}/>
      </View>

      <Button title={'Register'} containerStyle={{width:200,marginTop:10}}  onPress={register}/>
      <View className='h-16'></View>

    </KeyboardAvoidingView>
  )
}

export default RegisterScreen