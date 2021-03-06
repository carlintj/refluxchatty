import _ from 'lodash';
import reqwest from 'reqwest';

export const GETCHATTY = 'GETCHATTY';
export const GETCHATTYCOMPLETED = 'GETCHATTYCOMPLETED';
export const GETCHATTYERROR = 'GETCHATTYERROR';
export const GETNEWESTEVENTID = 'GETNEWESTEVENTID';
export const GETNEWESTEVENTIDCOMPLETED = 'GETNEWESTEVENTIDCOMPLETED';
export const WAITFOREVENT = 'WAITFOREVENT';
export const WAITFOREVENTCOMPLETED = 'WAITFOREVENTCOMPLETED';
export const WAITFOREVENTERROR = 'WAITFOREVENTERROR';
export const GETTHREAD = 'GETTHREAD';
export const TOGGLEPARENTCOMMENT = 'TOGGLEPARENTCOMMENT';
export const HIGHLIGHTPARENT = 'HIGHLIGHTPARENT';
export const SELECTCOMMENT = 'SELECTCOMMENT';
export const STARTCHATTY = 'STARTCHATTY';
export const PAUSECHATTY = 'PAUSECHATTY';
export const SELECTNEXTPARENT = 'SELECTNEXTPARENT';
export const SELECTPREVPARENT = 'SELECTPREVPARENT';
export const SELECTFIRSTPARENT = 'SELECTFIRSTPARENT';
export const SELECTLASTPARENT = 'SELECTLASTPARENT';
export const SELECTNEXTCOMMENT = 'SELECTNEXTCOMMENT';
export const SELECTPREVCOMMENT = 'SELECTPREVCOMMENT';
export const FULLREFRESH = 'FULLREFRESH';
export const OPENREPLY = 'OPENREPLY';
export const SUBMITCOMMENT = 'SUBMITCOMMENT';
export const SUBMITCOMMENTCOMPLETED = 'SUBMITCOMMENTCOMPLETED';
export const SHOWTHREADS = 'SHOWTHREADS';
export const HIDESELECTEDTHREAD = 'HIDESELECTEDTHREAD';
export const REORDERTHREADS = 'REORDERTHREADS';
export const RUNSEARCH = 'RUNSEARCH';
export const LOADPOSTIFNOTFOUND = 'LOADPOSTIFNOTFOUND';
export const SHOWNEWTHREAD = 'SHOWNEWTHREAD';
export const CANCELNEWTHREAD = 'CANCELNEWTHREAD';
export const DUMPSTATE = 'DUMPSTATE';

export const SHOWNEWSPOSTS = 'SHOWNEWSPOSTS';

export const LOADTHREADS = 'LOADTHREADS';
export const LOADTHREADSCOMPLETED = 'LOADTHREADSCOMPLETED';

const URLs = {
    getChatty: '//winchatty.com/v2/getChatty',
    getNewestEventId: '//winchatty.com/v2/getNewestEventId',
    waitForEvent: '//winchatty.com/v2/waitForEvent?lastEventId=',
    verifyCredentials: '//winchatty.com/v2/verifyCredentials',
    getThread: '//winchatty.com/v2/getThread?id=',
    submitComment: '//winchatty.com/v2/postComment'
};

function makeActionCreator(type, ...argNames) {
  return function(...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}



export function getChatty() {
    return (dispatch) => {
        return fetch(URLs.getChatty, { mode: 'cors' })
            .then(r => r.json())
            .then(data => {
                dispatch(getChattyCompleted(data))
            })
            .then(() => {
                dispatch(startChatty())
            })
            .catch(e => {
                getChattyError(e);
            });
    }
}

export const getChattyCompleted = makeActionCreator(GETCHATTYCOMPLETED, 'chatty');
export const getChattyError= makeActionCreator(GETCHATTYERROR,'error');

export function startChatty() {
    return (dispatch) => {
        dispatch(getNewestEventId())
    }
}

export function getNewestEventId() {
    return (dispatch) => {
        return fetch(URLs.getNewestEventId, { mode: 'cors' })
            .then(r => r.json())
            .then(data => {
                dispatch(getNewestEventIdCompleted(data.eventId));
                dispatch(waitForEvent(data.eventId));
            })
    }
}

export const getNewestEventIdCompleted = makeActionCreator(GETNEWESTEVENTIDCOMPLETED, 'eventId');

export function waitForEvent(eventId) {
    return (dispatch) => {
        return fetch(URLs.waitForEvent + eventId, { mode: 'cors' })
            .then(r => r.json())
            .then(data => {
                dispatch(waitForEventCompleted(data))
                if (data.lastEventId) {
                    _.delay(() => dispatch(waitForEvent(data.lastEventId)), 5000);
                } else if (data.error) {
                    dispatch(waitForEventError(data));
                }
            })
            .catch(() => {
                dispatch(waitForEventError({}));
            });
    }
}

export function waitForEventCompleted(data) {
    let {lastEventId, events} = data;
    return {
        type: WAITFOREVENTCOMPLETED,
        lastEventId,
        events
    }
}

export const waitForEventError = makeActionCreator(WAITFOREVENTERROR);
export const toggleParentComment = makeActionCreator(TOGGLEPARENTCOMMENT, 'parentId');
export const highlightParent = makeActionCreator(HIGHLIGHTPARENT, 'parentId');
export const selectComment = makeActionCreator(SELECTCOMMENT, 'threadId', 'commentId');
export const selectNextParent = makeActionCreator(SELECTNEXTPARENT);
export const selectPrevParent = makeActionCreator(SELECTPREVPARENT);
export const selectNextComment = makeActionCreator(SELECTNEXTCOMMENT);
export const selectPrevComment = makeActionCreator(SELECTPREVCOMMENT);
export const selectFirstParent = makeActionCreator(SELECTFIRSTPARENT);
export const selectLastParent = makeActionCreator(SELECTLASTPARENT);
export const reorderThreads = makeActionCreator(REORDERTHREADS);
export const openReply = makeActionCreator(OPENREPLY,'threadId','commentId');
export const showNewThread = makeActionCreator(SHOWNEWTHREAD);
export const cancelNewThread = makeActionCreator(CANCELNEWTHREAD);
export const showThreads = makeActionCreator(SHOWTHREADS,'threads');

export function submitComment(parentCommentId, body, username, password) {
    return (dispatch) => {
        dispatch({
            type: SUBMITCOMMENT
        });
        reqwest({
            url: URLs.submitComment,
            method: 'post',
            crossOrigin: true,
            data: {
                parentId: parentCommentId,
                username,
                password,
                text: body
            }
        })
            .then(() => {
                dispatch(submitCommentCompleted());
            });
    }
}

export const submitCommentCompleted = makeActionCreator(SUBMITCOMMENTCOMPLETED);

export function loadThreads(threads) {
    return (dispatch) => {
        dispatch({
            type: LOADTHREADS,
            threads
        });
        let ids = _.join(threads, ',');
        fetch(URLs.getThread + ids, { mode: 'cors' })
            .then(r => r.json())
            .then(data => {
                if (data.threads) {
                    dispatch(loadThreadsCompleted(data.threads))
                }
            });

    }
}

export const loadThreadsCompleted = makeActionCreator(LOADTHREADSCOMPLETED,'threads');
export const hideSelectedThread = makeActionCreator(HIDESELECTEDTHREAD);
export const dumpState = makeActionCreator(DUMPSTATE);

export const showNewsPosts = makeActionCreator(SHOWNEWSPOSTS, 'posts');