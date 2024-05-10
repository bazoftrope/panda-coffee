import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  conteiner: {
    paddingTop: 5
  },
  ordersItem: {
    margin: 5,
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 5,
  },
  textItem: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10
  },
  scrollOrders: {
    height: '90%'
  },
  number: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',

  },
  txtNumber: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  content: {
    flex: 3,
    marginLeft: 10
  },
  adress: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    fontWeight: 'bold'

  }
})

const stylesAccepted = StyleSheet.create({
  conteiner: {
    paddingTop: 5
  },
  ordersItem: {
    margin: 5,
    flexDirection: 'row',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 5,
  },
  textItem: {
    flex: 1,
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10
  },
  scrollOrders: {
    height: '90%'
  },
  number: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',

  },
  txtNumber: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  content: {
    flex: 3,
    marginLeft: 10
  },
  adress: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    fontWeight: 'bold'

  }
})

export { styles, stylesAccepted }
