import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, ScrollView, Button } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';


import { ip } from '../../../helpers/ip'



const EditComponents = ({ route }) => {
  const navigation = useNavigation();

  const { str } = route.params
  console.log(str, '<----adress444')
  const [data, setData] = useState([])

  useEffect(
    () => { getData(str) }, []
  )
  const formObj = {
    'Menu': ['item', 'price', 'description', 'weight', 'category_id'],
    'Option': ['title'],
    'Category': ['title'],
    'Discount': []
  }
  async function getData(string) {

    let response = await fetch(ip + '/Menu', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ string })
    })
    let newData = await response.json()
    setData(newData)
    // const newKeys = keys.filter(el => el != 'createdAt' && el != 'udatedAt')


  }

  async function delItem(id, string) {
    console.log(id, string)
    const response = await fetch(ip + '/Menu', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, string })
    })
    await response.json()
    if (response.status === 200) {
      console.log(data, 'data')
      let newData = data.filter(el => el.id != id)
      setData(newData)
    }

  }

  const sendObj = [formObj[str], str]
  console.log(sendObj)
  return (
    <View style={styles.conteiner}
    >

      <ScrollView
        style={styles.scrollList}
      >{
          data.map(el => (
            <View
              key={el.id}
              style={styles.element}
            >
              <View style={styles.name}>
                <Text style={styles.txt}>{el.item || el.title}</Text>
              </View>

              <Pressable
                style={styles.btn}
                onPress={() => delItem(el.id, str)}
              >
                <Text style={styles.txt}>X</Text>
              </Pressable>
            </View>

          ))
        }</ScrollView>
      <View style={styles.add}>
        <Pressable
          onPress={() => {
            navigation.navigate('addComponent', sendObj)
          }}
          style={styles.addBtn}><Text>Добавить</Text></Pressable>
      </View>
    </View>
  )
}

export default EditComponents
