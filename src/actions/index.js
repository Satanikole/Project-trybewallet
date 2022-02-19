import fetchApi from '../services/api';

export const LOGIN = 'LOGIN';
export const WALLET = 'WALLET';
export const API = 'API';
export const API_ERROR = 'API_ERROR';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const getLogin = (email) => ({
  type: LOGIN,
  email,
});

export const apiRequest = () => ({
  type: API,
});

export const getCoins = (expense, coins) => ({
  type: WALLET,
  expense,
  exchangeRates: coins,
});

export const apiFail = (error) => ({
  type: API_ERROR,
  error,
});

export const fetchedCoins = (expense) => (dispatch) => {
  dispatch(apiRequest());
  return fetchApi().then(
    (coins) => dispatch(getCoins(expense, coins)),
    (error) => dispatch(apiFail(error.message)),
  );
};

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

// Referenciando uma colega de turma chamada Kaylane por ter me ajudado com erros que aconteceram no meu fetch.
