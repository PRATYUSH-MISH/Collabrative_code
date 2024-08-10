const ACTIONS = {
    JOIN: 'join',
    JOINED: 'joined',
    USER_DISCONNECT: 'user-disconnect',
    CODE_CHANGE: 'code-change',
    SYNC_CODE: 'sync-code',
    LEAVE: 'leave',
    COMPILATION_SUCCESS: 'compilation-success', // Sent when code compiles successfully
    COMPILATION_ERROR: 'compilation-error', // Sent when code compilation fails
};

module.exports = ACTIONS;
