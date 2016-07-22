export const GETCHATTY = 'GETCHATTY';
export const GETCHATTYCOMPLETED = 'GETCHATTYCOMPLETED';
export const GETCHATTYERROR = 'GETCHATTYERROR';
export const GETNEWESTEVENTID = 'GETNEWESTEVENTID';
export const WAITFOREVENT = 'WAITFOREVENT';
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
export const SHOWTHREADS = 'SHOWTHREADS';
export const HIDESELECTEDTHREAD = 'HIDESELECTEDTHREAD';
export const REORDERTHREADS = 'REORDERTHREADS';
export const RUNSEARCH = 'RUNSEARCH';
export const LOADPOSTIFNOTFOUND = 'LOADPOSTIFNOTFOUND';
export const SHOWNEWTHREAD = 'SHOWNEWTHREAD';
export const CANCELNEWTHREAD = 'CANCELNEWTHREAD';

const URLs = {
    getChatty: '//winchatty.com/v2/getChatty',
    getNewestEventId: '//winchatty.com/v2/getNewestEventId',
    waitForEvent: '//winchatty.com/v2/waitForEvent?lastEventId=',
    verifyCredentials: '//winchatty.com/v2/verifyCredentials',
    getThread: '//winchatty.com/v2/getThread?id='
};


export function getChatty() {
    return (dispatch) => {
        return fetch(URLs.getChatty, { mode: 'cors' })
            .then(r => r.json())
            .then(data => {
                dispatch(getChattyCompleted(data))
            }).catch(e => {
                getChattyError(e);
            });
    }
}

export function getChattyCompleted(chatty) {
    return {
        type: GETCHATTYCOMPLETED,
        chatty
    };
}

export function getChattyError(error) {
    return {
        type: GETCHATTYERROR,
        error
    }
}

export function toggleParentComment(parentId) {
    return {
        type: TOGGLEPARENTCOMMENT,
        parentId
    }
}

export function highlightParent(parentId) {
    return {
        type: HIGHLIGHTPARENT,
        parentId
    }
}

export function selectComment(threadId, commentId) {
    return {
        type: SELECTCOMMENT,
        threadId,
        commentId
    }
}

export function selectNextParent() {
    return {
        type: SELECTNEXTPARENT
    }
}

export function selectPrevParent() {
    return {
        type: SELECTPREVCOMMENT
    }
}

export function selectNextComment() {
    return {
        type: SELECTNEXTCOMMENT
    }
}

export function selectPrevComment() {
    return {
        type: SELECTPREVCOMMENT
    }
}