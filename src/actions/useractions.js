import localStorage from 'store';
import reqwest from 'reqwest';

export const LOGIN = 'LOGIN';
export const LOGINCOMPLETED = 'LOGINCOMPLETED';
export const CHECKPMS = 'CHECKPMS';
export const GETMESSAGECOUNT = 'GETMESSAGECOUNT';
export const SUBMITCOMMENT = 'SUBMITCOMMENT';
export const REQUESTMESSAGECOUNT = 'REQUESTMESSAGECOUNT';
export const SHOWLOGINFORM = 'SHOWLOGINFORM';
export const LOGOUT = 'LOGOUT';
export const REQUESTSUBMITCOMMENT = 'REQUESTSUBMITCOMMENT';
export const NEWREPLYNOTIFICATION = 'NEWREPLYNOTIFICATION';
export const CLEARREPLIES = 'CLEARREPLIES';
export const OPENMENU = 'OPENMENU';
export const TOGGLEMENU = 'TOGGLEMENU';

var URLs = {
    login: '//winchatty.com/v2/verifyCredentials',
    getMessageCount: '//winchatty.com/v2/getMessageCount',
    submitComment: '//winchatty.com/v2/postComment'
};

export function toggleMenu() {
    return {
        type: TOGGLEMENU
    }
}

export function showLoginForm() {
    return {
        type: SHOWLOGINFORM
    }
}

export function login(username, password) {
    return (dispatch) => {
        reqwest({
            url: URLs.login,
            method: 'post',
            crossOrigin: true,
            data: {
                username: username,
                password: password
            }
        })
            //.then(r => r.json())
            .then(data => {
                console.log(data);
                const isValid = data.isValid;
                if (data.isValid) {
                    localStorage.set('username', username);
                    localStorage.set('password', password);
                }
                dispatch(loginCompleted(isValid, username))
            });
    }
}

export function loginCompleted(isValid, username) {
    return {
        type: LOGINCOMPLETED,
        isValid,
        username
    }
}