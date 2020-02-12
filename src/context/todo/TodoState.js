import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types';
import { ScreenContext } from '../screen/screenContext';

export const TodoState = ({ children }) => {
  const initialstate = {
    todos: [
      { id: '1', title: 'პირველი პოსტი' },
      { id: '2', title: 'მეორე პოსტი' }
    ]
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialstate);

  const addTodo = title => dispatch({ type: ADD_TODO, title });

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id);
    Alert.alert(
      'ელემენტის წაშლა',
      `დარწმუნებული ხართ რომ გსურთ წაშლა "${todo.title}" ?`,
      [
        {
          text: 'უარყოფა',
          style: 'cancel'
        },
        {
          text: 'წაშლა',
          style: 'destructive',
          onPress: () => {
            changeScreen(null);
            dispatch({ type: REMOVE_TODO, id });
          }
        }
      ],
      { cancelable: false }
    );
  };

  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
