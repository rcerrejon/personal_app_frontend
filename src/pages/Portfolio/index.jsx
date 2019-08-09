import React from 'react';
import propTypes from 'prop-types'
import style from './style.scss';

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
              childs: [
                {
                  id: 2,
                  type: 'folder',
                  open: false,
                  name: 'Projects',
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
                    }
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
      const {PortfolioContainer, leftNavbar, mainContent, hidebar, button} = style;

        return(
            <div className={PortfolioContainer}>
                <div className={hidebar}>
                  <div className={button}>1: Portfolio</div>
                </div>
                <div className={leftNavbar}>
                  {this.renderNavlist()}
                </div>
              {/*<div className={[style.loader, style.center].join(" ")}><span>!</span></div>*/}
                <div className={mainContent}>

                </div>
            </div>
        )
    }
    componentDidMount() {}
    componentWillUnmount() {}

    fun = (array, prefix) => {
      const { treeItem, folderInner, folderInnerClosed } = style;
      prefix += '-';
      return array.map(item =>
      {
        let folderInnerClass = folderInnerClosed
        if (item.type === 'folder' && item.open === true){
          folderInnerClass = folderInner;
        }
        return (
        <div key={item.name}>
          {item.type === 'folder' ?
            <div className={treeItem} onClick={() => {this.openFolder(item.id)}}>
              {prefix + item.name}
            </div>
            :
            <div className={treeItem}>
              {prefix + item.name}
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

    renderNavlist = () => {
      return (
        <div>
          {this.fun(this.state.dirs, '')}
        </div>
      )
    }
}

Portfolio.propTypes = {  };
export default Portfolio;
