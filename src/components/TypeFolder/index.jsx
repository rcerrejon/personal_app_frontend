import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import history from '../../history';
import Img from 'react-image';
import { DeveloperBoard } from '@material-ui/icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import Preloader from '../Preloader';

class TypeFolder extends React.Component{
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

    render() {
        return(
            <div className={style.TypeFolderContainer}>
              {this.renderProjects()}
            </div>
        )
    }

    componentDidMount() {}

    componentWillUnmount() {}

    renderProjects = () => {
      const { projectItem, projectIcon, projectName, indicator } = style;
      let projects = [...this.state.projects]

      return projects.map((project) =>
        <div key={project.id} className={projectItem} onClick={() => history.push(`${this.props.location.pathname}/${project.id}`)}>
          <FontAwesomeIcon className={indicator} icon="file"/>
          <Img className={projectIcon} src={project.icon} height="100%" loader={<Preloader/>}/>
          <div className={projectName} title={project.name}>{project.name}</div>
        </div>
      )
    }
}

TypeFolder.propTypes = {  };
export default withRouter(TypeFolder);
