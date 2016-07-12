import _ from 'lodash';
import {processThread} from '../../util/apiservice';

export default function (state, chatty) {
    state.threads = _.map(chatty.threads, raw => processThread(raw));
    return state;
}