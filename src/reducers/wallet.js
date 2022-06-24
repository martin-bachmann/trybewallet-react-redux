// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FAILED_REQUEST,
  GET_CURRENCIES,
  GET_RATE,
  REMOVE_EXPENSE,
  REQUEST_API,
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
  case REQUEST_API:
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
  case GET_RATE:
    return {
      ...state,
      isFetching: false,
      expenses: [...state.expenses, action.payload.newExpense],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.payload.expenses,
    };
  case FAILED_REQUEST:
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
