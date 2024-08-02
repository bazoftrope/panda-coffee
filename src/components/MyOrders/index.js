import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { Table, Row, Col } from 'react-native-table-component'
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './styles';
import base64 from 'react-native-base64';
import { ip } from '../../helpers/ip';
import { useNavigation } from '@react-navigation/native';
import { createPaymentId, getPaymentValue } from '../../store/action';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { createOrderPaidId } from '../../store/action';

export default function MyOrders() {
  const storeUserId = useSelector(st => st.userStoreId);
  const storePaymentId = useSelector(st => st.confPaymentId);

  const dispatch = useDispatch();
  const [link, setLink] = useState('');
  const navigation = useNavigation();
  const [order, setOrder] = useState([])
  const [adress, setAdress] = useState('')
  const [comment, setComment] = useState('')
  const [idempotenceKeyUuid, setIdempotenceKeyUuid] = useState('');

  useEffect(() => {
    createIdempotenceKey();
    if (storeUserId) {
      getOrder(storeUserId);
    }
    if (link) {
      navigation.navigate('Юкасса', link);
    }
  }, [link]
  )

  const tableHead = ['Блюдо', 'Кол-во', "Цена", "Опции"]
  const sum = order.reduce((acc, el) => acc + el['Menu.price'], 0)
  const tableOpt = (arr) => (
    <Col
      data={arr}
      style={styles.Col}
      textStyle={styles.txtCol}
    ></Col>
  )

  async function getOrder(id) {
    try {
      let response = await fetch(ip + '/myorder', {
        marginLeft: 15,
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      let json = await response.json();
      setOrder(json);
      console.log(json, 'order in myorder')
    } catch (error) {
      console.log(error, 'error');
    }
  }
  async function bayCart(id) {
    const response = await fetch(ip + '/baycart', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, adress, comment, sum })
    })
    const orderResponce = await response.json()
    dispatch(createOrderPaidId(orderResponce))
    console.log(orderResponce, 'orderResponce')
    dispatch({ type: 'BYE_CART', payload: 0 })
    setOrder([])
    paymentOperation();
  }

  const createIdempotenceKey = () => {
    let uuid = uuidv4();
    console.log(uuid, 'idempotenceKeyUuid')
    setIdempotenceKeyUuid(uuid)
    return uuid;
  }

  const paymentOperation = async () => {
    const responceShopData = await fetch(ip + '/shopdata')
    const respDataShop = await responceShopData.json();
    //! спрятать credentialss
    const credentials =
      `${respDataShop.shopId}:${respDataShop.shopToken}`;
    const encodedAuth = base64.encode(credentials);

    const paymentRequestObject = {
      amount: {
        value: `${sum}.00`,
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: '',
      },
      description: '',
    };

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedAuth}`,
        'Idempotence-Key': idempotenceKeyUuid,
      },
      body: JSON.stringify(paymentRequestObject),
    });
    const data = await response.json();
    console.log(data);
    setLink(data.confirmation.confirmation_url);
    console.log(data.id, 'payment ID')
    dispatch(createPaymentId(data.id))
    dispatch(getPaymentValue(data.amount.value))

  };

  return (
    <ScrollView style={styles.container}>
      <Table
        style={styles.table} >
        <Row
          style={styles.tablehead}
          textStyle={styles.headtxt}
          data={tableHead}
          flexArr={[3, 1, 1, 3]} />

        {order.map(el => (
          <Row
            key={el['id']}
            flexArr={[3, 1, 1, 3]}
            style={styles.tables}
            textStyle={styles.tabletxt}
            data={[el['Menu.item'], el['quantity'], el['Menu.price'], tableOpt(el['options'])]}
          />
        ))}
      </Table>
      <View style={styles.btns}>
        <TextInput
          style={styles.inPut}
          placeholder='адрес'
          value={adress}
          onChangeText={text => setAdress(text)}
        ></TextInput>
        <TextInput
          style={styles.inPut}
          placeholder='комментарий к заказу'
          value={comment}
          onChangeText={text => setComment(text)}
        ></TextInput>
        <Pressable
          onPress={() => bayCart(storeUserId)}
          style={styles.pay}>
          <Text style={styles.text}>к оплате {sum} р.</Text></Pressable>
        {/*         <View
          style={styles.history}>
          <Text style={styles.text}>история заказов</Text>
        </View> */}
      </View>
    </ScrollView>)


}
