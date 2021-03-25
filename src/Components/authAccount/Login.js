import React from 'react'
import './Login.css'
import { Button } from '@material-ui/core'
import db, { auth, provider } from "../../firebase"
import { useStateValue } from "../../StateProvider"
import { actionType } from "../../reducer"
import firebase from 'firebase/app'
import 'firebase/auth'

const Login = () => {
    const [state, dispatch] = useStateValue();
   
    /*sign in user after successful authentication */ 
    const signIn = () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            return auth
                .signInWithPopup(provider)
                .then((data) => {
                    db.collection("users").doc(data.user.uid)
                        .set({
                            displayName: data.user.displayName,
                            photoURL: data.user.photoURL,
                            uid: data.user.uid,
                            isCreated: Date.now(),
                            isOnline: true
                        }).then(() => {
                            const loggedInUser = {
                            displayName: data.user.displayName,
                            photoURL: data.user.photoURL,
                            uid: data.user.uid
                            }
                             localStorage.setItem("User", JSON.stringify(loggedInUser))
                                dispatch({
                                    type: actionType.SET_USER,
                                    user: loggedInUser
                                })
                         })
                })
                .catch(error => {
                    dispatch({
                        type: `${actionType.SET_USER}_FAILURE`,
                        error: error
                    })
                    alert(error.message)
                })
        })
    }
    return (
        <div className = "login">
            <div className="login__content">
                <img src="https://cdn.dribbble.com/users/1937255/screenshots/12209747/media/416371432c05a98dee1a0b3347659008.png?compress=1&resize=800x600"
                    alt="Logo" />
                <h2>Stay Connected with friends and family</h2>
                <p>Zlacky connects you with people you know and allows you to have one on one chat with friends</p>
                <Button onClick = { signIn }>Sign in with google</Button>
                <h5>Developed by Okonkwo Emmanuel</h5>
            </div>
            
        </div>
    )
}

export default Login
