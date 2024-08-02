import { StyleSheet } from "react-native";
import { colors } from '../../components/cssColors'

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: colors.light,

  },
  item: {
    flex: 1,
    maxHeight: 200,
    backgroundColor: colors.light
  },
  options: {
    flex: 3,
    backgroundColor: colors.light
  },
  titel: {
    flex: 1,
    alignItems: 'center',

  },
  txtTitle: {
    fontFamily: 'DudkaBold',
    fontSize: 25
  },
  items: {
    flex: 2,
    flexDirection: "row",
    justifyContent: 'space-around',

  },
  lot: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderBlockColor: 'black',
    borderRadius: 10,
    width: '30%',
    height: '90%',
    alignItems: 'center',
  },
  newlot: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderBlockColor: 'red',
    borderRadius: 10,
    width: '30%',
    height: '90%',
    alignItems: 'center',
    backgroundColor: 'red'
  },

  img: {
    flex: 3,
    width: '50%',
    height: '50%',


  },
  txt: {
    flex: 1,
    flexDirection: "row",
    fontFamily: 'DudkaBold',
  },
  cat: {
    textAlign: 'center',
    fontFamily: 'DudkaBold',

  },
  opt: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  optext: {
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    width: '32%',
    height: 35,
    marginTop: 3,
    backgroundColor: colors.dark,
  },
  newOptext: {
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    width: '32%',
    height: 35,
    marginTop: 3,
    backgroundColor: 'yellow',
  },
  toCartbtn: {
    paddingTop: 5,
    height: 40,
    alignItems: 'center',
  },
  txtbtn: {
    textAlignVertical: 'center',
    height: 30,
    width: '30%',
    textAlign: 'center',
    borderStyle: 'solid',
    borderBlockColor: colors.dark,
    borderWidth: 1,
    borderRadius: 10
  }



});

export { styles }
