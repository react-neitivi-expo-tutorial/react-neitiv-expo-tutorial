import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { THEME } from '../theme';
import { AppCard } from '../ui/AppCard';
import { EditModal } from '../components/EditModal';
import { AppTextBold } from '../ui/AppTextBold';
import { AppButton } from '../ui/AppButton';

export const TodoScreen = ({ title, goBack, onRemove, onSave }) => {
  const [modal, setModal] = useState(false);

  const saveHandler = titleedit => {
    onSave(title.id, titleedit);
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
          <AppButton onPress={goBack} color={THEME.GREY_COLOR}>
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
          {/* <Button title="უკან" color={THEME.GREY_COLOR} onPress={goBack} /> */}
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(title.id)}
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
    width: '40%'
  },
  title: {
    fontSize: 20
  }
});
