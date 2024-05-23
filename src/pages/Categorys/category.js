import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';

import Animated, {
  useSharedValue,
} from 'react-native-reanimated';

import { PanGestureHandler } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { ip } from '../../helpers/ip';
import { styles } from './styles'
import BottomSheetTwo from '../../components/BottomSheetTwo';

export default function Hot_dog({ route }) {
  const navigation = useNavigation();

  const storeUserId = useSelector(st => st.userStoreId);
  const dispatch = useDispatch();
  const { num } = route.params;
  console.log(num, 'num')

  const dimensions = useWindowDimensions();
  const top = useSharedValue(dimensions.height);

  const [show, setShow] = useState(false);


  const [data, setData] = useState([{ id: 0, item: '', description: '' }]);
  const [dataCard, setDataCard] = useState({});
  const [heartVis, setHeartVis] = useState(false);
  const [options, setOptions] = useState([])
  const [newOptions, setNewoptions] = useState([]);

  const CardData = async id => {
    console.log(storeUserId, 'storeUserId');

    let responseFav = await fetch(ip + '/card', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: storeUserId, item: id }),
    });
    let Card = await responseFav.json();
    console.log(heartVis, 'heartVis');

    if (Card.favItem !== null) {
      setHeartVis(true);
    } else {
      setHeartVis(false);
    }


    setDataCard(Card.cardData);
    setOptions(Card.options)

    setShow(true);

  };




  useEffect(() => {
    async function FetchData() {
      try {
        let response = await fetch(ip + '/cat', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ num }),
        });
        let json = await response.json();
        console.log('Before processing:', JSON.stringify(json, null, 2));

        json.forEach(item => {
          if (item.children) {
            item.children = item.children.map(child => ({ id: child.id, name: child.name }));
          }
        });

        console.log('After processing:', JSON.stringify(json, null, 2));

        setData(json);
      } catch (error) {
        console.log(error, 'error');
      }

    }
    FetchData();
  }, []);







  const changeOfHeart = async () => {
    console.log(dataCard.id, 'item_id');
    setHeartVis(!heartVis);
    if (!heartVis) {
      let response = await fetch(ip + '/favourite', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: storeUserId, item: dataCard.id }),
      });
      let json = await response.json();
    }
    if (heartVis) {
      let response = await fetch(ip + '/dislike', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: storeUserId, item: dataCard.id }),
      });
      let json = await response.json();
      console.log(json);
    }
  };
  const toCart = async (userID, itemID, options) => {
    console.log(userID, itemID)
    let response = await fetch(ip + '/tocart', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userID, item_id: itemID, options: options, quantity: 1 })
    })
    dispatch({ type: 'ADD_TO_CART', payload: 1 })
    setNewoptions([])

  }

  function makeOptions(option) {
    if (!newOptions.includes(option)) {
      setNewoptions([...newOptions, option])
    } else {
      setNewoptions(newOptions.filter(el => el != option))
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {data.map((el) => (
          <View key={el.id} style={styles.list}>
            <TouchableOpacity
              onPress={() => navigation.navigate('card', { el })}
              style={styles.mediaBlock}>
              <Text style={styles.title} >{el.item}</Text>
            </TouchableOpacity>


            <View
              style={styles.btnBlock}>

              <View style={styles.box}>
                {el.arr?.map((element, index) => (
                  <TouchableOpacity
                    key={element.id}
                    onPress={() => alert(element.id)}
                    style={styles.btn}>
                    <Image
                      style={[styles.img, { width: 50 + (index * 10), height: 50 }]}
                      resizeMode='contain'
                      source={require('../../components/images/cup.png')}
                    />
                    <Text style={styles.btnTxt}>{element.price} р.</Text>
                  </TouchableOpacity>
                ))}
              </View>

            </View>
          </View>
        ))}
      </ScrollView>
      <View />
    </View>
  );
}
