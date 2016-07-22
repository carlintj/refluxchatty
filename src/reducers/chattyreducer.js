import {initialState} from './initialState';
import _ from 'lodash';
import handlers from './functions/'

export default function(state = initialState, action) {
    let newState = _.cloneDeep(state);
    
    if(_.has(handlers, action.type)) {
        return handlers[action.type](newState, action);
    }

    console.log('no handler for ', action.type);
    return newState;
}