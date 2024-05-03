import { React, useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ip } from '../../helpers/ip';
import BottomSheetTwo from '../../components/BottomSheetTwo';

export default function Favourite() {
  const storeUserId = useSelector(st => st.userStoreId);
  const [favItems, setFavItems] = useState([
    { id: 0, item_id: 0, item: '', price: '', description: '', weight: '' },
  ]);
  const [dataCard, setDataCard] = useState({});
  const [heartVis, setHeartVis] = useState(false);
  const [show, setShow] = useState(false);
  const [options, setOptions] = useState([])
  const [newOptions, setNewoptions] = useState([]);

  const CardData = async id => {
    console.log(storeUserId, 'storeUserId', id, 'itemId');

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
    setShow(true);
  };

  function makeOptions(option) {
    if (!newOptions.includes(option)) {
      setNewoptions([...newOptions, option])
    } else {
      setNewoptions(newOptions.filter(el => el != option))
    }

    console.log(newOptions, 'newoptions')
  }

  const changeOfHeart = async () => {
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
      console.log(json, 'json');
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

  const findFavouriteItems = async () => {
    let response = await fetch(ip + '/favitems', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: storeUserId }),
    });
    let json = await response.json();
    console.log(json, '!!!!!!!!!!!!!!!!!!!!!!')
    setFavItems(json);
  };

  useEffect(() => {
    findFavouriteItems();
  }, [heartVis]);

  return (
    <View style={styles.container}>
            <View style={styles.headerFav}>
         <Text style={styles.textHeader}>Избранное</Text>
      </View>
      <ScrollView >
        {favItems.map(el => (
          <View key={el.id} style={styles.favBlock}>
            <TouchableOpacity
              onPress={() => {
                CardData(el['Menu.id']);
              }}
              style={styles.imgPart}>
              <ImageBackground
                style={styles.imgPart}
                source={{ uri: ip + '/images/' + el['Menu.item'] + '.jpg' }}
              />
            </TouchableOpacity>
            <View style={styles.textBlock}>
              <Text style={styles.header}>{el.item}</Text>
              <Text style={{ fontWeight: '500', marginBottom: 5, color: 'black',}}>{`${el['Menu.item']}`}</Text>
              <Text style={styles.txt}>{`Грамм: ${el['Menu.weight']}`}</Text>
              <Text style={styles.txt}>{`Цена: ${el['Menu.price']}`}</Text>
            </View>
          </View>
        ))}

      </ScrollView>

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
            <View style={{paddingLeft: 10}}>
              <View style={{display: 'flex', width: '100%',flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10,}}>
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
              <Text/> 
              <Text style={{color: 'black', fontSize: 14}}>{dataCard.description}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontWeight: 'bold',
  },
  modalBlock: {

  },
  mainBlock: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  favBlock: {
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
  imgPart: {
    flex: 2,
    color: 'black',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  heartPng: {
    width: 35,
    height: 35,
  },
   options: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',

  },
  optionMark: {
    backgroundColor: 'black',
    flex: 1,
    height: 30,
    width: '40%',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center'
  },
  newOptionMark: {
    flex: 1,
    height: 40,
    width: '45%',
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textMark: {
    marginTop: 3,
    color: 'white',
    letterSpacing: 2,

  },
  newTextMark: {
    color: 'white',
    marginTop: 8,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  toCart: {
    flex: 1,
    alignItems: 'center'
  }, 
  itemHeader: {
    color: 'black', 
    fontSize: 18, 
  },
  headerFav: {
    padding: 15,
  },
  textHeader: {
    color: 'black',
    fontSize: 19,
  },
  txt: {
    color: 'black',
  },
});