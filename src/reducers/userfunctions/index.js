import * as types from '../../actions/useractions';
import * as ui from './uifunctions';

const handlers = {}

handlers[types.TOGGLEMENU] = ui.toggleMenu;
handlers[types.SHOWLOGINFORM] = ui.showLoginForm;
handlers[types.LOGINCOMPLETED] = ui.loginCompleted;

export default handlers;