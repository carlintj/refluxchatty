import * as types from '../../actions/chattyactions';
import getChatty from './getChatty';
import highlightParent from './highlightParent';
import toggleParentComment from './toggleParentComment';
import selectComment from './selectComment';
import * as navigation from './commentNavigation';

const handlers = {}

handlers[types.GETCHATTYCOMPLETED] = getChatty;
handlers[types.HIGHLIGHTPARENT] = highlightParent;
handlers[types.TOGGLEPARENTCOMMENT] = toggleParentComment;
handlers[types.SELECTCOMMENT] = selectComment;

handlers[types.SELECTNEXTPARENT] = navigation.selectNextParent;
handlers[types.SELECTPREVPARENT] = navigation.selectPrevParent;
handlers[types.SELECTNEXTCOMMENT] = navigation.selectNextComment;
handlers[types.SELECTPREVCOMMENT] = navigation.selectPrevComment;

export default handlers;