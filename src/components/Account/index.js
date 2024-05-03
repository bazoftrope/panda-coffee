import { React, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logUser } from '../../store/action';
import { ip } from '../../helpers/ip';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Account() {
  const dispatch = useDispatch();
  const store = useSelector(st => st.userStore);
  console.log(store, 'STORE REDUX');
  const navigation = useNavigation();

  const [userLocalData, setuserLocalData] = useState({ refreshToken: '' });

  const getStoreUser = async () => {
    try {
      const res = await AsyncStorage.getItem('userRefreshToken');
      console.log(res, 'tokenData');
      if (res) {
        setuserLocalData(false);
        return res;
      }
      return userLocalData;
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async () => {
    try {
      const responce = getStoreUser();
      const response = await fetch(ip + '/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responce),
      });
      const data = await response.json();
      AsyncStorage.removeItem('userRefreshToken');
      AsyncStorage.removeItem('userTokenEmail');
      dispatch(logUser(false));
      navigation.navigate('Главная');
      /* const getStoreUser = async () => {
        try {
          const res = await AsyncStorage.getItem('userToken');
          console.log(res, 'tokenData');
          if (res) {
            setuserLocalData(false);
            return res;
          }
          return userLocalData;
        } catch (error) {
          console.log(error);
        }
      };
      getStoreUser(); */
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.blockOne}>
      <TouchableOpacity onPress={submitHandler}>
          <Text style={{color: 'black', fontSize: 17}}>Выйти из аккаунта</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.blockTwo}>
        <View style={styles.textBlock}>
        <TouchableOpacity onPress={() => navigation.navigate('Избранное')} style={styles.textView}> 
          <Text style={styles.text}>Избранное</Text>
          <Text style={styles.text}>{'>'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Paid Orders')} style={styles.textView}> 
          <Text style={styles.text}>Мои заказы</Text>
          <Text style={styles.text}>{'>'}</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: '100%',
    backgroundColor: 'white',
    display: 'flex', 
    flexDirection: 'column',
/*     justifyContent: 'space-evenly',
 */

  },
  blockOne: {
    paddingRight: '5%',
    width: '100%',
    height: '40%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }, 
  blockTwo: {
    height: '60%',
    backgroundColor: 'white',
  },
  textBlock: {
    marginLeft: '5%',
    height: '30%',
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  textView: {
    width: '91%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    fontSize: 19,
  },
});
