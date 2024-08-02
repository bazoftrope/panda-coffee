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
    <View
      style={styles.mainbox}

    >
      {
        cat.map(el =>
          <TouchableOpacity
            style={styles.cat}
            key={el.id}
            onPress={() => navigation.navigate('Меню', { num: el.id })}
          ><Text style={styles.txt}>{el.name}</Text>
          </TouchableOpacity>)
      }

    </View>
  )
}
