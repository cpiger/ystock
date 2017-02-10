import { createStore, combineReducers } from 'redux';
import stockReducers from './stock';


const rootReducer = combineReducers({
  stockReducers
});


export default rootReducer;