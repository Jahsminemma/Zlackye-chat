export const userInitialState = {
    user: [],
    conversations:[]
}

export const userAction = {
    REALTIME_USER: "REALTIME_USER",
    REALTIME_CONVERSATION: "REALTIME_CONVERSATION"
}

const userReducer = (state, action) => {
    switch (action.type) {
        case userAction.REALTIME_USER:
            return {
                ...state,
                user :action.user
            }
        case userAction.REALTIME_CONVERSATION:
            return {
                ...state,
                conversations: action.conversations
            }
        default:
            return state
    }
}
export default userReducer