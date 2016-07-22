import _ from 'lodash';

export default function (state, action) {
    let {threadId, commentId} = action;
    state.replyingTo = 0;
    var parent = null;
    _.each(state.threads, (thread) => {
        if (thread.id === threadId) {
            parent = thread;
            thread.focused = true;
        }
        else {
            thread.focused = false;
        }
    });

    parent.expandedChildId = commentId;
    return state;
}