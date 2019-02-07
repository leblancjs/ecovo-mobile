import { combineReducers } from 'redux';
import ui from './ui';
import navigation from './navigation';
import auth from './auth';

export default combineReducers({
    ui,
    navigation,
    auth
});
