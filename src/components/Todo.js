import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'

export const Todo = ({todo, onRemove, onOpen}) => {
const longPressHandler = () =>{
    onRemove(todo.id)
}

// onLongPress={onRemove.bind(null, todo.id)}
    return (
        <TouchableOpacity 
        activeOpacity={0.5}
        onPress={()=>onOpen(todo.id)}
        onLongPress={longPressHandler}
        >
            <View style={style.todo}>
                <Text>{todo.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10
    }
})