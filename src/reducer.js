export const initialState = {
    displayName: "",
    photoURL: "",
    uid: "",
    authenticated: false,
    error: null
}

export const actionType = {
    SET_USER : "SET_USER"
}


const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
                authenticated: true,
            }
            
        case `${actionType.SET_USER}_FAILURE`:
            return {
                ...state,
                authenticated: false,
                error: action.error
            }
        default:
            return state
    }
}

export default reducer
