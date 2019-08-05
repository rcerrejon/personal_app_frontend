import React from 'react';
import './App.scss';
import Routes from "./Routes";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faArrowRight, faArrowLeft, faEnvelopeOpenText, faTimes } from '@fortawesome/free-solid-svg-icons'
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import NavbarLeft from "./components/NavbarLeft";
import FixedNotify from "./components/FixedNotify";
import Clock from './components/Clock';
import { Provider } from 'react-redux';
import { combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { createStore, renderDevTools } from './utils/devTools';
import * as reducers from './reducers';


library.add(faCheckSquare, faCoffee, faArrowRight, faArrowLeft, faEnvelopeOpenText, faTimes )

const history = createBrowserHistory();
const reducer = combineReducers(reducers);
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
)

function App() {

  for (var i = 0; i<10; i++) (function(i){

      setTimeout(() => {
        console.log(i)
      }, 1000)
  })(i)

  return (
    <>
      <Provider store={store}>
        <div className="fixedClock"><Clock /></div>
        <FixedNotify/>
        <Router>
          <>
            <NavbarLeft/>
            <div className="App-container">
              <Routes/>
            </div>
          </>
        </Router>
      </Provider>
      {renderDevTools(store)}
    </>
  )
}

export default App;
