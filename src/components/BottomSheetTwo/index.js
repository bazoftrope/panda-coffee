import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Text,
  Button,
  Pressable,
} from 'react-native';

import { PanGestureHandler } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { ip } from '../../helpers/ip';


export default function BottomSheetTwo({
  userId,
  id,
  newOptions,
  show,
  onDismiss,
  children,
  item,
  price
}) {

  const [open, setOpen] = useState(show);
  const [quantity, setQuantity] = useState(1);
  const [overallPrice, setOverallPrice] = useState(0);

  const deviceWidth = Dimensions.get('window').width;
  const bottomSheetHeight = Dimensions.get('window').height * 0.69;
  const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
  const dispatch = useDispatch();


  const onGesture = event => {
    if (event.nativeEvent.translationY > 0) {
      bottom.setValue(-event.nativeEvent.translationY);
    }
  };

  const onGestureEnd = event => {
    if (event.nativeEvent.translationY > bottomSheetHeight / 2) {
      onDismiss();
      setQuantity(1)
    } else {
      bottom.setValue(0);
    }
  };

  useEffect(() => {
    if (show) {
      setOpen(show);
      Animated.timing(bottom, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -bottomSheetHeight,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setOpen(false);
      });
    }
    setOverallPrice(price)
    console.log(overallPrice, 'overallprice')
  }, [show]);

  function quantityPrice(mark) {

    setQuantity(mark ? quantity + 1 : quantity > 1 ? quantity - 1 : quantity);
    setOverallPrice(mark ? overallPrice + price : overallPrice > price ? overallPrice - price : price)

  }

  const toCart = async (userID, itemID, options, quantity, price) => {
    console.log(userID, itemID, options, quantity, price)
    let response = await fetch(ip + '/tocart', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userID,
        item_id: itemID,
        options: options,
        quantity,
        price
      })
    })
    dispatch({ type: 'ADD_TO_CART', payload: quantity })
    // setNewoptions([])
  }

  return (
    <Animated.View
      style={[
        styles.root,
        {
          height: bottomSheetHeight,
          bottom: bottom,
          shadowOffset: {
            height: -3,
          },
        },
        styles.common,
      ]}>
      <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
        <View
          style={[
            styles.header,
            styles.common,
            {
              shadowOffset: {
                height: 3,
              },
            },
          ]}>
          <View
            style={{
              width: 40,
              height: 3,
              borderRadius: 1.5,
              position: 'absolute',
              top: 8,
              left: (deviceWidth - 40) / 2,
              zIndex: 10,
              backgroundColor: '#ccc',
            }}
          />
        </View>
      </PanGestureHandler>
      <ScrollView>{children}</ScrollView>
      <View style={styles.footer}>
        <View style={styles.buttons}>
          <Pressable
            style={styles.quantity}
            onPress={() => quantityPrice(0)}
          >
            <Text style={{ color: 'white' }}>{'-'}</Text>
          </Pressable>
          <Pressable
            style={styles.quantity}
            onPress={() => quantityPrice(1)}
          >
            <Text style={{ color: 'white' }}>{'+'}</Text>
          </Pressable>
          <View style={styles.button}>
            <Pressable onPress={() => toCart(userId, id, newOptions, quantity, price)}>
              <Text style={{ color: 'white' }}>{quantity + 'шт/ '}{overallPrice} ₽</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  header: {
    height: 30,
    backgroundColor: '#fff',
  },
  common: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    elevation: 3,
  },
  footer: {
    position: 'relative',
    height: 90,
    /*     backgroundColor: '#fff', */
    zIndex: 2,
    bottom: 0,
  },
  textBlock: {
    display: 'flex',
    width: '100%',
    height: 35,
  },
  buttons: {
    paddingHorizontal: 60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    /*     backgroundColor: 'red', */
    height: '100%',
    alignItems: 'center',
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
    height: '50%',
    /*     width: 40,
    height: 36, */
    backgroundColor: 'black',
    borderRadius: 8,
    justifyContent: 'space-around',
    borderWidth: 0.9,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'black',
    width: '50%',
    height: '50%',
    borderRadius: 8,
    justifyContent: 'center',
  },
});
