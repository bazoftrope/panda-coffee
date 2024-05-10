import React from 'react'
import { View, Text, Pressable } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';



const Edit = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.conteiner}>
      <Pressable
        style={styles.element}
        onPress={() => {
          navigation.navigate('EditComponents', { str: 'Menu' })
        }}
      >
        <Text style={styles.txt}>Меню</ Text></Pressable>
      <Pressable
        style={styles.element}
        onPress={() => {
          navigation.navigate('EditComponents', { str: 'Category' })
        }}
      >

        <Text style={styles.txt}>Категории</ Text></Pressable>
      <Pressable
        style={styles.element}
        onPress={() => {
          navigation.navigate('EditComponents', { str: 'Option' })
        }}
      >

        <Text style={styles.txt}>Опции</ Text></Pressable>
      <Pressable
        style={styles.element}
        onPress={() => {
          navigation.navigate('EditComponents', { str: 'Discount' })
        }}
      >

        <Text style={styles.txt}>Акции</ Text></Pressable>
    </View>


  )
}

export default Edit
