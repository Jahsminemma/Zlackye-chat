import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './StateProvider'
import reducer, { initialState } from "./reducer";
import userReducer, { userInitialState } from "./user.reducer";
import combineReducers from "react-combine-reducers"

const [Reducer, InitialState] = combineReducers({
  auth: [reducer, initialState],
  users: [userReducer, userInitialState]
})

ReactDOM.render(
  <>
    <StateProvider InitialState={InitialState} reducer={Reducer} children={App}>
      <App />
    </StateProvider>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
