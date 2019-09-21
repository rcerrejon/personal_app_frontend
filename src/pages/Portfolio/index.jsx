import React from 'react';
import style from './style.module.scss';
import { KeyboardArrowDownRounded, KeyboardArrowRightRounded, Note } from '@material-ui/icons';
import { Switch, withRouter } from 'react-router';
import history from '../../history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Btn } from './styled';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as PortfolioActions from '../../actions/PortfolioActions';
import Hidebar from '../../components/Hidebar';
import { mdiInformationVariant, mdiFileTree } from '@mdi/js';
import Icon, { Stack } from '@mdi/react';
import color from '../../constants/colors'

class Portfolio extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isMobile: false,
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
                          url: '/projects/backend/teams-mospolytech'
                        },
                        {
                          id: 2,
                          parent_id: 2,
                          type: 'proj',
                          name: 'my.homepage.com',
                          url: '/projects/backend/my-homepage'
                        },
                        {
                          id: 5,
                          parent_id: 4,
                          type: 'folder',
                          open: false,
                          name: 'Backend',
                          url: '/projects/backend',
                          childs: [
                            {
                              id: 11,
                              parent_id: 5,
                              type: 'proj',
                              name: 'teams.mospolytech.ru',
                              url: '/projects/backend/teams-mospolytech'
                            },
                            {
                              id: 12,
                              parent_id: 5,
                              type: 'proj',
                              name: 'my.homepage.com',
                              url: '/projects/backend/my-homepage'
                            },
                          ]
                        },
                      ]
                    },
                  ]
                },
                {
                  id: 6,
                  parent_id: 1,
                  type: 'file',
                  name: 'About me',
                  url: '/about'
                }
              ]

          }]
        }
    }
    actions = bindActionCreators(PortfolioActions, this.props.dispatch);

    render() {
      const {
        PortfolioContainer,
        leftNavbar,
        mainContent,
        disabled_btn
      } = style;

        return(
            <div className={PortfolioContainer}>
              <Hidebar>
                {this.state.isMobile
                  &&
                  <>
                    <Btn onClick={() => this._switchInfo()}
                    ><Icon path={mdiInformationVariant} color={color.secondary} rotate={90}/></Btn>
                    <Btn onClick={() => this._switchLeftnav()}
                    ><Icon path={mdiFileTree} color={color.primary} rotate={90}/></Btn>
                  </>
                }
                <div className={disabled_btn}>Portfolio</div>
              </Hidebar>
              {this.props.portfolio.isOpenLeftnav
                &&
                <div className={leftNavbar}
                     style={{
                       backgroundColor: this.props.common.theme === 'dark' ? color.black : color.grey2C_light,
                     }}
                >
                  {this.renderNavlist()}
                </div>
              }
            {/*<div className={[style.loader, style.center].join(" ")}><span>!</span></div>*/}
              <div className={mainContent}>
                <Switch>
                  {this.props.children}
                </Switch>
              </div>
            </div>
        )
    }

    updateWidth = () => {
      this.setState({isMobile: window.innerWidth <= 999})
      if (this.state.isMobile ){
        if (this.props.portfolio.isOpenLeftnav){
          this._switchLeftnav()
        }
      } else {
        if (!this.props.portfolio.isOpenLeftnav){
          this._switchLeftnav()
        }
        if (!this.props.portfolio.isOpenInfo){
          this._switchInfo()
        }
      }
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateWidth)
      this.updateWidth()
      this.actions.getFolders()
    }

    componentWillMount() {
      this.updateWidth()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth)
    }

    _switchLeftnav = () => {
      this.actions.switchLeftnav()
    }

    _switchInfo = () => {
      this.actions.switchInfo()
    }

    _makeObjToTree = (array, prefix) => {
      const {
        treeItem,
        folderInner,
        folderInnerClosed,
        fileIcon
      } = style;

      prefix += 25;
      return array.map(item =>
      {
        let folderInnerClass = folderInnerClosed
        if (item.type === 'folder' && item.open === true) {
          folderInnerClass = folderInner;
        }
        return (
        <div key={this.props.common.lang === 'en' ? item.name_en : item.name_ru}>
          {item.type === 'folder'
            ?
            <div className={treeItem}
                 style={{
                   paddingLeft: `${prefix - 25}px`,
                   backgroundColor: this.props.common.theme === 'dark' ? color.black : color.grey2C_light,
                 }}
                 >
              {item.open ? <KeyboardArrowDownRounded onClick={() => {this.openFolder(item.id)}}/> : <KeyboardArrowRightRounded onClick={() => {this.openFolder(item.id)}}/>}
              <div onClick={() => this.moveToFolder(item)}>
                {this.props.common.lang === 'en' ? item.name_en : item.name_ru}
              </div>
            </div>
            :
            <div className={treeItem}
                 style={{
                   paddingLeft: `${prefix - 25}px`,
                   backgroundColor: this.props.common.theme === 'dark' ? color.black : color.grey2C_light
                 }}
                 onClick={() => this.moveToFile(item.url)}>
              <FontAwesomeIcon icon="file" className={fileIcon}/>
              {this.props.common.lang === 'en' ? item.name_en : item.name_ru}
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
      let dirs = [...this.props.portfolio.folders]
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
          {this._makeObjToTree(this.props.portfolio.folders, 0)}
        </div>
      )
    }
}

const mapStateToProps = (state) => ({
  ...state
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Portfolio);
