import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Button, Alert} from 'react-native'
import {THEME} from '../theme'

export const AddTodo = ({onSubmit}) => {
    const [value,setValue] = useState('')
const pressNandler = () =>{
    if(value.trim()){
        onSubmit(value)
        setValue('')
    }else{
        Alert.alert('ველი არ უნდა იყოს ცარიელი')
    }

}

    return (
        <View style={styles.block}>
            <TextInput style={styles.input}
            onChangeText = {setValue}
            value={value}
            placeholder='შეიყვანთ ტექატი'
            autoCorrect={false}
            autoCapitalize="none"
            />
            <Button title="დამატება" onPress={pressNandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input: {
        width: '70%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR
    }
})