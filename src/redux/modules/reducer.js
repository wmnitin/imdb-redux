import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import movie from './movie';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  movie
});
