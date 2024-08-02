import { React, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ip } from '../../helpers/ip';
import { styles } from './styles';
import SplashScreen from '../../components/screens/SplashScreen';
import ButtonsBlock from '../../components/AdminComponents/ButtonsBlock';


export default function Main() {

  const store = useSelector(store => store.userStore);
  const storeUserId = useSelector(st => st.userStoreId);
  const storePaymentId = useSelector(st => st.confPaymentId);
  const admin = useSelector(st => st.admin);
  const navigation = useNavigation();

  const [splashTimeOver, setSplashTimeOver] = useState(false);
  const [menuData, setMenuData] = useState([{}]);



  console.log(admin, '<---------------- store')

  useEffect(() => {

    setTimeout(() => {
      setSplashTimeOver(true);
    }, 3000);

    getStoreUser();
    getCat();
  }, []);

  const getStoreUser = async () => {
    try {
      const res = await AsyncStorage.getItem('userRefreshToken');
      if (store.logged) {
        return res;
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  async function getCat() {
    try {
      let response = await fetch(ip + '/main');
      if (!response.ok) { // Проверяем, что ответ успешный
        throw new Error('Ошибка при получении данных: ' + response.status);
      }
      let json = await response.json();
      console.log('Before processing:', JSON.stringify(json, null, 2));

      json.forEach(item => {
        if (item.children) {
          item.children = item.children.map(child => ({ id: child.id, name: child.name }));
        }
      });

      console.log('After processing:', JSON.stringify(json, null, 2));
      setMenuData(json);
    } catch (error) {
      console.log(error, 'error');
    }
  };


  return (
    <>
      {splashTimeOver ? (
        <View style={styles.conteiner}>
          {store == true ? (
            <View style={styles.administrator}>
              <TouchableOpacity
                style={styles.status}
                onPress={() => navigation.navigate('Аккаунт')}>
                <Image source={require('../../components/images/panda-bear.png')} style={styles.img} />
                <Text>Аккаунт</Text>
              </TouchableOpacity>
              <ButtonsBlock />
            </View>
          ) : (
            <View style={styles.administrator}>
              <TouchableOpacity
                style={styles.status}
                onPress={() => navigation.navigate('Регистрация')}>
                <Image source={require('./user.png')} style={styles.img} />
                <Text>Регистрация</Text>
              </TouchableOpacity>
            </View>
          )}
          <ScrollView
            style={styles.column}
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
          >
            {menuData.map(el => (
              <TouchableOpacity
                key={el.id}
                style={styles.category}
                onPress={() => {
                  el['children'].length > 0 ? navigation.navigate('subCat', { obj: el['children'] }) :
                    navigation.navigate('Меню', { num: el.id })
                }}>
                <Text style={styles.text}>{el.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        <SplashScreen />
      )}
    </>
  );
}


