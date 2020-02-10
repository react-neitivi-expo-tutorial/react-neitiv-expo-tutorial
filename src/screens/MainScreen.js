import React from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';

export const MainScreen = ({ addTodo, removeTodo, todos, openTodo }) => {
  let content = (
    <FlatList
      keyExtractor={item => item.id}
      data={todos}
      renderItem={({ item }) => (
        <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
      )}
    />
  );
  if (todos.length === 0) {
    content = (
      <View style={style.imgWrap}>
        <Image
          style={style.image}
          source={require('../../assets/no-items.png')}
        />
        {/*<Image style={style.image} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} />*/}
      </View>
    );
  }
  return (
    <View>
      <AddTodo onSubmit={addTodo} />

      {content}
    </View>
  );
};

const style = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});
