import actionTypes from './types';

export const logUser = value => ({
  type: actionTypes.USER_LOG,
  payload: { value },
});

export const cartCount = value => ({
  type: actionTypes.ADD_TO_CART,
  payload: { value },
},
{
  type: actionTypes.REMOVE_FROM_CART,
  payload: { value },
})

export const userId = value => ({
  type: actionTypes.USER_ID,
  payload: { value },
});

export const admin = value => ({
  type: actionTypes.Admin,
  payload: { value }
})

export const createPaymentId = value => ({
  type: actionTypes.CREATE_PAYMENT_ID,
  payload: { value }
})

export const getPaymentValue = value => ({
  type: actionTypes.GET_PAYMENT_VALUE,
  payload: { value }
})

export const createOrderPaidId = value => ({
  type: actionTypes.CREATE_ORDER_PAID_ID,
  payload: { value }
})
