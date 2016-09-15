import _ from 'lodash';

import {processThread, getPost} from '../../util/apiservice';
import findChildComment from './findChildComment';
import findPost from './findPost';

let addChildPost = function (newPost, state) {
  let thread = _.find(state.threads, {
    id: newPost.threadId
  });
  if (thread) {
    let parent = findChildComment(thread, newPost.parentId);

    if (parent) {
      let fixedPost = getPost(newPost);

      parent.children.push(fixedPost);
      thread.replyCount++;
      thread.latestReply = fixedPost.date;
      thread.latestReplyStr = fixedPost.dateStr;

      if (parent.author === state.username) {
        state.unseenReplies.push({ threadId: thread.id, commentId: newPost.id });
      }
    }
    else {
      console.warn('unable to find parent comment in thread', newPost);
    }
  }
  else {
    state.threadsToLoad.push(newPost.threadId);
  }
}

export function mergeEvents(threads, events, state) {
  try {
    _.each(events, (event) => {
      if (event.eventType == 'categoryChange') {
        let {postId, category} = event.eventData;
        let post = findPost(threads, postId);
        if (post) {
          post.category = category;
        }
      }
      else if (event.eventType == 'newPost') {
        let newPost = event.eventData.post;
        if (newPost.parentId !== 0) {
          addChildPost(newPost, state);
        } else {
          let newThread = getPost(newPost);
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
}

export function getChatty(state, action) {
  state.threads = _.map(action.chatty.threads, raw => processThread(raw));
  state.threads[0].focused = true;
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

export function waitForEventError(state /*, action */) {
  state.connected = false;

  return state;
}

export function loadThreads(state, action) {
  state.threadsToLoad = _.difference(state.threadsToLoad, action.threads);

  return state;
}

export function loadThreadsCompleted(state, action) {
  let {threads} = action;
  let newThreads = _.map(threads, raw => processThread(raw));
  state.threads = state.threads.concat(newThreads);

  return state;
}