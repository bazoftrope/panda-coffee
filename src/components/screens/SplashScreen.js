import React from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';
import { styles } from './styles';
const logo = require('../images/panda-screen.png')


const SplashScreen = () => {
  return (
    <View style={styles.conteiner}>
      <Image
        source={logo}
        style={styles.img}
        resizeMode='contain'
      />
    </View>
  );
};

export default SplashScreen;
