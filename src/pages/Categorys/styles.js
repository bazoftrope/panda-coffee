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

  imgPart: {
    flex: 2,
    color: 'black',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  txtPart: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: '',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textBlock: {
/*     width: '100%',
    height: '40%', */
    backgroundColor: 'green'
  },
  txt: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    width: 150,
  },
  btnTxt: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: 30,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
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
  modalBlock: {
/*     height: '100%',
    width: '100%', */
    backgroundColor: 'white',
/*     paddingHorizontal: 20,
    paddingVertical: 30, */
    borderRadius: 20,
     //  elevation: 20, 
  },
  modalImg: {
/*     width: '100%',
    height: '60%', */
  },
  heartPng: {
    width: 35,
    height: 35,
  },
  textBlock: {
    paddingLeft: 10,
/*     width: '100%',
    height: '30%', */
/*     marginTop: 40, */
  },
  options: {    // ?????
/*     marginBottom: '1%', */
    marginTop: '4%',  
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',

  },
  optionMark: {
    backgroundColor: 'black',
    flex: 1,
    height: 30,
    width: '40%',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center'
  },
  newOptionMark: {
    flex: 1,
    height: 40,
    width: '45%',
    marginHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  textMark: {
    marginTop: 3,
    color: 'white',
    letterSpacing: 2,

  },
  newTextMark: {
    color: 'white',
    marginTop: 8,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  toCart: {
    flex: 1,
    alignItems: 'center'
  }, 
  itemHeader: {
    color: 'black', 
    fontSize: 18, 
  },

});

export { styles }