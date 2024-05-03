import actionTypes from './types';
import ip from '../helpers/ip';

const INITIAL_STATE = {
  userStore: {
    logged: false,
  },
  cartStore: 0,
  userStoreId: {
    id: 0,
  },
  admin: {
    role: '',
  },
  confPaymentId: '',
  paymentValue: '',
  orderPaidId: '',
};


//! 2

export const reducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.USER_LOG:
      return {
        ...state,
        userStore: action.payload.value,
      };
    case actionTypes.ADD_TO_CART:
      return { ...state, cartStore: state.cartStore + action.payload }
    case actionTypes.REMOVE_FROM_CART:
      // return {...state,
      //   cartStore: state.cartStore.filter(cartItem => cartItem.id !== action.payload.id)
      // }
      return {
        ...state,
        cartStore: state.cartStore - action.payload
      }
    case actionTypes.USER_ID:
      return {
        ...state,
        userStoreId: action.payload.value,
      };

    case actionTypes.ADD_TO_CART:
      return { ...state, cartStore: state.cartStore + action.payload }

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartStore: state.cartStore - action.payload
      }

    case actionTypes.BYE_CART:
      return { ...state, cartStore: state.cartStore = action.payload }
    case actionTypes.Admin:
      return {
        ...state,
        admin: action.payload.value
      }
    case actionTypes.CREATE_PAYMENT_ID:
      return {...state, confPaymentId: action.payload.value
      }
    case actionTypes.GET_PAYMENT_VALUE:
        return {...state, paymentValue: action.payload.value}
    case actionTypes.CREATE_ORDER_PAID_ID:
          return {...state, orderPaidId: action.payload.value}
    /* const updatedState = state.map(el => {
        if (el.key === action.token) {
          return {
            ...el,
            el: !el.logged,
          };
        }
        return el;
      });
      return updatedState; */

    /*   return {
        ...state,
        userStore: state.userStore.map(n =>
          n.currentUser === action.payload.token
            ? {...n, isLoggingIn: !n.isLoggingIn}
            : n,
        ),
      }; */

    /* case actionTypes.DEL_TODO:
      return {
        ...state,
        todos: state.todos.filter(item => item.id !== action.payload.id),
      };
    case actionTypes.DEL_ALL_TODOS:
      return {...state, todos: []};
    case actionTypes.ADD_TODO:
      return {...state, todos: [...state.todos, action.payload.todo]};
    case actionTypes.SET_LOADING:
      return {...state, isLoading: action.payload.isLoading};
    case actionTypes.ERROR:
      return {...state, error: action.payload.msg};
      */
    default:
      return state;
  }

};
// const CartItems = (state = CART_STATE, action) => {
//   switch (action.type) {
//       case actionTypes.ADD_TO_CART:
//           return [...state, action.payload]
//       case actionTypes.REMOVE_FROM_CART:
//           return state.filter(cartItem => cartItem.id !== action.payload.id)
//   }

//   return state
// }
// export default CartItems;
