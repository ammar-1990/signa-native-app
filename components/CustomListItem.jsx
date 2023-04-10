import { View, Text } from 'react-native'
import React from 'react'
import { ListItem ,Avatar } from '@rneui/themed';

const CustomListItem = ({id,chatName,enterChat}) => {
  return (
    <ListItem>
    <Avatar 
    rounded
    source={{uri:'https://artscimedia.case.edu/wp-content/uploads/sites/79/2016/12/14205134/no-user-image.gif'}}
    />

    <ListItem.Content>
        <ListItem.Title style={{fontWeight:800}}>
YouTube Chat
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}
        ellipsizeMode='tail'
        >
This is a test subtitle to see how it is gonna response
        </ListItem.Subtitle>
    </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem