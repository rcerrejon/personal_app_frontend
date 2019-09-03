import React from "react";
import { Route, Switch } from 'react-router';
import { CSSTransition } from 'react-transition-group'
import style from './router.module.scss'
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contacts from './pages/Contacts';
import Types from './components/Types';
import TypeFolder from './components/TypeFolder';
import ProjectPage from './components/ProjectPage';
import AboutPage from './components/AboutPage';
import Articles from './components/Articles';
import ArticlePage from './components/ArticlePage';
import CanvasTest from './components/CanvasTest';

const Page404 = () => {
  return <div>not found</div>
}

const routes = [
  {path: '/', name: 'Home', exact: true, Component: Home},
  {path: '/portfolio', name: 'Portfolio', exact: false, Component: Portfolio,
    children: [
      //TODO: Попробовать сделать пути динамически состовляемыми из пришедшей инфы о проектах
      {path: '/portfolio/about', name: 'About', exact: true, Component: AboutPage},
      {path: '/portfolio/projects', name: 'Projects', exact: true, Component: Types},
      {path: '/portfolio/projects/:type', name: 'Type', exact: true, Component: TypeFolder},
      {path: '/portfolio/projects/:type/:id', name: 'ProjectPage', exact: true, Component: ProjectPage},
      {path: '/portfolio/*', name: '', exact: false, Component: Page404},
    ]
  },
  {path: '/blog', name: 'Blog', exact: false, Component: Blog,
    children: [
      {path: '/blog', name: 'Articles', exact: true, Component: Articles},
      {path: '/blog/:id', name: 'Article', exact: true, Component: ArticlePage}
    ]
  },
  {path: '/contacts', name: 'Contacts', exact: true, Component: Contacts},
  {path: '/test', name: 'Test', exact: true, Component: CanvasTest},
  {path: '*', name: 'page404', exact: true, Component: Page404},
]

function Routes() {
  return (
    <Switch>
      {routes.map(({ path, Component, children, exact }) => (
        <Route key={path} exact={exact} path={path}>
          {({ match }) => (
            <div className={style.page}>
              <Component >
                {children && (
                  <Switch>
                    {children.map( ({path, exact, Component}) => (
                      <Route path={path} exact={exact} key={path} component={Component}/>
                    ))}
                  </Switch>
                )}
              </Component>
            </div>
          )}
        </Route>
      ))}
    </Switch>
  )
}


export default Routes;
