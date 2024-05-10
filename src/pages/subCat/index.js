import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


import { View, Text } from 'react-native';
import { ip } from '../../helpers/ip'
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function SubCut({ route }) {
  const navigation = useNavigation();

  const { num } = route.params
  console.log(num, 'num')

  const [cat, setCat] = useState([])

  useEffect(() => {
    getSubCat(num)
  }, []);

  async function getSubCat(number) {
    console.log(number, 'number getsubcat')
    let response = await fetch(ip + '/testCat', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ number }),
    });
    let json = await response.json();
    console.log(json, 'json in subCat');
    setCat(json)
  }

  return (
    <View><Text>Subcut</Text>
      {
        cat.map(el => <TouchableOpacity
          onPress={() => navigation.navigate('Меню', { num: el })}
        ><Text>{el}</Text></TouchableOpacity>)
      }

    </View>
  )
}
