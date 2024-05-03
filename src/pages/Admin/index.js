import { React, useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, ImageBackground, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles, stylesAccepted } from './styles';
import { ip } from '../../helpers/ip';

const Admin = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([])
  console.log('orders----->', orders)

  const stylesObj = {
    'new': styles,
    'accepted': stylesAccepted
  }

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      let response = await fetch(ip + '/orders');
      let json = await response.json();
      setOrders(json);
    } catch (error) {
      console.log(error, 'error');
    }
  }

  return (
    <View style={styles.conteiner}>
      <ScrollView style={styles.scrollOrders}>
        {orders.map(el => (
          <TouchableOpacity
            key={el.id} style={styles.ordersItem}
            onPress={() => {
              navigation.navigate(
                'Заказ',
                {
                  id: el.id,
                  adress: el['adress'],
                  status: el.status,
                  orders: orders,
                  setOrders: setOrders
                });
            }}>
            <View style={stylesObj[el['status']].textItem}>
              <View style={stylesObj[el['status']].number}>
                <Text style={styles.txtNumber}>{el.id}</Text>
              </View>

              <View style={styles.content}>
                <Text style={styles.adress}>{el.adress}</Text>
                <Text>{el.comment === null ? '' : el.comment}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
        )}
      </ScrollView>
    </View>
  )

}

export default Admin






// const data = [
//   {
//       id: 1,
//       title: 'Данные продаж',
//       img: 'sendvich',
//     },
//     {
//       id: 2,
//       title: 'Заказы',
//       img: 'hot-dog',
//     },
//     {
//       id: 3,
//       title: 'Данные заказов',
//       img: 'coffee',
//     },
//     {
//       id: 4,
//       title: 'Отчеты',
//       img: 'firmcoffee',
//     },
//     {
//       id: 5,
//       title: 'Прибыль',
//       img: 'sirop',
//     },
//     {
//       id: 6,
//       title: 'Данные клиентов',
//       img: 'cacao',
//     }
// ]
// return (
//   <View style={styles.column}>
//       {data.map(el => (
//         <TouchableOpacity
//           key={el.id}
//           style={styles.category}
//           onPress={() => navigation.navigate('Меню', { num: el.id })}>
//           <ImageBackground
//             style={styles.image}
//             source={{ uri: ip + '/images/' + el.img + '.jpg' }}>
//             <Text style={styles.text}>{el.title}</Text>
//           </ImageBackground>

//         </TouchableOpacity>
//       ))}
//     </View>
// )

