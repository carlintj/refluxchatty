import _ from 'lodash';

export default function (state, action) {
    let {parentId} = action;
    _.each(state.threads, (thread) => {
        if (thread.id === parentId) {
            thread.focused = true;
            if (thread.expandedChildId !== thread.id) {
                thread.expandedChildId = thread.id;
                state.replyingTo = 0;
            }
        }
        else {
            thread.focused = false;
            thread.expandedChildId = 0;
        }
    });

    return state;
}