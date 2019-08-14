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
                      id: 3,
                      parent_id: 2,
                      type: 'folder',
                      open: false,
                      name: 'Frontend',
                      url: '/projects/frontend',
                      childs: [
                        {
                          id: 3,
                          parent_id: 3,
                          type: 'proj',
                          name: 'www.zhopa.ru',
                          url: '/projects/frontend/1',
                        },
                        {
                          id: 4,
                          parent_id: 3,
                          type: 'proj',
                          name: 'my.heartBrent.com',
                          url: '/projects/frontend/2',
                        }
                      ]
                    },
                    {
                      id: 4,
                      parent_id: 2,
                      type: 'folder',
                      open: false,
                      name: 'Backend',
                      url: '/projects/backend',
                      childs: [
                        {
                          id: 1,
                          parent_id: 2,
                          type: 'proj',
                          name: 'teams.mospolytech.ru',
                          url: '/projects/teams-mospolytech'
                        },
                        {
                          id: 2,
                          parent_id: 2,
                          type: 'proj',
                          name: 'my.homepage.com',
                          url: '/projects/my-homepage'
                        },
                      ]
                    },
                  ]
                },
                {
                  id: 5,
                  parent_id: 1,
                  type: 'file',
                  name: 'Education',
                  url: '/education'
                },
                {
                  id: 6,
                  parent_id: 1,
                  type: 'file',
                  name: 'About_me',
                  url: '/about'
                }
              ]

          }]
        }
    }

    render() {
      const {PortfolioContainer, leftNavbar, mainContent, hidebar, button} = style;

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
            </div>
        )
    }
    componentDidMount() {}
    componentWillUnmount() {}

    _makeObjToTree = (array, prefix) => {
      const { treeItem, folderInner, folderInnerClosed, fileIcon } = style;
      prefix += 25;
      return array.map(item =>
      {
        let folderInnerClass = folderInnerClosed
        if (item.type === 'folder' && item.open === true) {
          folderInnerClass = folderInner;
        }
        return (
        <div key={item.name}>
          {item.type === 'folder'
            ?
            <div className={treeItem}
                 style={{paddingLeft: `${prefix - 25}px`}}
                 >
              {item.open ? <KeyboardArrowDownRounded onClick={() => {this.openFolder(item.id)}}/> : <KeyboardArrowRightRounded onClick={() => {this.openFolder(item.id)}}/>}
              <div onClick={() => this.moveToFolder(item)}>{item.name}</div>
            </div>
            :
            <div className={treeItem}
                 style={{paddingLeft: `${prefix - 25}px`}}
                 onClick={() => this.moveToFile(item.url)}>
              <FontAwesomeIcon icon="file" className={fileIcon}/>
              { item.name }
            </div>
          }
          {item.childs &&
            <div className={folderInnerClass}>
              {this._makeObjToTree(item.childs, prefix)}
            </div>
          }
        </div>
        )
      }
      )
    };

    openFolder = (id) => {
      let dirs = [...this.state.dirs]
      let openEach = (arr) => arr.forEach(item => {
        if (item.type === 'folder' && item.id === id) {
          item.open = !item.open;
        }
        if (item.childs){
          openEach(item.childs)
        }
      })
      openEach(dirs)
      this.setState({dirs})
    }

    moveToFile = (url) => {
      history.push(`/portfolio${url}`)
    }

    moveToFolder = (item) => {
      if (!item.open){
        this.openFolder(item.id)
      }
      history.push(`/portfolio${item.url}`)
    }

    renderNavlist = () => {
      return (
        <div>
          {this._makeObjToTree(this.state.dirs, 0)}
        </div>
      )
    }
}

Portfolio.propTypes = {  };
export default withRouter(Portfolio);
