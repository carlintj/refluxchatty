export function toggleMenu(state) {
    state.isMenuOpened = !state.isMenuOpened;
    
    return state;    
}

export function showLoginForm(state) {
    state.showLogin = true;

    return state;
}

export function loginCompleted(state, action) {
    if(action.isValid) {
        state.username = action.username;
        state.showLogin = false;
    }
    else {
        //error validating
    }

    return state;
}