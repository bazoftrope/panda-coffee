import { getActionFromState } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


import { View, Text, Button, ScrollView } from 'react-native';
import { ip } from '../../helpers/ip'
import { styles } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Cart() {
  const navigation = useNavigation();
  const storeUserId = useSelector(st => st.userStoreId)
  const [data, setData] = useState([{ id: '', user_id: '', item_id: '', 'Menu.id': '' }]);

  useEffect(
    () => { getCart(storeUserId) }, []
  )

  const dispatch = useDispatch();
  const store = useSelector(st => st.cartStore)

  async function getCart(userId) {
    let response = await fetch(ip + '/getcart', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    let Cart = await response.json()
    console.log(Cart, 'cart')
    setData(Cart)
  }

  function delCart(id, quantity) {
    console.log(id)
    fetch(ip + '/delcart', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    })
    removeItem(id)
    dispatch({ type: 'REMOVE_FROM_CART', payload: quantity })
  }

  function removeItem(id) {
    let newData = data.filter(el => el.id !== id)
    setData(newData)
  }



  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollCart}>
        {data.map(el => (
          <View key={el.id} style={styles.cartItem}>
            <View style={styles.textItem}>
              <Text style={styles.txt}>{el['Menu.item']}</Text>
              <Text style={styles.txt}>{'Количество: ' + el['quantity']}</Text>
              <Text style={styles.txt}>{'цена: ' + el['price']}</Text>

            </View>
            <View >
              {el['options']?.map((option, index) => {
                return (
                  <View key={index}>
                    <Text
                      style={styles.optList}
                    >{option}</Text></View>
                )
              })}
            </View>
            <View style={styles.btn}>
              <Button
                onPress={() => { delCart(el.id, el['quantity']) }}
                title='&#10060;'
                color='transparent'
              />
            </View>
          </View>

        ))}
      </ScrollView>
      <View style={styles.btnTobay}>
        <View style={styles.btnStyle}>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('мои заказы')
            }}
            style={styles.btnCart}>
            <Text style={{ color: 'green', letterSpacing: 2, fontSize: 15 }}>Купить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
}


