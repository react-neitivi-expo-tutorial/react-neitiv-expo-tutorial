import React, { useState } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { THEME } from '../theme';
import { AppButton } from '../ui/AppButton';

export const EditModal = ({ value, visiblle, onCencel, onSave }) => {
  const [title, setTitle] = useState(value);
  const saveHendler = () => {
    if (title.toString().trim().length < 3) {
      Alert.alert(
        'შეცდომაა!',
        `მინიმალური სიმბოლოების რაოდენობა არის 3. ახლა არის ${
          title.trim().length
        } სიმბოლო.`
      );
    } else {
      onSave(title);
    }
  };

  return (
    <Modal visible={visiblle} animationType="slide" transparent={false}>
      <View style={styles.wrap}>
        <TextInput
          value={title.toString()}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="შეიყვანეთ დასახელება"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttoms}>
          <AppButton onPress={onCencel} color={THEME.DANGER_COLOR}>
            უარყოფა
          </AppButton>
          {/* <Button
            title="უარყოფა"
            onPress={onCencel}
            color={THEME.DANGER_COLOR}
          /> */}
          <AppButton onPress={saveHendler}>შენახვა</AppButton>
          {/* <Button title="შენახვა" onPress={saveHendler} /> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    borderColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%'
  },
  buttoms: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
