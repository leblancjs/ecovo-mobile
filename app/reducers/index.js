import { combineReducers } from 'redux';
import ui from './ui';
import navigation from './navigation';

export default combineReducers({
    ui,
    navigation
});
