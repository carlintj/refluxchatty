import * as types from '../actions/chattyactions';
import {initialState} from './initialState';
import _ from 'lodash';
import getChatty from './functions/getChatty';

export default function(state = initialState, action) {
    let newState = _.cloneDeep(state);
    console.log('parsing', action.type);
    switch(action.type) {
        case types.GETCHATTYCOMPLETED: 
            return getChatty(newState, action.chatty);
        default:
            return newState;
    }
}