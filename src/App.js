import React from 'react';
import style from './App.module.scss';
import Routes from "./Routes";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome/index';
import { library } from '@fortawesome/fontawesome-svg-core/index'
import { faCheckSquare, faCoffee, faArrowRight, faArrowLeft, faEnvelopeOpenText, faTimes, faLanguage, faWindowClose } from '@fortawesome/free-solid-svg-icons/index'
import { fab, faGithub } from '@fortawesome/free-brands-svg-icons/index'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import * as reducers from './reducers';

import Console from './components/Console';
import Header from './components/Header';
import NavbarMain from './components/NavbarMain';


library.add(faCheckSquare, faCoffee, faArrowRight, faArrowLeft, faEnvelopeOpenText, faTimes, faLanguage, faWindowClose, faGithub, fab )

const history = createBrowserHistory();
const reducer = combineReducers(reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

function App() {

  return (
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
  )
}

export default App;
