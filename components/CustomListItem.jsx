import { View, Text } from 'react-native'
import React, { useEffect,useState } from 'react'
import { ListItem ,Avatar } from '@rneui/themed';
import {collection,onSnapshot,orderBy,query} from "firebase/firestore";
import { db } from '../firebase';

const CustomListItem = ({id,chatName,enterChat}) => {
const [messages,setMessages]=useState('')
useEffect(()=>{
    
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
    <ListItem key={id} bottomDivider onPress={()=>enterChat(id,chatName)}>
    <Avatar 
    rounded
    source={{uri: messages[0]?.data?.photoURL || 'https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif'}}
    />

    <ListItem.Content>
        <ListItem.Title style={{fontWeight:800}}>
{chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}
        ellipsizeMode='tail'
        >
       {!messages[0]?.data?.message ?'no messages': `${messages[0]?.data?.displayName} : ${ messages[0]?.data?.message} `}   

        </ListItem.Subtitle>
    </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem