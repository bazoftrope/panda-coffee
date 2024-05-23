import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


import { View, Text } from 'react-native';
import { ip } from '../../helpers/ip'
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function SubCut({ route }) {
  const navigation = useNavigation();

  const { obj } = route.params
  console.log(obj, 'obj')

  const [cat, setCat] = useState([])

  useEffect(() => {
    setCat(obj)
  }, []);



  return (
    <View><Text>Subcut</Text>
      {
        cat.map(el => <TouchableOpacity
          key={el.id}
          onPress={() => navigation.navigate('Меню', { num: el.id })}
        ><Text>{el.name}</Text></TouchableOpacity>)
      }

    </View>
  )
}
