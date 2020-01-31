import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, ToolbarAndroid } from 'react-native';
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen';

export default function App() {
  const [todoId, setTodosId] = useState('1')
  const [todos, setTodos] = useState([
    {id:'1',title:"პირველი პოსტი"},
    {id:'2',title:"მეორე პოსტი"}
  ])
  const addTodo = (title) => {
   setTodos(prev => [
     ...prev, 
     {
    id: Date.now().toString(),
    title: title
    }
    ])
  }

  const removeTodo = id => {
   setTodos(prev => prev.filter(todo => todo.id !== id))
  }
  let content = (<MainScreen
  todos={todos} 
  addTodo={addTodo}
  removeTodo={removeTodo}
  openTodo={setTodosId}
/>)

  if(todoId){
    const selectedTodo = todos.find(todo=> todo.id === todoId)
    content = (<TodoScreen title={selectedTodo} goBack={()=>setTodosId(null)}/>)
  }

  return (
    <View >
      <Navbar title="Todo App!" />
        <View style={styles.container}>
          {content}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  },
});
