import React from 'react';
import { View, StyleSheet } from 'react-native';
import { THEME } from '../theme';
import { AppTextBold } from '../ui/AppTextBold';

export const Navbar = ({ title }) => {
  return (
    <View style={style.navbar}>
      <AppTextBold style={style.text}>{title}</AppTextBold>
    </View>
  );
};

const style = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: THEME.MAIN_COLOR,
    paddingBottom: 10
  },
  text: {
    color: 'white',
    fontSize: 20
  }
});
