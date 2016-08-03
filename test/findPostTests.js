/* global describe */
/* global it */
import expect from 'expect';
import findPost from '../src/reducers/functions/findPost';



let state = {
    threads: [
        {
            id: 1,
            children: []
        },
        {
            id: 2,
            children: [
                {
                    id: 3,
                    children: [{
                        id: 4,
                        children: []
                    }]
                }
            ]
        }

    ]
}

describe('find posts', () => {
    it('should find a parent post', () => {
        let post = findPost(state.threads, 1);
        expect(post).toExist();
        expect(post.id).toEqual(1);
    });

    it('should find a child post', () => {
        let post = findPost(state.threads, 3);
        expect(post).toExist();
        expect(post.id).toEqual(3);
    });
    it('should find a grandchild post', () => {
        let post = findPost(state.threads, 4);
        
        expect(post).toExist();
        expect(post.id).toEqual(4);
    });
    it('should not find a fake post', () => {
        let post = findPost(state.threads, -3);
        expect(post).toNotExist();
    })
});
