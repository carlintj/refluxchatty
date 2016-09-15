import * as types from '../../actions/chattyactions';
import * as chattyApi from './chattyApi';
import highlightParent from './highlightParent';
import toggleParentComment from './toggleParentComment';
import selectComment from './selectComment';
import * as navigation from './commentNavigation';
import * as posting from './posting';
import * as debug from './debug'

const handlers = {}

handlers[types.GETCHATTYCOMPLETED] = chattyApi.getChatty;
handlers[types.GETNEWESTEVENTIDCOMPLETED] = chattyApi.getNewestEventId;
handlers[types.WAITFOREVENTCOMPLETED] = chattyApi.waitForEvent;
handlers[types.LOADTHREADS] = chattyApi.loadThreads;
handlers[types.LOADTHREADSCOMPLETED] = chattyApi.loadThreadsCompleted;

handlers[types.HIGHLIGHTPARENT] = highlightParent;
handlers[types.TOGGLEPARENTCOMMENT] = toggleParentComment;
handlers[types.SELECTCOMMENT] = selectComment;

handlers[types.SELECTNEXTPARENT] = navigation.selectNextParent;
handlers[types.SELECTPREVPARENT] = navigation.selectPrevParent;
handlers[types.SELECTNEXTCOMMENT] = navigation.selectNextComment;
handlers[types.SELECTPREVCOMMENT] = navigation.selectPrevComment;
handlers[types.SELECTFIRSTPARENT] = navigation.selectFirstParent;
handlers[types.SELECTLASTPARENT] = navigation.selectLastParent;
handlers[types.REORDERTHREADS] = navigation.reorderThreads;
handlers[types.HIDESELECTEDTHREAD] = navigation.hideSelectedThread;
handlers[types.SHOWTHREADS] = navigation.showThreads;
handlers[types.SHOWNEWSPOSTS] = navigation.showNewsPosts;


handlers[types.OPENREPLY] = posting.openReply;
handlers[types.SHOWNEWTHREAD] = posting.showNewThread;
handlers[types.CANCELNEWTHREAD] = posting.cancelNewThread;
handlers[types.SUBMITCOMMENT] = posting.submitComment;
handlers[types.SUBMITCOMMENTCOMPLETED] = posting.submitCommentCompleted;

handlers[types.DUMPSTATE] = debug.dumpState;

export default handlers;