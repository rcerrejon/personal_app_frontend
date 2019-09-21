import React from 'react';

import style from './style.module.scss';
import history from '../../history';
import Img from 'react-image';
import { DeveloperBoard, Person, ArrowBackIos, ArrowForwardIos } from '@material-ui/icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import Preloader from '../Preloader';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as PortfolioActions from '../../actions/PortfolioActions';
import color from '../../constants/colors';

class FoldersAndFiles extends React.Component{
    constructor(props){
        super(props)
    }

    actions = bindActionCreators(PortfolioActions, this.props.dispatch);

    render() {
      const {
        path,
        btn_back,
        history
      } = style;

        return(
            <div className={style.FoldersAndFilesContainer}>
              <div className={history}>
                {this.props.location.pathname.split('/').slice(1).length > 1
                  &&
                  <div className={btn_back}
                       onClick={() => this.props.history.goBack()}
                  >
                    <ArrowBackIos/>
                    <span>{this.props.common.lang === 'en' ? 'back' : 'назад'}</span>
                  </div>
                }
                <div className={path}>
                  <Img style={{
                    height: '15px',
                    width: '15px',
                    marginRight: '4px'
                  }}
                       src="https://cdn1.savepice.ru/uploads/2019/9/19/22693186150623c85e17e2ab6311c481-full.png"
                  />
                  {this.renderPath(this.props.location.pathname)}
                </div>
              </div>
              {this.renderItems()}
            </div>
        )
    }

    renderPath = (str) => {
      let arr = str.split('/').slice(1);
      return arr.map((el, index, array) => {
        return (
          <span className={style.pathItem} key={el}>
            <span onClick={ () => this.props.history.push('/' + array.filter((el, i) => i <= index).join('/') ) }>
              {el}
            </span>
            { index + 1 !== arr.length && <ArrowForwardIos/> }
          </span>
        )
      })
    }

    renderItems = () => {
      let childs = this.findParentFolder()

      return childs.map((el) =>
        this.renderChildItem(el)
      )
    }

    renderChildItem = (el) => {
      const {
        projectItem,
        projectName,
        folderItem,
        folderName,
        Icon,
        indicator
      } = style;

      let classItem = el.type === 'folder' ? folderItem : projectItem;
      let className = el.type === 'folder' ? folderName : projectName;
      let materialIconItem = el.type === 'folder' ? 'folder' : 'file';

      return (
        <div key={el.id} className={classItem} onClick={() => history.push(`/portfolio${el.url}`)}>
          <FontAwesomeIcon className={indicator}
                           icon={materialIconItem}
          />
          { el.icon
            ? <Img className={Icon} src={el.icon} height="100%" loader={<Preloader/>}/>
            : el.url === '/about' ? <Person className={Icon}/> : <DeveloperBoard className={Icon}/>
          }
          <div className={className}
               title={this.props.common.lang === 'ru' ? el.name_ru : el.name_en}
          >
            {this.props.common.lang === 'ru' ? el.name_ru : el.name_en}
          </div>
        </div>
      )
    }

    findParentFolder = () => {
      let folders = [...this.props.portfolio.folders];
      let url = this.props.location.pathname.replace('/portfolio', '')
      let childs = []

      let openEach = (arr) => arr.forEach(item => {
        if (item.type === 'folder' && item.url === url) { //TODO
          childs =  item.childs;
          return;
        } else if (item.type === 'folder' && item.childs) {
          openEach(item.childs)
        }
      })
      openEach(folders)

      return childs;
    }
}

const mapStateToProps = (state) => ({
  ...state
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(FoldersAndFiles);
