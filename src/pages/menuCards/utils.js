import { Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { ip } from '../../helpers/ip';
import { colors } from '../../components/cssColors'


async function getCard(num, setData, setCat) {
  try {
    let response = await fetch(ip + '/card', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ menuId: num }),
    });
    let json = await response.json();
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
  return res;
}

function filterOptions(arr, str, makeOptions, options) {
  let res = arr.filter(el => el.cat === str);
  return res.map(el =>
    <TouchableOpacity
      style={
        options[el['cat']] && options[el['cat']].some(opt => opt.id === el['id'])
          ? styles.newOptext
          : styles.optext
      }

      onPress={() => makeOptions(el['id'], el['cat'], el['price'])} // Теперь makeOptions вызывается с 3 аргументами
      cat={el['cat']}
    >
      <Text
        style={{
          color: colors.light,
          textAlign: 'center',
          fontFamily: 'DudkaBold',
        }}
      >{el['option']}</Text>
    </TouchableOpacity>
  );
}

module.exports = { getCard, dublicatesCat, filterOptions };
