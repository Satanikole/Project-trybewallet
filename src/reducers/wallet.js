import { WALLET, DELETE_EXPENSE, API } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API:
    return state;
  case WALLET:
    return {
      ...state,
      currencies: [],
      expenses: [
        ...state.expenses,
        {
          ...action.expense,
          exchangeRates: action.exchangeRates,
        },
      ],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense !== action.expense),
    };
  default:
    return state;
  }
};

export default walletReducer;
