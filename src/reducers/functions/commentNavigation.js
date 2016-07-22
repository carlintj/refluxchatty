import _ from 'lodash';
import highlightParent from './highlightParent';

export function findChildComment (parentThread, childCommentId) {
    if (parentThread.id == childCommentId) return parentThread;
    for (var i = 0; i < parentThread.children.length; i++) {
        var child = parentThread.children[i];
        if (child.id == childCommentId) {
            return child;
        }
        var grandchild = findChildComment(child, childCommentId);
        if (grandchild) {
            return grandchild;
        }
    }
    return undefined;
}

export function getSiblings (parentThread, comment) {
    var parentComment = findChildComment(parentThread, comment.parentId);
    return parentComment.children;
}

export function selectNextParent(state) {
    state.replyingTo = 0;
    var thread = undefined;
    var visibleThreads = _.filter(state.threads, { 'hidden': false })
    var i = _.findIndex(visibleThreads, { 'focused': true });
    if (i != visibleThreads.length) {
        thread = visibleThreads[i + 1];
    } else {
        thread = visibleThreads[0];
    }

    return highlightParent(state, {parentId: thread.id});
}

export function selectPrevParent(state) {
    state.replyingTo = 0;
    var thread = undefined;
    var visibleThreads = _.filter(state.threads, { 'hidden': false })
    var i = _.findIndex(visibleThreads, { 'focused': true });
    if (i > 0) {
        thread = visibleThreads[i - 1];
    } else {
        thread = visibleThreads[0];
    }

    return highlightParent(state, {parentId: thread.id});
}
export function selectFirstParent (state) {
    return highlightParent(state, {parentId: state.threads[0].id});
}
export function selectLastParent (state) {
    return highlightParent(state, {parentId: state.threads[state.threads.length - 1].id});
}
export function selectPrevComment (state) {
    state.replyingTo = 0;
    var thread = _.find(state.threads, {
        focused: true
    });
    if (thread === undefined || thread.children.length === 0) return;

    if (thread.expandedChildId === 0) {
        thread.expandedChildId = thread.children[0].id;
    }
    else {
        var comment = findChildComment(thread, thread.expandedChildId);
        var siblings = getSiblings(thread, comment);
        var i = 0;
        for (; i < siblings.length; i++) {
            if (siblings[i].id == comment.id) {
                break;
            }
        }
        if (i == 0) {
            thread.expandedChildId = comment.parentId;
        }
        else {
            //find the id of the last grandchild of the sibling
            thread.expandedChildId = siblings[i - 1].id;
        }
    }

    return state;
}
export function selectNextComment(state) {
    state.replyingTo = 0;
    var thread = _.find(state.threads, {
        focused: true
    });
    if (thread === undefined || thread.children.length == 0) return;
    if (thread.expandedChildId === 0) {
        thread.expandedChildId = thread.children[0].id;
    }
    else {
        let comment = findChildComment(thread, thread.expandedChildId);
        if (!comment) {
            thread.expandedChildId = comment.children[0].id;
        }
        else {
            if (comment.children.length > 0) {
                thread.expandedChildId = comment.children[0].id;
            }
            else {
                let found = false;
                let siblings = getSiblings(thread, comment);
                let finder = findChildComment(thread, comment.parentId);
                do {
                    for (let i = 0; i < siblings.length - 1; i++) {
                        if (siblings[i].id === thread.expandedChildId) {
                            thread.expandedChildId = siblings[i + 1].id;
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        thread.expandedChildId = finder.id;
                        if (finder.parentId !== 0) {
                            siblings = getSiblings(thread, finder);
                            finder = findChildComment(thread, finder.parentId);
                        } else {
                            found = true;
                        }
                    }
                } while (!found && finder)
            }
        }
    }
    return state;
}