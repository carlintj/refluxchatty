import localStorage from 'store';


export const initialState = {
    threads: [],
    loading: false,
    connected: false,
    eventId: 0,
    visibleThreads: [],
    replyingTo: 0,
    showNewThreadBox: false,
    username: localStorage.get('username') || '',
    password: localStorage.get('password') || '',
    pms: [],
    showLogin: false,
    totalPMs: 0,
    unreadPMs: 0,
    unseenReplies: [],
    isMenuOpened: false,
    threadsToLoad: [],
    newsPosts: [],
    unseenNewsPosts: [],
};