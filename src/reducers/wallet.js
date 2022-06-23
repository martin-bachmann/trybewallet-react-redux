// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FAILED_REQUEST_CURRENCIES,
  GET_CURRENCIES,
  REQUEST_CURRENCIES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      isFetching: false,
      currencies: action.payload.currencies,
    };
  case FAILED_REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: false,
      error: action.payload.error,
    };
  default:
    return state;
  }
};

export default wallet;
