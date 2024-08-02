import { StyleSheet } from "react-native";
import { colors } from '../../components/cssColors';


const { dark, light, darkBrown } = colors

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'red'
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 100,
  },
  administrator: {
    // height: 200,
    flex: 1,
    maxWidth: '100%',
    backgroundColor: light,

  },
  column: {
    flex: 1,
    backgroundColor: light,

  },
  category: {
    marginLeft: 5,
    marginBottom: 5,
    height: 200,
    width: '48%',
    borderWidth: 1,
    borderColor: dark,
    borderRadius: 20,
    backgroundColor: dark,
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
