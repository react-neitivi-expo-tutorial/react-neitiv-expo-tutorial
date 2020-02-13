import React, { useState, useContext } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { THEME } from '../theme';
import { AppCard } from '../ui/AppCard';
import { EditModal } from '../components/EditModal';
import { AppTextBold } from '../ui/AppTextBold';
import { AppButton } from '../ui/AppButton';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';

export const TodoScreen = () => {
  const { todos, updateTodo, removeTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);
  const [modal, setModal] = useState(false);

  const title = todos.find(t => t.id === todoId);
  const saveHandler = async titleedit => {
    await updateTodo(title.id, titleedit);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        value={title.title}
        visiblle={modal}
        onCencel={() => setModal(false)}
        onSave={saveHandler}
      />

      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{title.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton
            onPress={() => changeScreen(null)}
            color={THEME.GREY_COLOR}
          >
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
          {/* <Button title="უკან" color={THEME.GREY_COLOR} onPress={goBack} /> */}
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(title.id)}
          >
            <FontAwesome name="remove" size={20} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    marginBottom: 20,
    padding: 15
  },
  button: {
    // width: Dimensions.get('window').width / 3
    width: Dimensions.get('window').width > 400 ? 150 : 100
  },
  title: {
    fontSize: 20
  }
});
