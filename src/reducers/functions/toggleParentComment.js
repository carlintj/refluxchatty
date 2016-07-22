import _ from 'lodash';

export default function (state, action) {
    let {parentId} = action;
    if (parentId === undefined) {
        parentId = _.find(state.threads, {
            focused: true
        }).id;
    }
    var thread = _.find(state.threads, {
        id: parentId
    });
    thread.expanded = !thread.expanded;

    return state;
}