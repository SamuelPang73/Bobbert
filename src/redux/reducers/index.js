import  { combineReducers } from 'redux' ;

import uploadReducer from './upload';

export default combineReducers({
    upload : uploadReducer,
});