// Coloque aqui suas actions

export const LOGIN = 'LOGIN';

export const loginAction = (email) => ({
  type: LOGIN,
  payload: {
    email,
  },
});

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const FAILED_REQUEST_CURRENCIES = 'FAILED_REQUEST_CURRENCIES';

const requestCurrenciesAction = () => ({ type: REQUEST_CURRENCIES });

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

const failedRequestCurrenciesAction = (error) => ({
  type: FAILED_REQUEST_CURRENCIES,
  payload: {
    error,
  },
});

export const fetchCurrenciesAction = () => (dispatch) => {
  dispatch(requestCurrenciesAction());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(getCurrenciesAction(json)))
    .catch((error) => dispatch(failedRequestCurrenciesAction(error)));
};
