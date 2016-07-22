import _ from 'lodash';
import {processThread} from '../../util/apiservice';

export default function (state, action) {
    state.threads = _.map(action.chatty.threads, raw => processThread(raw));
    return state;
}