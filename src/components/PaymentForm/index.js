import {React, useState, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import base64 from 'react-native-base64';
import {useNavigation} from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {createPaymentId} from '../../store/action';

export default function PaymentForm() {
  const [link, setLink] = useState('');
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const store = useSelector(st => st.confPaymentId);
  console.log(store, 'STORE PAYMENT ID');

  useEffect(() => {
    if (link) {
      navigation.navigate('Юкасса', link);
    }
  }, [link]);

/*  //! спрятать credentials
 const { CREDENTIALS_SHOP_ID } = process.env;
 const { CREDENTIALS_TOKEN } = process.env;

 const credentials =
 `${CREDENTIALS_SHOP_ID}:${CREDENTIALS_TOKEN}`;
const encodedAuth = base64.encode(credentials);
  //! ключ идемпотентности спрятать. Рекомендуется использовать V4 UUID.
  const paymentOperation = async () => {

    //* здесь будем из бд доставать инфу для paymentRequestObject

    const paymentRequestObject = {
      amount: {
        value: '2.00',
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: '',
      },
      description: 'Заказ №72', //* сделать нумерацию
    };

    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedAuth}`,
        'Idempotence-Key': 'sas130100111111111das2ea',
      },
      body: JSON.stringify(paymentRequestObject),
    });
    const data = await response.json();
    console.log(data);
    setLink(data.confirmation.confirmation_url);
    console.log(data.id, 'payment ID')
    dispatch(createPaymentId(data.id))

  }; */

 /*  const paymentBody = {
    amount: {
    value: '2.00',
    currency: 'RUB',
  }}

  const paymentConfirmation = async () => {
    const response = await fetch('https://api.yookassa.ru/v3/payments/2c2c9b41-000f-5000-9000-195d166f931a/capture', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encodedAuth}`,
        'Idempotence-Key': 'gfa111h11111g12fhgfh42',
      },
      body: JSON.stringify(paymentBody),
    });
    const data = await response.json();
    console.log(data);
    const clearStore = '';
    dispatch(paymentId(clearStore))
  } */

  return (
    <View style={styles.paymentView}>
      <Button
        title="Оплатить"
        style={styles.button}
        onPress={paymentOperation}
      />
{/*       <Button title="Подтвердить"  style={styles.button} onPress={paymentConfirmation}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  paymentView: {
    width: '100%',
    height: '100%',
  },
});
