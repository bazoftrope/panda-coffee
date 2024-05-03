import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    alignItems: 'center',
    backgroundColor: '#DC143C',
    width: '50%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10

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
    fontWeight: 'bold'
  },
  table: {
    backgroundColor: 'grey',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10
  },
  tables: {
    height: 60
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
    marginLeft: 10
  },
  Col: {
    alignItems: 'flex-end',
    marginEnd: 10
  },
  txtCol: {
    color: 'black',
    fontWeight: 'bold'
  },
  btns: {
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: 'flex-end'
  }


})

const stylesAccepted = StyleSheet.create({
  container: {
    flex: 1
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
    alignItems: 'center',
    backgroundColor: '#DC143C',
    width: '50%',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10

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
    fontWeight: 'bold'
  },
  table: {
    backgroundColor: 'green',
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10
  },
  tables: {
    height: 60
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
    marginLeft: 10
  },
  Col: {
    alignItems: 'flex-end',
    marginEnd: 10
  },
  txtCol: {
    color: 'black',
    fontWeight: 'bold'
  },
  btns: {
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: 'flex-end'
  }


})

export { styles, stylesAccepted }
