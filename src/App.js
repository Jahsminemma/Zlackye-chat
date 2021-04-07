import './App.css';
import { useEffect, useState } from 'react'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'
import Chathome from './Components/Chatbody/Chathome'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Chat from "./Components/Chatbody/Chat";
import Signup from '../src/Components/authAccount/Login'
import { useStateValue } from "./StateProvider"
import { actionType } from './reducer'
import UserChatScreen from './Components/Chatbody/UserChatScreen';


function App() {
  const [state, dispatch] = useStateValue()
  /* check if user is logged in */

  const [size, setSize] = useState(window.innerWidth)
  const isLoggedInUser = () => {
    const User = localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")) : null;
    if (User) {
      dispatch({
        type: actionType.SET_USER,
        user: User
      })
    } else {
      dispatch({
        type: `${actionType.SET_USER}_FAILURE`,
        error: { error: "login again " }
      })
    }
  }

  const checkSize = () => {
    setSize(window.innerWidth);
  }

  useEffect(() => {
    isLoggedInUser()
    window.addEventListener("resize", checkSize)
    return () => {
      window.removeEventListener("resize", checkSize)
    }


  }, [])
  return (
    <div className="app">
      <Router>
        {
          !state.auth.authenticated ? (
            <Signup />
          ) : (
            <>
              <Header />
                {size > 500 ? (
                  <div className="app__body">
                    <Sidebar />
                    <Switch>
                      <Route path='/' exact component={Chathome} />
                      <Route path="/room/:roomId" component={Chat} />
                      <Route path="/user/:userId" component={UserChatScreen} />
                    </Switch>
                  </div>
                ): (
                     <div className="app__mobileView">
                <Switch>
                  <Route path='/' exact component={Sidebar} />
                  <Route path="/room/:roomId" component={Chat} />
                  <Route path="/user/:userId" component={UserChatScreen} />
                </Switch>`
                </div>
              )}
            </>
          )
        }
      </Router>
    </div>
  );
}

export default App;
