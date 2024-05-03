import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { ip } from '../../helpers/ip'

const Card = ({ route, navigation }) => {
  const { el } = route.params;
  console.log(route.params, 'route params');

  const [data, setData] = useState({});



  return (
    <View>
      <Text>{el['item']}</Text>
      <Text>{el['description']}</Text>
      <Text>{el['price']} р.</Text>
      <Text>{el['weight']} гр.</Text>
    </View>
  )
}



export default Card
