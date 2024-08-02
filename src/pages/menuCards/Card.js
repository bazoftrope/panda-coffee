import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ip } from '../../helpers/ip';
import { styles } from './styles';
import { getCard, filterOptions } from './utils'; // Импорт функции
import { useSelector, useDispatch } from 'react-redux';




const Card = ({ route, navigation }) => {
  const storeUserId = useSelector(st => st.userStoreId);

  const { el } = route.params;

  const [data, setData] = useState([])
  const [cat, setCat] = useState([])

  //формируем данные для единицы заказа
  const [item, setItem] = useState({ id: el['arr'][0]['id'], price: null });
  const [options, setOptions] = useState({ 'альтернативное молко': [], 'зерно': [] })
  const [price, setPrice] = useState(el['arr'][0]['price'])
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch();

  useEffect(() => {
    getCard(el['arr'][0]['id'], setData, setCat);
  }, []);


  function makeItems(menuLot, menuPrice) {
    setItem({ id: menuLot, price: menuPrice });
    setPrice(menuPrice)
  }

  function makeOptions(option, category, optPrice) {
    // Получаем текущее состояние опций
    let currentOptions = options[category] || [];

    // Проверяем, существует ли уже такая опция
    const isExistingOption = currentOptions.some(item => item.id === option);

    if (isExistingOption) {
      // Если опция существует, удаляем её из массива
      currentOptions = currentOptions.filter(item => !(item.id === option));
      if (category != 'зерно' && category != 'альтернативное молко') setPrice(price - optPrice)
      console.log('замена опции')
    }
    // Обновляем состояние опций
    setOptions(prevState => ({
      ...prevState,
      [category]: currentOptions

    }));
    // Добавляем новую опцию, если она не существует
    if (!isExistingOption) {
      const newOption = { id: option, price: optPrice };
      setOptions(prevState => ({
        ...prevState,
        [category]: [...currentOptions, newOption]
      }));
      if (category != 'зерно' && category != 'альтернативное молко') setPrice(price + optPrice)
      console.log('добавили если нет', category)

    }

    // Специальное условие для категорий 'зерно' и 'альтернативное молко'
    if (['зерно', 'альтернативное молко'].includes(category)) {

      // Получаем текущее состояние опций для этой категории
      let currentOptions = options[category] || [];

      // Проверяем, существует ли уже такая опция
      const isExistingOption = currentOptions.some(item => item.id === option);

      if (isExistingOption) {
        // Если опция существует, удаляем её из массива
        currentOptions = currentOptions.filter(item => !(item.id === option));
        setPrice(price - optPrice)

      } else {
        // Добавляем новую опцию, если она не существует
        const newOption = { id: option, price: price };
        setOptions(prevState => ({
          ...prevState,
          [category]: [newOption] // Заменяем содержимое массива на новый объект
        }));
        if (!options[category].length) { setPrice(price + optPrice) } else { setPrice(price + 0) }
        console.log('выбор другой спец ', options, category, 'got caegory', options[category])
      }
    }
    console.log(options, 'options in makeoptions<<<<<<<<<<<<<<<')

  }

  async function toCart(menuItem, optItems, userId, sum, q) {
    const menuId = menuItem.id;
    let optionIds = []
    for (key in optItems) {
      optItems[key].map(el => optionIds.push(el.id))
    }
    try {
      let response = await fetch(ip + '/tocart', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, Item: menuId, Options: optionIds, price: sum, quantity: q }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      let json = await response.json();
      console.log("Dispatching ADD_TO_CART", { type: 'ADD_TO_CART', payload: 1 });
      dispatch({ type: 'ADD_TO_CART', payload: 1 })

    } catch (error) {
      console.log(error, 'error');
    }


  }

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
                <TouchableOpacity
                  onPress={() => makeItems(el['id'], el['price'])}
                  style={item.id === el['id'] ? styles.newlot : styles.lot}
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
                </TouchableOpacity>
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
              <View style={styles.opt}>{filterOptions(data, el, makeOptions, options)}</View>
            </View>
          )
          }
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.toCartbtn}
        onPress={() => toCart(item, options, storeUserId, price, quantity)}
      >
        <Text style={styles.txtbtn}>в корзину   {price}{'-'}{quantity}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
