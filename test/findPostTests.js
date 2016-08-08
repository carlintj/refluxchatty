/* global describe */
/* global it */
import expect from 'expect';
import findPost from '../src/reducers/functions/findPost';
import state from './testState';

describe('find posts', () => {
    it('should find a parent post', () => {
        let post = findPost(state.threads, 35274460);
        expect(post).toExist();
        expect(post.id).toEqual(35274460);
    });

    it('should find a child post', () => {
        let post = findPost(state.threads, 35274556);
        expect(post).toExist();
        expect(post.id).toEqual(35274556);
    });
    it('should find a grandchild post', () => {
        let post = findPost(state.threads, 35274678);
        
        expect(post).toExist();
        expect(post.id).toEqual(35274678);
    });
    it('should not find a fake post', () => {
        let post = findPost(state.threads, -3);
        expect(post).toNotExist();
    })
});
