import { combineReducers } from 'redux';
import welcome from './welcome';
import signup from './signup';

export default combineReducers({
    welcome,
    signup
});
