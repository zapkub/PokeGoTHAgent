
import { createStore, combineReducers } from 'redux';
import { map } from './reducers/map.reducer';
const rootReducers = combineReducers({map});
export default rootReducers;
