import { StyleSheet } from "react-native";
import { colors } from "../../components/cssColors"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light
  },
  current: {
    alignItems: 'center'

  },
  order: {
    flex: 3,
    // flexDirection: 'row',
    backgroundColor: 'powderblue'
  },
  list: {
    flexDirection: 'column'
  },
  item: {
    marginTop: 10
  },
  pay: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 8,
  },
  history: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: '#008080',
    width: '50%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10


  },
  text: {
    color: 'white',
    letterSpacing: 2,
    fontSize: 15
  },
  table: {
    backgroundColor: colors.dark,
    marginHorizontal: 10,
    marginTop: 10,
    border: { borderWidth: 1, borderColor: 'white' }
  },
  tables: {
    Height: 100
  },
  tablehead: {
    height: 30,
  },
  headtxt: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',

  },
  tabletxt: {
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    marginLeft: 10,
    fontSize: 13,
  },
  Col: {
    alignItems: 'flex-end',
    marginEnd: 10
  },
  txtCol: {
    height: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 8,
  },
  btns: {
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: 'flex-end'
  },
  inPut: {
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    marginTop: 10
  }


})

export { styles }
