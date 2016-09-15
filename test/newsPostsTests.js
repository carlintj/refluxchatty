/* global describe */
/* global it */

import expect from 'expect';
import state from './testState';
import {showNewsPosts} from '../src/reducers/functions/commentNavigation';

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
        state.unseenNewsPosts = [35274655,35272654]
        let newState = showNewsPosts(state,{posts: [35272654]});
        
        expect(newState.visibleThreads.length).toEqual(1);
        expect(newState.visibleThreads[0].threadId).toEqual(35272654);

        expect(newState.unseenNewsPosts.length).toEqual(1);
        expect(newState.unseenNewsPosts[0]).toEqual(35274655);
    });

    it('should toggle visible news posts', () => {
        state.unseenNewsPosts = []
        state.visibleThreads = [35274655,35272654]
        let newState = showNewsPosts(state,{});

        expect(newState.visibleThreads.length).toEqual(0);
    });
})
    