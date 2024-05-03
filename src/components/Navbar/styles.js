import { StyleSheet } from "react-native";
import { colors } from '../../components/cssColors'

const styles = StyleSheet.create({
  administrator: {
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderTopWidth: 0.2,
  },
  mainContainer: {
    maxWidth: '100%',
    height: '6%',
    backgroundColor: colors.light

  },
  cartContainer: {
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  block: {
    height: '65%',
    width: '33.33%',
    fontSize: '40',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    backgroundColor: 'black',
    color: 'white',
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    left: 25,
    top: -5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    zIndex: 100,
  },
  img: {
    fontSize: 20,
    height: 30,
    width: 30,
  },
  imgCart: {
    height: 30,
    width: 37,
  }
});

export { styles }

