import React, {useState, useEffect} from 'react';
import { StyleSheet, TextInput, View, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { ip } from '../../helpers/ip';

export default function SMSCheck({route}) {
  const [inputValue, setInputValue] = useState()
  const userId = useSelector(st => st.userStoreId);
  const navigation = useNavigation();
  const userPhone = route.params.userPhone;
  const smsCode = route.params.smsCode;

  useEffect(() => {
    console.log(inputValue, smsCode, '!!!!!!!!!!!!!!');
    checkPhoneNumber();
  }, [])
    
  const checkPhoneNumber = async () => {
    const reqSmsData = await fetch(ip + '/getsmsdata')
    const dataSms = await reqSmsData.json()
    
    const dataStr = `login=${dataSms.login}&pass=${dataSms.pass}&sourceAddress=${dataSms.sender}&destinationAddress=${userPhone}&data=Ваш код: ${smsCode}`

    console.log(smsCode, 'smsCode in async')

    //! чтобы отправить смс разкоментировать строки
/*     const response = await fetch('http://gateway.api.sc/rest/Send/SendSms/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: dataStr
    })

    const data = await response.json();
    console.log(data) */
  }

  const confirmPhone = async () => {
    const responce = await fetch(ip + '/confirmPhone', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId})
    })
    navigation.navigate('Главная');
  }

  const submitHandler = async () => {
    console.log(smsCode, 'smsCode in Submit')
    console.log(inputValue, 'inputValue in Submit')
    if (inputValue == smsCode) {
      console.log('correct sms')
      confirmPhone();
    } else {
      alert('Неверный код')
    }
  }

  return (
    <View style={styles.mainBody}>
      <View style={styles.formBody}>
        <Text style={styles.text}>Введите четырехзначный код из СМС</Text>
        <TextInput style={styles.input} value={inputValue} onChangeText={data => setInputValue(data)} />
        <TouchableOpacity onPress={submitHandler} style={styles.button}>
        <Text style={{color: 'white', letterSpacing: 2}}>Подтвердить</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    maxHeight: '15%',
    margin: '2%',
    width: '50%',
    borderBottomWidth: 0.5,
  },
  text: {
    color: 'black',
    fontSize: 19,
  },
  mainBody: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    display: 'flex'
  },
  formBody: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '8%',
    width: '50%',
    backgroundColor: 'black'
  }
})