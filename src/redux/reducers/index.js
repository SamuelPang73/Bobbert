import  { combineReducers } from 'redux' ;

import uploadReducer from './upload';
import productsReducer from './products'

export default combineReducers({
    upload : uploadReducer,
    products : productsReducer,
});