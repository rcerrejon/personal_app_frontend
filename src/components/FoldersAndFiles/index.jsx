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
import BreadPath from '../BreadPath';

class FoldersAndFiles extends React.Component{
    constructor(props){
        super(props)
    }

    actions = bindActionCreators(PortfolioActions, this.props.dispatch);

    render() {
      const {

      } = style;

        return(
            <div className={style.FoldersAndFilesContainer}>
              <BreadPath/>
              {this.renderItems()}
            </div>
        )
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
  common: {
    lang: state.common.lang
  },
  portfolio: {
    folders: state.portfolio.folders
  }
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(FoldersAndFiles);
