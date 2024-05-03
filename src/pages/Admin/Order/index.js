import { React, useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Pressable, ImageBackground, } from 'react-native'
import { Table, Row, Col } from 'react-native-table-component'
import { styles, stylesAccepted } from './styles'
import { ip } from '../../../helpers/ip';



const Order = ({ route }) => {
  const [order, setOrder] = useState([])
  const { id, adress, status, orders, setOrders } = route.params;
  const [statusState, setStatusstate] = useState(status)
  const stylesArr = {
    'new': styles,
    'accepted': stylesAccepted,
    // 'closed': stylesClosed
  }

  console.log(adress, id, '<----adress , id')

  useEffect(() => {
    getOrder(id);
  }, []);

  async function getOrder(id) {
    try {
      let response = await fetch(ip + '/order', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      let json = await response.json();
      console.log(json, 'json in Order')
      setOrder(json);
    } catch (error) {
      console.log(error, 'error');
    }
  }

  async function accept(orderId, stat) {
    try {
      let response = await fetch(ip + '/accept', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });
      let acc = await response.json();
      if (acc['message'] === 'accepted') {
        setStatusstate(acc['message']);
        let newOrders = orders.map((value) => value.id === id ? { ...value, 'status': 'accepted' } : value)
        setOrders(newOrders)
      }
    } catch (error) {
      console.log(error, 'error');
    }
  }


  const tableHead = ['Блюдо', 'Кол-во', "цена", "опции"]
  const tableOpt = (arr) => (
    <Col
      data={arr}
      style={styles.Col}
      textStyle={styles.txtCol}
    ></Col>
  )

  return (
    <ScrollView
      style={stylesArr[statusState].container}
    >
      <View><Text>{adress}</Text></View>
      <View><Text>{id}</Text></View>

      <View><Text>{order.length ? order[0]['User.phone'] : '000'}</Text></View>

      <Table
        borderStyle={{ borderWidth: 1, borderColor: 'white' }}
        style={stylesArr[statusState].table}
      >
        <Row
          style={stylesArr[statusState].tablehead}
          textStyle={styles.headtxt}
          flexArr={[3, 1, 1, 2]}
          data={tableHead} />

        {order.map(el => (
          <Row
            key={el['Menu.id']}
            style={styles.tables}
            textStyle={styles.tabletxt}
            flexArr={[3, 1, 1, 2]}
            data={[el['Menu.item'], el.quantity, el['Menu.price'], tableOpt(el['options'])]}
          />
        )

        )}
      </Table>
      <View style={styles.btns}>
        <Pressable
          style={styles.pay}
          onPress={() => accept(id, statusState)}
        >
          <Text style={styles.text}>принять</Text></Pressable>
      </View>
    </ScrollView>)
}

export default Order
