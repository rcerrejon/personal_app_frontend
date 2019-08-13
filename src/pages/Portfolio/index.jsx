import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import { KeyboardArrowDownRounded, KeyboardArrowRightRounded, Note } from '@material-ui/icons/index';
import { Route, Switch, withRouter } from 'react-router';
import history from '../../history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Portfolio extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isOpenDirs: ['beginFromFirstIndex', true],
          dirs: [{
              id: 1,
              type : 'folder',
              root: true,
              open: true,
              name: 'Portfolio',
              url: '',
              childs: [
                {
                  id: 2,
                  type: 'folder',
                  open: false,
                  name: 'Projects',
                  url: '/projects',
                  childs: [
                    {
                      id: 1,
                      type: 'proj',
                      name: 'teams.mospolytech.ru'
                    },
                    {
                      id: 2,
                      type: 'proj',
                      name: 'my.homepage.com'
                    },
                    {
                      id: 3,
                      type: 'folder',
                      open: false,
                      name: 'ReactJS',
                      childs: [
                        {
                          id: 1,
                          type: 'proj',
                          name: 'www.zhopa.ru'
                        },
                        {
                          id: 2,
                          type: 'proj',
                          name: 'my.heartBrent.com'
                        }
                      ]
                    },
                  ]
                },
                {
                  id: 1,
                  type: 'txt',
                  name: 'Education'
                },
                {
                  id: 2,
                  type: 'txt',
                  name: 'About_me'
                }
              ]

          }]
        }
    }

    render() {
      const {rightInfoPanel, PortfolioContainer, leftNavbar, mainContent, hidebar, button} = style;

        return(
            <div className={PortfolioContainer}>
              <div className={hidebar}>
                <div className={button}>2: Info</div>
                <div className={button}>1: Portfolio</div>
              </div>
              <div className={leftNavbar}>
                {this.renderNavlist()}
              </div>
            {/*<div className={[style.loader, style.center].join(" ")}><span>!</span></div>*/}
              <div className={mainContent}>
                <Switch>
                  {this.props.children}
                  {/*<Route exact path="/portfolio/zhopa"><div>zhopa</div></Route>*/}
                </Switch>
              </div>
              <div className={rightInfoPanel}></div>
            </div>
        )
    }
    componentDidMount() {}
    componentWillUnmount() {}

    fun = (array, prefix) => {
      const { treeItem, folderInner, folderInnerClosed, fileIcon } = style;
      prefix += 25;
      return array.map(item =>
      {
        let folderInnerClass = folderInnerClosed
        if (item.type === 'folder' && item.open === true){
          folderInnerClass = folderInner;
        }
        return (
        <div key={item.name}>
          {item.type === 'folder'
            ?
            <div className={treeItem}
                 style={{paddingLeft: `${prefix - 25}px`}}
                 onClick={() => {this.openFolder(item.id)}}>
              {item.open ? <KeyboardArrowDownRounded/> : <KeyboardArrowRightRounded/>}
              <div onClick={() => this.moveToFolder(item.url)}>{item.name}</div>
            </div>
            :
            <div className={treeItem}
                 style={{paddingLeft: `${prefix - 25}px`}}>
              <FontAwesomeIcon icon="file" className={fileIcon}/>
              { item.name}
            </div>
          }
          {item.childs &&
            <div className={folderInnerClass}>
              {this.fun(item.childs, prefix)}
            </div>
          }
        </div>)
      }
      )
    };

    openFolder = (id) => {
      let dirs = [...this.state.dirs]
      let fun = (arr) => arr.forEach(item => {
        if (item.type === 'folder' && item.id === id) {
          item.open = !item.open;
        }
        if (item.childs){
          fun(item.childs)
        }
      })
      fun(dirs)
      this.setState({dirs})
    }

    moveToFile = (id) => {
      history.push(`/portfolio/document/${id}`)
    }

    moveToFolder = (url) => {
      history.push(`/portfolio${url}`)
    }

    renderNavlist = () => {
      return (
        <div>
          {this.fun(this.state.dirs, 0)}
        </div>
      )
    }
}

Portfolio.propTypes = {  };
export default withRouter(Portfolio);
