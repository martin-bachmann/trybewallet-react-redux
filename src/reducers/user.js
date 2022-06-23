// Esse reducer será responsável por tratar as informações da pessoa usuária

import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.payload.email,
    };
  default:
    return state;
  }
};

export default user;
