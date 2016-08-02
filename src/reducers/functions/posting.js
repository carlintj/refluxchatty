import _ from 'lodash';

export function openReply(state, action) {
    let {threadId,commentId} = action;

    if(threadId && commentId) {
      let thread = _.find(state.threads, {
        id: threadId
      });

      if(thread) {
        state.replyingTo = commentId;
        thread.expandedChildId = commentId;
        thread.focused = true;
      } else {
        console.warn('could not find thread to reply');
      }
    } else {
      state.replyingTo = 0;
      let thread = _.find(state.threads, {
        focused: true
      });
      if (thread) {
        state.replyingTo = thread.expandedChildId;
      }
      else {
        console.warn('could not find focused thread on openReply');
      }
    }
    return state;
}

export function submitComment(state /*, action */) {
    state.replyingTo = 0;
    
    return state;
}

export function submitCommentCompleted(state  /*, action */) {
    state.replyingTo = 0;
    
    return state;
}

export function showNewThread(state /*, action */) {
  state.showNewThreadBox = true;
  state.replyingTo = 0;
  return state;
}

export function cancelNewThread(state) {
  state.showNewThreadBox = false;
  return state;
}