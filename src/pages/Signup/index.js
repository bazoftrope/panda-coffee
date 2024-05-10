import { React, useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {logUser, userId} from '../../store/action';

import PhoneInput from 'react-native-phone-input';
import { ip } from '../../helpers/ip';
import {checkTelephone} from '../../helpers/checkTelephone';

export default function Signup() {
  const dispatch = useDispatch();
  const store = useSelector(st => st.userStore);
  const storeUserId = useSelector(st => st.userStoreId);
  console.log(store, 'STORE REDUX');

  const userEmail = { email: '' };
  const userLogin = { login: '' };
  const userPassword = { password: '' };
  const userPhone = { phone: '' };

  const [email, setEmail] = useState(userEmail);
  const [login, setLogin] = useState(userLogin);
  const [password, setPassword] = useState(userPassword);
  const [phone, setPhone] = useState(userPhone);

  const [error, setError] = useState(false);

  let user = {email: '', login: '', password: '', role: 'user', phone: ''};
  const navigation = useNavigation();

  //!
  const main_url = 'demoapp://homescreen';
  const signin_url = 'demoapp://signin';

  const storeUser = async (email, refreshTok) => {
    try {
      await AsyncStorage.setItem('userTokenEmail', email);
      await AsyncStorage.setItem('userRefreshToken', refreshTok);
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = async () => {
    user = {
      email,
      login,
      password,
      role: 'user',
      phone,
    };
    console.log(user);

    const response = await fetch(ip + '/signup', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

/*     if (response.status === 401) {
      console.log(response, '<<<<<<<<<<<<<<=')
      if (data.message === 'Используйте цифры и буквы') {
        console.log('there')
        Alert.alert(data.message);
      }
      } */

      if (data.message === 'Используйте цифры и буквы') {
        Alert.alert(data.message);
      }
      
      if (data.message === 'Количество символов пароля должно быть больше 8') {
        Alert.alert(data.message);
      }
      
      if (data.message === 'Такой email уже используется') {
        Alert.alert(data.message);
      }
      
      if (data.message === 'Все поля должны быть заполнены') {
        Alert.alert(data.message);
      }

      if (data.message === 'Неверно набран номер') {
        Alert.alert(data.message);
      }


      if (response.status === 200) {
       console.log('data: ', data);
      console.log('data.user.email', data.user.email, data.refreshToken);
      storeUser(data.user.email, data.refreshToken);
      dispatch(logUser(true));
      dispatch(userId(data.user.id));
      const userPhone = user.phone.slice(1)
      const smsCode = checkTelephone(4);  
      navigation.navigate('SMSCheck', {userPhone, smsCode});
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
          placeholder="example name"
          value={login}
          onChangeText={text => setLogin(text)}
          style={styles.input}
          name="login"
        />
        <TextInput
          placeholder="********"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry={true}
          name="password"
        />
        <PhoneInput
          value={phone}
          keyboardType="numeric"
          onChangePhoneNumber={text => setPhone(text)}
          style={styles.phoneInput}
          name="phone"
          textContentType="telephoneNumber"
          initialCountry={'ru'}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Авторизация');
          }}>
          <Text style={styles.signin}>Уже есть аккаунт?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={submitHandler}
        >
          <Text style={{color: 'white', letterSpacing: 2}}>Зарегистрироваться</Text>
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
/*     backgroundColor: 'rgba(192, 192, 192, 0.13)', */
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
  signin: {
    marginTop: '4%',
    marginBottom: '5%',
    fontStyle: 'italic',
  },
  button: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: '9%',
    width: '70%',
    backgroundColor: 'black'
  },
/*   btnNormal: {
    maxWidth: '65%',
  }, */
  phoneInput: {
    maxHeight: '15%',
    margin: '4%',
    width: '78%',
    borderBottomWidth: 0.5,
  }
});