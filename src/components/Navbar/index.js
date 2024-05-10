import { React, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, Pressable, Image, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './styles'
import { ip } from '../../helpers/ip';



export default function Navbar() {

  const dispatch = useDispatch();
  const store = useSelector(st => st.cartStore);
  const storeUserId = useSelector(st => st.userStoreId);
  const storePaymentId = useSelector(st => st.confPaymentId);
  console.log(storeUserId, 'storeuserid in nawbar')

  useEffect(() => {
    getCart()
  }, [storePaymentId])

  const getCart = async () => {
    try {
      let response = await fetch(ip + '/getcart', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeUserId }),
      })
      let Cart = await response.json()
      console.log(Cart, 'cart<______________________________________________oooooooooo')
      dispatch({ type: 'ADD_TO_CART', payload: Cart.length })
    } catch (error) {
      console.log(error)
    }
  };

  const navigation = useNavigation();

  return (

    <View style={styles.mainContainer}>
      {storePaymentId ? (
        <View style={styles.cartContainer}>
          <Pressable onPress={() => navigation.navigate('Paid Orders')}>
            {store > 0 ?
              <Text style={styles.badge}>{store}</Text>
              : <></>
            }
            <Image style={styles.imgCart} source={require('./cart.png')} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.administrator}>
          <View style={styles.block}>
            <Pressable onPress={() => navigation.navigate('Главная')}>
              <Image style={styles.img} source={require('./home.png')} />
              {/*           <Text style={styles.text}>PANDA</Text> */}
            </Pressable>
          </View>
          <View style={styles.block}>
            <Pressable onPress={() => navigation.navigate('Корзина')}>
              {store > 0 ?
                <Text style={styles.badge}>{store}</Text>
                : <></>
              }
              <Image style={styles.imgCart} source={require('./cart.png')} />
            </Pressable>
          </View>
          <View style={styles.block}>
            <Pressable onPress={() => navigation.navigate('Аккаунт')}>
              <Image style={styles.img} source={require('./user.png')} />
            </Pressable>
          </View>
          <View style={styles.block}>
            <Pressable onPress={() => navigation.navigate('splashscreen')}>
              <Image style={styles.img} source={require('./user.png')} />
            </Pressable>
          </View>

        </View>
      )}
    </View>
  );
}

