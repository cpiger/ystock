import { combineReducers } from 'redux';
import stockReducers from './stock';


const rootReducer = combineReducers({
  stock: stockReducers
});


export default rootReducer;