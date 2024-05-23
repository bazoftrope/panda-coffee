import { StyleSheet } from "react-native";
import { colors } from '../../components/cssColors';


const { dark, light, darkBrown } = colors

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'red'
  },
  administrator: {
    flex: 1,
    maxWidth: '100%',
    // alignItems: 'center',
    backgroundColor: light
  },
  column: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    maxHeight: 220,
    width: '100%',
    backgroundColor: light,

  },
  category: {

    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    // flexDirection: 'column',
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: dark,
    borderRadius: 20,
    backgroundColor: dark
    // shadowColor: 'rgb(87, 152, 109)',
    // elevation: 5,
  },


  text: {
    flex: 1,
    textAlign: 'center',
    color: light,
    fontFamily: 'DudkaBold',
    fontSize: 30,

    margin: 10,
  },
  img: {
    height: 40,
    width: 50,
  },
  status: {
    flex: 1,
    paddingTop: '10%',
    alignItems: 'center',
  },



  image: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',

  }
});

export { styles }
