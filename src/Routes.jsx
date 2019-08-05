import React from "react";
import { Route, Switch } from 'react-router';
import MainContent from "./components/MainContent";
import { CSSTransition } from 'react-transition-group'
import TodoListClass from "./components/TodoListClass";
import Calendar from "./components/Calendar";
import Page404 from "./components/Page404";
import './router.scss'

const routes = [
  {path: '/', name: 'Home', Component: MainContent},
  {path: '/calendar', name: 'Calendar', Component: Calendar},
  {path: '/todolist', name: 'TodoList', Component: TodoListClass},

]

function Routes() {
  return (
    <div>
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={300}
              classNames="page"
              unmountOnExit
            >
              <div className="page">
                <Component />
              </div>
            </CSSTransition>
          )}
        </Route>
      ))}
    </div>
  )
}

export default Routes;
