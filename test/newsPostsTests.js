/* global describe */
/* global it */

import expect from 'expect';
import state from './testState';
import {showNewsPosts} from '../src/reducers/functions/commentNavigation';
import _ from 'lodash';

describe('show news posts', () => {
    it('should find all news post', () => {
        let newState = showNewsPosts(state,{});
        expect(newState.visibleThreads.length).toEqual(8);
    });

    it('should find two news post', () => {
        let newState = showNewsPosts(state,{posts: [35274655,35272654]});
        expect(newState.visibleThreads.length).toEqual(2);
    });

    it('should find one unseen post', () => {
        let testState = _.cloneDeep(state);
        testState.unseenNewsPosts = [35274655,35272654]
        let newState = showNewsPosts(testState,{posts: [35272654]});
        
        expect(newState.visibleThreads.length).toEqual(1);
        expect(newState.visibleThreads[0].threadId).toEqual(35272654);

        expect(newState.unseenNewsPosts.length).toEqual(1);
        expect(newState.unseenNewsPosts[0]).toEqual(35274655);
    });

    it('should toggle visible news posts', () => {
        let testState = _.cloneDeep(state);
        testState.unseenNewsPosts = []
        testState.visibleThreads = [35274655,35272654]
        let newState = showNewsPosts(testState,{});

        expect(newState.visibleThreads.length).toEqual(0);
    });
})
    