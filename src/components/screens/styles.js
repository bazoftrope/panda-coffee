import { StyleSheet } from "react-native";
import { colors } from '../../components/cssColors'

const styles = StyleSheet.create({

  conteiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light,
    opacity: 1

  },

  img: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  back: {
    flex: 1,
    width: '100%'
  }

})

export { styles }
