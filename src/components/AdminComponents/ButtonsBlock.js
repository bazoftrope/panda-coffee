import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import button1Image from '../images/admin-order-btn2.png'; // Импорт первого изображения
import button2Image from '../images/settings1.png'; // Импорт второго изображения
import { useNavigation } from '@react-navigation/native';


const ButtonsBlock = () => {
  const navigation = useNavigation();

  // Массив объектов, представляющих кнопки
  const buttons = [
    {
      title: "Заказы",
      onPress: () => navigation.navigate('Админка'),
      imageSource: button1Image, // Использование импортированного изображения
      color: 'white',
    },
    {
      title: "Редактирование",
      onPress: () => navigation.navigate('Редактирование'),
      imageSource: button2Image, // Использование другого импортированного изображения
      color: 'white',
    },
    // Добавьте больше кнопок по мере необходимости
  ];

  return (
    <View style={styles.block}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={button.onPress}
        >
          <Image source={button.imageSource} style={styles.image} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  button: {
    width: 100, // Ширина кнопки
    height: 100, // Высота кнопки
    margin: 10, // Отступы вокруг кнопки
    borderRadius: 5, // Радиус углов кнопки
    justifyContent: 'center', // Центрирование содержимого кнопки
    alignItems: 'center', // Центрирование содержимого кнопки
  },
  image: {
    width: 50, // Ширина изображения
    height: 50, // Высота изображения
  },
});

export default ButtonsBlock;
