import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { ip } from '../../helpers/ip';
import { styles } from './styles'


const Card = ({ route, navigation }) => {

  const [data, setData] = useState([])
  const [cat, setCat] = useState([])
  const { el } = route.params;
  console.log(el, 'el');

  useEffect(
    () => { getCard(el['arr'][0]['id']) }, []
  )
  async function getCard(num) {
    try {
      let response = await fetch(ip + '/test', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ menuId: num }),
      });
      let json = await response.json();
      console.log(json, 'Data---<'); // Теперь выводим полученные данные
      setData(json); // Обновляем состояние с новыми данными
      setCat(dublicatesCat(json))

    } catch (error) {
      console.log(error, 'error');
    }
  }

  function dublicatesCat(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
      if (!res.includes(arr[i].cat)) {
        res.push(arr[i].cat)
      }
    }
    return res
  }


  function filterOptions(arr, str) {
    let res = arr.filter(el => el.cat === str);
    return res.map(el => <Text style={styles.optext}>{el['option']}</Text>)

  }

  if (data) {
    return (
      <View style={styles.main_container}>
        <View
          style={styles.item}
        >
          <View style={styles.titel}>
            <Text
              style={styles.txtTitle}
            >{el['item']}</Text>
          </View>
          <View style={styles.items}>
            {
              el['arr'].map(
                (el, index) =>
                  <View
                    style={styles.lot}
                    key={el['id']}
                  >
                    <Image
                      style={[styles.img, { width: 50 + (index * 10), height: 50 }]}

                      source={require('../../components/images/cup.png')}
                      resizeMode='contain'
                    >

                    </Image>
                    <View
                      style={styles.txt}>
                      <Text
                        style={{
                          fontFamily: 'DudkaBold',
                        }}
                      >{el['price']}{'р.  '}{el['weight']}{'гр.'}</Text>

                    </View>

                  </View>
              )
            }

          </View>
        </View>
        <ScrollView
          style={styles.options}
        >
          <View>
            {cat?.map(el =>
              <View >
                <Text style={styles.cat}>{el}</Text>
                <View style={styles.opt}>{filterOptions(data, el)}</View>
              </View>
            )
            }

          </View>

        </ScrollView>
      </View>
    );
  };
}
export default Card;
