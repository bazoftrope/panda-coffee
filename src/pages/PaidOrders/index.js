import { React, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, ImageBackground } from 'react-native';
import base64 from 'react-native-base64';
import { useSelector, useDispatch } from 'react-redux';
import { createPaymentId, getPaymentValue } from '../../store/action';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ip } from '../../helpers/ip';
import moment from 'moment';

export default function PaidOrders() {
  //* в данном компоненте будем выводить историю заказов и текущий заказ

  const dispatch = useDispatch();
  const storePaymentId = useSelector(st => st.confPaymentId);
  const storePaymentValue = useSelector(st => st.paymentValue);
  const orderPaidId = useSelector(st => st.orderPaidId);
  const storeUserId = useSelector(st => st.userStoreId);
  const [paidOrders, setPaidOrders] = useState([{ id: 0, item_id: 0, item: '', price: '', description: '', weight: '', quantity: '', updatedAt: '' }])

  useEffect(() => {
    if (storePaymentId) {
      paymentConfirmation();
    }
    findPaidOrders(storeUserId)
  }, [storePaymentId]);

  async function confirmDataPayment(id) {
    const response = await fetch(ip + '/confirmPayment', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
  }

  async function findPaidOrders(userId) {
    const response = await fetch(ip + '/findpaidorders', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    const data = await response.json()
    setPaidOrders(data)
  }

  const paymentBody = {
    amount: {
      value: `${storePaymentValue}`,
      currency: 'RUB',
    }
  }

  const paymentConfirmation = async () => {
    let uuid = uuidv4();
    const responceShopData = await fetch(ip + '/shopdata')
    const respDataShop = await responceShopData.json();

    const credentials =
      `${respDataShop.shopId}:${respDataShop.shopToken}`;
    const encodedAuth = base64.encode(credentials);

    const response = await fetch(`https://api.yookassa.ru/v3/payments/${storePaymentId}/capture`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedAuth}`,
        'Idempotence-Key': uuid,
      },
      body: JSON.stringify(paymentBody),
    });
    const data = await response.json();
    const clearStore = '';
    dispatch(createPaymentId(clearStore))
    dispatch(getPaymentValue(clearStore))

    //* здесь обновление столбца корзины
    confirmDataPayment(orderPaidId);
  }
  return (
    <View style={styles.paymentView}>
      <View style={styles.headerHistory}>
        <Text style={styles.textHeader}>Мои заказы</Text>
      </View>
      <View style={styles.block}>
        <ScrollView>
          {paidOrders.map(el => (
            <View key={el.id} style={styles.paidBlock}>
              <View
                onPress={() => {
                  CardData(el['Menu.id']);
                }}
                style={styles.imgPart}>
                <ImageBackground
                  style={styles.imgPart}
                  source={{ uri: ip + '/images/' + el['Menu.item'] + '.jpg' }}
                />
              </View>
              <View style={styles.textBlock}>
                <Text style={styles.header}>{el.item}</Text>
                <Text style={{ fontWeight: '500', marginBottom: 5, color: 'black', }}>{`${el['Menu.item']}`}</Text>
                <Text style={styles.txt}>{`Цена: ${el['Menu.price']}`}</Text>
                <Text style={styles.txt}>{`Количество: ${el.quantity}`}</Text>
                <Text style={styles.txt}>{`Дата заказа: ${moment(el.updatedAt).format('DD-MM-YYYY')}`}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  paymentView: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  headerHistory: {
    padding: 15,
    color: 'black',
  },
  textHeader: {
    color: 'black',
    fontSize: 19,
  },
  paidBlock: {
    margin: 5,
    flexDirection: 'row',
    height: 120,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 5,
  },
  textBlock: {
    marginLeft: 10,
    width: '60%',
  },
  txt: {
    color: 'black',
  },
  imgPart: {
    flex: 2,
    color: 'black',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
});
