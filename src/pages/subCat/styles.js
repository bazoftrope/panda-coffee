import { StyleSheet } from "react-native";
import { colors } from '../../components/cssColors'


const styles = StyleSheet.create({
  mainbox: {
    flex: 1,
    padding: 10, // Небольшие отступы внутри контейнера
    backgroundColor: colors.light

  },
  cat: {
    backgroundColor: colors.darkBrown,
    borderRadius: 5, // Сглаженные углы
    marginVertical: 8, // Отступы между элементами
    justifyContent: 'center',
    alignItems: 'center',
    height: 100, // Высота элемента
  },
  txt: {
    color: colors.light,
    fontFamily: 'DudkaBold',
    fontSize: 30
  }
})

export { styles }
