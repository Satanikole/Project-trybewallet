import { combineReducers } from 'redux';
import loginReducer from './user';
import walletReducer from './wallet';

const reducers = combineReducers({ user: loginReducer, wallet: walletReducer });

export default reducers;
