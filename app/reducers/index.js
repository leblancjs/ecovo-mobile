import { combineReducers } from 'redux';
import trip from './trip';
import navigation from './navigation';
import auth from './auth';
import vehicules from './vehicules'

export default combineReducers({
    auth,
    trip,
    navigation,
    vehicules
});
