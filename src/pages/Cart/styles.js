import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    backgroundColor: 'transparent',
  },
  cartItem: {
    margin: 5,
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
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
  btn: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  scrollCart: {
    height: '100%'
  },
  btnTobay: {
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderTopRadius: 2,
    borderTopColor: 'silver',
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
