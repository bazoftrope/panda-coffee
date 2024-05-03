import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, ScrollView, Button, SafeAreaView } from 'react-native';
import { styles } from './styles';
import { ip } from '../../../helpers/ip'
// import {
//   launchCamera,
//   launchImageLibrary
// } from 'react-native-image-picker';


const Add = ({ route }) => {
  console.log(route, 'route')
  const arr = route.params
  const object = arr[0].reduce((a, i) => (a[i] = i, a), {})
  const [obj, setObj] = useState(object)
  console.log(arr[0], obj, 'arr, obj in add')

  const [selectimage, setSelectimage] = useState('')

  const submitHandler = async () => {
    console.log(obj, arr[1])
    const table = arr[1]
    const response = await fetch(ip + '/add', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ obj, table }),
    });

  }

  function getForm(str, elem) {
    console.log(obj[elem], 'str')
    setObj(state => ({ ...state, [elem]: str }))
  }

  function pickImage() {
    let options = {
      storageOptions: {
        path: 'image',
      },
    }
    launchImageLibrary(options, response => {
      console.log(response)
    })


  }




  return (
    <View>
      {
        arr[0].map((el, index) => (
          <TextInput
            key={index}
            onChangeText={text => getForm(text, el)}
            placeholder={el}></TextInput>
        ))
      }
      <View>
        <Button
          onPress={submitHandler}
          title='Add'></Button>
        <SafeAreaView>
          <Button
            onPress={pickImage}
            title='Add image'></Button>
        </SafeAreaView>

      </View>
    </View>
  )
}

export default Add
