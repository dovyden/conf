import {combineReducers} from 'redux';
import activeTab from './activeTab';
import content from './content';

const drReducer = combineReducers({
    content,
    activeTab
});

export default drReducer;
