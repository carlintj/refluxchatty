import {initialState} from './initialState';
import _ from 'lodash';
import chattyhandlers from './functions/'
import uihandlers from './userfunctions/';

const handlers = _.merge(chattyhandlers, uihandlers);

export default function(state = initialState, action) {
    //let newState = _.cloneDeep(state);
    let newState = {...state};
    
    if(_.has(handlers, action.type)) {
        return handlers[action.type](newState, action);
    }

    console.log('no handler for ', action.type);
    return newState;
}