// Coloque aqui suas actions
// Login actions
export const LOGIN = 'LOGIN';

export const loginAction = (email) => ({
  type: LOGIN,
  payload: {
    email,
  },
});

// Fetch currencies actions
export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const FAILED_REQUEST = 'FAILED_REQUEST';

const requestAPI = () => ({ type: REQUEST_API });

const sendCurrenciesAction = (currencies) => ({
  type: GET_CURRENCIES,
  payload: {
    currencies,
  },
});

const getCurrenciesAction = (currencies) => (dispatch) => {
  const currenciesArray = Object.keys(currencies).filter((e) => e !== 'USDT');
  // Object.entries(currencies).filter((e) => e[0] !== 'USDT');
  return dispatch(sendCurrenciesAction(currenciesArray));
};

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: {
    error,
  },
});

export const fetchCurrenciesAction = () => (dispatch) => {
  dispatch(requestAPI());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(getCurrenciesAction(json)))
    .catch((error) => dispatch(failedRequest(error)));
};

// Save expense actions
export const GET_RATE = 'GET_RATE';

const getExchangeRateAction = (exchangeRates, expense) => ({
  type: GET_RATE,
  payload: { newExpense: { ...expense, exchangeRates } },
});

export const saveExpenseAction = (expense) => (dispatch) => {
  dispatch(requestAPI());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(getExchangeRateAction(json, expense)))
    .catch((error) => dispatch(failedRequest(error)));
};

// Remove expense actions

export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const removeExpenseAction = (expenses) => ({
  type: REMOVE_EXPENSE,
  payload: {
    expenses,
  },
});

// Edit expense actions

export const EDIT_START = 'EDIT_START';
export const EDIT_END = 'EDIT_END';

export const editExpenseAction = (id) => ({
  type: EDIT_START,
  payload: {
    id,
  },
});

export const endEditExpenseAction = (expenses) => ({
  type: EDIT_END,
  payload: {
    expenses,
  },
});
