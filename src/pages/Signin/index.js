import { React, useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  onChangeText,
  Alert,
} from 'react-native';
import { ip } from '../../helpers/ip';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { logUser, userId, admin } from '../../store/action';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Signin() {
  const dispatch = useDispatch();
  const store = useSelector(st => st.userStore);
  console.log(store, 'STORE REDUX')

  const storeUserId = useSelector(st => st.userStoreId)


  const userEmail = { email: '' };
  const userPassword = { password: '' };

  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState(userPassword);

  const [error, setError] = useState(false);

  let user = { email: '', password: '' };
  const navigation = useNavigation();
  const storeUser = async data => {
    try {
      await AsyncStorage.setItem('userToken', data);
    } catch (err) {
      console.log(err);
    }
  };

  const getStoreUser = async () => {
    try {
      const res = await AsyncStorage.getItem('userToken');
      return res
      console.log(res, 'tokenData');
    } catch (err) {
      console.log(err);
    }
  };
  const submitHandler = async () => {
    user = {
      email,
      password,
    };

    if (password.length < 8) {
      Alert.alert('Ошибка', 'Количество символов должно быть больше 8');
    }
    if (!password.length || !email.length) {
      Alert.alert('Ошибка', 'Все поля должны быть заполнены');
    }
    const response = await fetch(ip + '/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    if (response.status === 400) {
      return alert(data.message);
    } else if (response.status === 200) {
      console.log('data: ', data);
      console.log('data.user.email', data.user.email, data.refreshToken);
      storeUser(data.user.email, data.refreshToken);
      // getStoreUser();
      dispatch(logUser(true));
      dispatch(userId(data.user.id))
      dispatch(admin(data.user.role))
      console.log('admin------->', data.user.role)
      getCart(data.user.id)
      navigation.navigate('Главная');
    }

  };
  const getCart = async (userId) => {
    try {
      console.log(userId, 'getcart in this')
      let response = await fetch(ip + '/getcart', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })
      let Cart = await response.json()
      console.log(Cart, 'cart in signin<______________________________________________oooooooooo')
      dispatch({ type: 'ADD_TO_CART', payload: Cart.length })
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <TextInput
          placeholder="example@gmail.com"
          name="email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          textContentType="emailAddress"
        />
        <TextInput
          placeholder="********"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry={true}
          name="password"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={submitHandler}
        >
        <Text style={{color: 'white', letterSpacing: 2}}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
    maxHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  block: {
    maxHeight: '85%',
    borderRadius: 10,
    width: '80%',
    backgroundColor: 'white',
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '10%',
  },
  input: {
    maxHeight: '15%',
    margin: '2%',
    width: '78%',
    borderBottomWidth: 0.5,
  },
  button: {
    margin: '5%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2%',
    backgroundColor: 'black'
  },
});
