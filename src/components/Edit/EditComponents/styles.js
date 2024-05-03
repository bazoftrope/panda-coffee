import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  conteiner: {
    flex: 3,
  },
  element: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'black',
    // alignItems: 'center',
    justifyContent: 'center'
  },
  txt: {
    marginLeft: 10,
    // fontSize: 20,
    fontWeight: 'bold',
  },
  name: {
    flex: 3
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10
  },
  add: {
    flex: 1,
    maxHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',

  },
  scrollList: {
    flex: 1
  },
  addBtn: {
    height: '80%',
    width: '50%',
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',




  }


})

export { styles }
