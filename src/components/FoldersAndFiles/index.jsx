import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import history from '../../history';
import Img from 'react-image';
import { DeveloperBoard } from '@material-ui/icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import Preloader from '../Preloader';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as PortfolioActions from '../../actions/PortfolioActions';

class FoldersAndFiles extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          projects: [
            {
              id: 1,
              name: 'Портал подбора проектов',
              icon: 'https://lh3.googleusercontent.com/YzhvUZRsJnkZMaAl_Tj49SkSiVVb5OX8HJK7kDgbKd07QUqlcG7f2DG6LJLrcwYs3OI'
            }
          ]
        }
    }

    actions = bindActionCreators(PortfolioActions, this.props.dispatch);

    render() {
        return(
            <div className={style.FoldersAndFilesContainer}>
              {this.renderItems()}
            </div>
        )
    }

    componentDidMount() {}

    componentWillUnmount() {}

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
        Icon,
        folderName,
        indicator
      } = style;

      let classItem = el.type === 'folder' ? folderItem : projectItem;
      let className = el.type === 'folder' ? folderName : projectName;
      let materialIconItem = el.type === 'folder' ? 'folder' : 'file';

      return (
        <div key={el.id} className={classItem} onClick={() => history.push(`/portfolio${el.url}`)}>
          <FontAwesomeIcon className={indicator} icon={materialIconItem}/>
          { el.icon
            ? <Img className={Icon} src={el.icon} height="100%" loader={<Preloader/>}/>
            : <DeveloperBoard className={Icon}/>
          }
          <div className={className} title={el.name_ru}>{el.name_ru}</div>
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

FoldersAndFiles.propTypes = {  };
const mapStateToProps = (state) => ({
  ...state
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(FoldersAndFiles);
