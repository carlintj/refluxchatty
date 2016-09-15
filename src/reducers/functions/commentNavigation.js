import _ from 'lodash';
import highlightParent from './highlightParent';
import findChildComment from './findChildComment';

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


export function reorderThreads(state) {
    state.threads = _.orderBy(state.threads, ['latestReply'], ['desc']);
    return selectFirstParent(state)
}

export function showThreads(state, action) {
    let {threads} = action;
    state.visibleThreads = threads;
    state.unseenReplies = _.differenceWith(state.unseenReplies,threads, 
        (l, r) => l.threadId == r.threadId);
    return state;
}

export function hideSelectedThread(state /*, action */) {
    let selectedThread = _.find(state.threads, {focused: true});

    state = selectNextParent(state)

    if(selectedThread) {
        selectedThread.hidden = true;
    }

    return state;
}

export function showNewsPosts(state, action) {
    let {posts} = action;
    let newsPosts = _.filter(state.threads, p => p.author == 'Shacknews');
    let newsPostsId = _.map(newsPosts, t => ({threadId: t.id}));
    if(posts && !!posts.length) {
        state.unseenNewsPosts = _.difference(state.unseenNewsPosts, posts);
        newsPostsId = _.intersectionWith(newsPostsId, posts,
            (l,r) => l.threadId == r.threadId);
    } else if(state.visibleThreads.length != 0) { //toggle showing news posts
        state.visibleThreads = [];
        return state;
    }
    state.visibleThreads = newsPostsId;
    return state;
}