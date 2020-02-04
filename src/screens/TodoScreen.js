import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { THEME } from '../theme';
import { AppCard } from '../ui/AppCard';
import { EditModal } from '../components/EditModal';

export const TodoScreen = ({ title, goBack, onRemove, onSave }) => {
  const [modal, setModal] = useState(false);

  const saveHandler = titleedit => {
    onSave(title.id, titleedit)
    setModal(false)
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
        <Text style={styles.title}>{title.title}</Text>
        <Button title="რედ." onPress={() => setModal(true)} />
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="უკან" color={THEME.GREY_COLOR} onPress={goBack} />
        </View>
        <View style={styles.button}>
          <Button
            title="წაშლა"
            color={THEME.DANGER_COLOR}
            onPress={() => onRemove(title.id)}
          />
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
