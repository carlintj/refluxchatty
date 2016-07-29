import _ from 'lodash';

import {processThread, getPost} from '../../util/apiservice';
import findChildComment from './findChildComment';
import findPost from './findPost';

var mergeEvents = function (threads, events, state) {
  try {
    _.each(events, (event) => {
      if(event.eventType == 'categoryChange') {
        let post = findPost(threads, event.postId);
        if(post) {
          post.category = event.category;
        }
        else {
          console.warn('can\'t find post for category change:', event.postId);
        }
      }
      else if (event.eventType == 'newPost') {
        var newPost = event.eventData.post;
        if (newPost.parentId !== 0) {
          var thread = _.find(threads, {
            id: newPost.threadId
          });
          if (thread) {
            var parent = findChildComment(thread, newPost.parentId);

            if (parent) {
              var fixedPost = getPost(newPost);

              parent.children.push(fixedPost);
              thread.replyCount++;
              thread.latestReply = fixedPost.date;
              thread.latestReplyStr = fixedPost.dateStr;

              if (parent.author === state.username) {
                state.unseenReplies.push({threadId: thread.id, commentId: newPost.id});
              }
            }
            else {
              console.warn('unable to find parent comment in thread', newPost);
            }
          }
          else {
            console.warn('unable to find thread', newPost.threadId, newPost);
            state.threadsToLoad.push(newPost.threadId);
            //chattyActions.getThread(newPost.threadId);
          }
        } else {
          var newThread = getPost(newPost);
          newThread.latestReply = newThread.date;
          newThread.latestReplyStr = newThread.dateStr;
          newThread.threadId = newPost.threadId;
          newThread.hidden = false;
          newThread.searchMatch = false;
          if (newThread.author === 'Shacknews') {
            newThread.body = newThread.body.replace('href="', 'href="http://www.shacknews.com');
          }

          state.threads.push(newThread);
        }
      }
    });
  }
  catch (e) {
    console.error('error merging events', e, events, threads);
    state.connected = false;
  }
};

export function getChatty(state, action) {
  state.threads = _.map(action.chatty.threads, raw => processThread(raw));
  return state;
}

export function getNewestEventId(state, action) {
  let {eventId} = action;
  if (eventId) {
    state.eventId = eventId;
    state.connected = true;
  } else {
    state.connected = false;
  }

  return state;
}

export function waitForEvent(state, action) {
  let {events, lastEventId} = action;

  state.eventId = lastEventId;
  mergeEvents(state.threads, events, state);

  return state;
}