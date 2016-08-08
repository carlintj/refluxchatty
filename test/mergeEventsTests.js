/* global describe */
/* global it */

import expect from 'expect';
import {mergeEvents} from '../src/reducers/functions/chattyApi';
import findPost from '../src/reducers/functions/findPost';
import state from './testState';
import _ from 'lodash';


let newPostEvent = {
    'lastEventId': 4769465,
    'events': [
        {
            'eventId': 4769464,
            'eventDate': '2016-08-04T15:44:29Z',
            'eventType': 'newPost',
            'eventData': {
                'postId': 35274818, 'post':
                {
                    'id': 35274818,
                    'threadId': 35274460,
                    'parentId': 35274758,
                    'author': 'Arcanum',
                    'category': 'ontopic',
                    'date': '2016-08-04T15:43:00Z',
                    'body': '"Dark" is not violence. <br />"Gritty" is not sex. <br />"Serious" is not the opposite of funny. ',
                    'lols': []
                },
                'parentAuthor': 'action wombmate'
            }
        },
        {
            'eventId': 4769465,
            'eventDate': '2016-08-04T15:44:31Z',
            'eventType': 'newPost',
            'eventData': {
                'postId': 35274819,
                'post': {
                    'id': 35274819,
                    'threadId': 35274514,
                    'parentId': 35274811,
                    'author': 'the man with the briefcase',
                    'category': 'ontopic',
                    'date': '2016-08-04T15:43:00Z',
                    'body': 'I don\'t think they heard you :(',
                    'lols': []
                },
                'parentAuthor': 'fadetofunk'
            }
        }
    ]
}


let categoryChangeEvent = {
    'lastEventId': 4769483,
    'events': [
        {
            'eventId': 4769483,
            'eventDate': '2016-08-04T15:51:14Z',
            'eventType': 'categoryChange',
            'eventData':
            {
                'postId': 35273881,
                'category': 'nuked'
            }
        }
    ]
};

describe('merge category change event', () => {
    it('should update a post category', () => {
        let newState = _.cloneDeep(state);
        mergeEvents(newState.threads, categoryChangeEvent.events, newState);
        
        let oldPost = findPost(state.threads, 35273881);
        let newPost = findPost(newState.threads, 35273881);
        expect(newPost.category).toNotBe(oldPost.category);
        expect(newPost.category).toBe('nuked');

    });
    it('should merge new posts', () => {
        let newState = _.cloneDeep(state);
        newState = mergeEvents(newState.threads, newPostEvent, newState);

    });
});