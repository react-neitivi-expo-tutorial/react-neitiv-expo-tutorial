import React from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'
import {AddTodo} from '../components/AddTodo'
import {Todo} from '../components/Todo'

export const MainScreen = ({addTodo, removeTodo, todos, openTodo}) =>{
    return (
        <View>
         <AddTodo onSubmit={addTodo} />

          <FlatList
           keyExtractor={item => item.id}
           data={todos}
           renderItem={({item})=>
           <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />}
           />
               </View>
    )
}

const style = StyleSheet.create({
    
})