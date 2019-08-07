import React from "react";
import { Route, Switch } from 'react-router';
import { CSSTransition } from 'react-transition-group'
import style from'./router.scss'
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contacts from './pages/Contacts';

const routes = [
  {path: '/', name: 'Home', Component: Home},
  {path: '/portfolio', name: 'Portfolio', Component: Portfolio},
  {path: '/blog', name: 'Blog', Component: Blog},
  {path: '/contacts', name: 'Contacts', Component: Contacts},
]

function Routes() {
  return (
    <>
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={0}
              classNames={style.page}
              unmountOnExit
            >
              <div className={style.page}>
                <Component />
              </div>
            </CSSTransition>
          )}
        </Route>
      ))}
    </>
  )
}

export default Routes;
