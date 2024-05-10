import { React, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Button,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ip } from '../../helpers/ip';
import { styles } from './styles';
import SplashScreen from '../../components/screens/SplashScreen';


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
      let json = await response.json();
      console.log(json, 'данные getCat')
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
              {admin === 'admin' ? (
                <View>
                  <Button
                    title="Заказы"
                    color="#f194ff"
                    onPress={() => navigation.navigate('Админка')}
                  />
                  <Button
                    title="Редактирование"
                    color="#f194ff"
                    onPress={() => navigation.navigate('Редактирование')}
                  />
                </View>
              ) : null}
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
            horizontal={true}
          >
            {menuData.map(el => (
              <TouchableOpacity
                key={el.id}
                style={styles.category}
                onPress={() => {
                  el['subcat'] ? navigation.navigate('subCat', { num: el.id }) :
                    navigation.navigate('Меню', { num: el.id })
                }}>
                <Text style={styles.text}>{el.title}</Text>
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


