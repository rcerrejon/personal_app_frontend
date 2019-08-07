import React from 'react';
import style from './App.scss';
import Routes from "./Routes";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faArrowRight, faArrowLeft, faEnvelopeOpenText, faTimes, faLanguage, faWindowClose, faLight } from '@fortawesome/free-solid-svg-icons'
import { Provider } from 'react-redux';
import { combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { createStore, renderDevTools } from './utils/devTools';
import * as reducers from './reducers';

import Console from './components/Console';
import Header from './components/Header';
import NavbarMain from './components/NavbarMain';


library.add(faCheckSquare, faCoffee, faArrowRight, faArrowLeft, faEnvelopeOpenText, faTimes, faLanguage, faWindowClose )

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

  return (
    <>
      <Provider store={store}>
        <Router history={history}>
        <Header />
        <NavbarMain />
          <div className={style.AppContainer} >
            <Routes/>
          </div>
        <Console />
        </Router>
      </Provider>
    </>
  )
}

export default App;
