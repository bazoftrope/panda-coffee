import { StyleSheet } from "react-native";
import { colors } from "../../components/cssColors"

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    backgroundColor: colors.light,
  },
  cartItem: {
    margin: 5,
    flexDirection: 'row',
    height: 100,
    backgroundColor: colors.dark,
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 5,
  },
  textItem: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 10,
  },
  txt: {
    color: colors.light,
    fontFamily: 'DudkaBold',

  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,

  },
  scrollCart: {
    height: '100%'
  },
  btnTobay: {
    borderStyle: 'solid',
    borderTopRadius: 2,
    borderTopColor: 'transparent',
    borderTopWidth: 0.6,
    padding: 20,
    width: '100%',
    height: '35%',
    display: 'flex',
    alignItems: 'center',
    /*     alignItems: 'center' */
    /*     height: '10%' */
  },
  btnCart: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 8,
  },
  btnStyle: {
    height: '80%',
    width: '84%',
  },
  optList: {
    fontFamily: 'DudkaBold',
    fontSize: 8,
    color: colors.light
  }
  // cartOptions: {
  //   color: 'black',
  //   backgroundColor: 'red'
  // },
  // nocartOptions: {

  //   color: 'white',
  //   visibility: 'hide'
  // }
})

export { styles }
