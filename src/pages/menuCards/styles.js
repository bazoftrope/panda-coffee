import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  item: {
    flex: 1,
    maxHeight: 200,
    backgroundColor: 'yellow'
  },
  options: {
    flex: 3,
    backgroundColor: 'grey'
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
    textAlign: 'center'
  },
  opt: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  optext: {
    textAlign: 'center',
    textAlignVertical: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    width: '32%',
    height: 35,
    marginTop: 3
  }



});

export { styles }
