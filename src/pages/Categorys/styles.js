import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainBlock: {
    width: '100%',
    height: '100%',
    display: 'flex',
    /*     flexDirection: 'column',
        justifyContent: 'space-between' */
  },
  list: {
    // flex: 1,
    margin: 5,
    flexDirection: 'column',
    height: 300,
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 5,
  },

  mediaBlock: {
    flex: 1,
    color: 'black',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },

  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },

  btnBlock: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', // Распределяет свободное пространство между элементами
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',

  },
  img: {
    width: 50, // Начальный размер изображения
    minHeight: 100,
  },
  btnTxt: {
    // flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'white',
    height: '15%',
    width: '80%',
    marginBottom: 5,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    color: 'black',
    elevation: 5,
  },



});

export { styles }
