import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  FETCH_TODOS,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR
} from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Http } from '../../http';

export const TodoState = ({ children }) => {
  const initialstate = {
    todos: [],
    loading: false,
    error: null
  };
  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialstate);

  const addTodo = async title => {
    clearError();
    try {
      const data = await Http.post(
        'https://rn-todo-app-de6fc.firebaseio.com/todos.json',
        { title }
      );
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (e) {
      showError('მოხდა შეცდომა');
    }
  };

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
          onPress: async () => {
            try {
              changeScreen(null);
              await Http.delete(
                `https://rn-todo-app-de6fc.firebaseio.com/todos/${id}.json`
              );
              dispatch({ type: REMOVE_TODO, id });
            } catch (e) {
              showError('მოხდა შეცდომა');
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const data = await Http.get(
        'https://rn-todo-app-de6fc.firebaseio.com/todos.json'
      );
      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (e) {
      showError('მოხდა შეცდომა');
      console.log(e);
    } finally {
      hideLoader();
    }
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await fetch(`https://rn-todo-app-de6fc.firebaseio.com/todos/${id}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      await Http.patch(
        `https://rn-todo-app-de6fc.firebaseio.com/todos/${id}.json`
      );
      dispatch({ type: UPDATE_TODO, id, title });
    } catch (e) {
      showError('მოხდა შეცდომა');
      console.log(e);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const hideLoader = () => dispatch({ type: HIDE_LOADER });

  const showError = error => dispatch({ type: SHOW_ERROR, error });

  const clearError = () => dispatch({ type: CLEAR_ERROR });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
