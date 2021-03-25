export const userInitialState = {
   user : []
}

export const userAction = {
     REALTIME_USER: "REALTIME_USER"
}

const userReducer = (state, action) => {
    switch (action.type) {
        case userAction.REALTIME_USER:
            return {
                ...state,
                user :action.user
            }
        default:
            return state
    }
    return state
}
export default userReducer