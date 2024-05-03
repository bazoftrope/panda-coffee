import React, { useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
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
      let response = await fetch(ip + '/cat', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ num }),
      });
      let json = await response.json();
      console.log(json, 'json in category');
      setData(json);
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
              style={styles.imgPart}>
              <ImageBackground
                style={styles.imgPart}
                source={{ uri: ip + '/images/' + el.item + '.jpg' }}
              />
            </TouchableOpacity>
            <View style={styles.txtPart}>
              <Text style={styles.txt}>{el.item}</Text>
              <TouchableOpacity
                price={el.price}
                onPress={function () { toCart(storeUserId, el.id) }}
                style={styles.btn}>
                <Text style={styles.btnTxt}>{el.price + ' р.'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View />
      <BottomSheetTwo
        userId={storeUserId}
        newOptions={newOptions}
        show={show}
        onDismiss={() => setShow(false)}
        item={dataCard.item}
        id={dataCard.id}
        price={dataCard.price}>
        <View style={styles.modalBlock}>
          <View style={styles.mainBlock}>
            <View style={styles.modalImg}>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                paddingBottom: 30,
              }}>
              <ImageBackground
                style={{
                  width: '100%',
                  height: 210,
                  resizeMode: 'contain',
                }}
                source={{ uri: ip + '/images/' + dataCard.item + '.jpg' }}
              />
            </View>
            <View style={styles.textBlock}>
              <View style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 10, }}>
                <Text style={styles.itemHeader}>{dataCard.item}</Text>
                <View style={styles.heartView}>
                  <TouchableOpacity onPress={changeOfHeart}>
                    {heartVis ? (
                      <ImageBackground
                        style={styles.heartPng}
                        source={{
                          uri: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-256.png',
                        }}
                      />
                    ) : (
                      <ImageBackground
                        style={styles.heartPng}
                        source={{
                          uri: 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-512.png',
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <Text />
              <Text style={{ color: 'black', fontSize: 14 }}>{dataCard.description}</Text>
              <View style={styles.options}>
                {options.map(el => {
                  return (
                    <TouchableOpacity
                      onPress={() => makeOptions(el.id)}
                      style={newOptions.includes(el.id) ? styles.newOptionMark : styles.optionMark}
                      key={el.id}>

                      <Text
                        style={newOptions.includes(el.id) ? styles.newTextMark : styles.textMark}

                      >{el.title}</Text>

                    </TouchableOpacity>
                  )
                })}

              </View>
            </View>
          </View>
        </View>
      </BottomSheetTwo>
    </View>
  );
}
