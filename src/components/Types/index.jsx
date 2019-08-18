import React from 'react';
import propTypes from 'prop-types'
import history from '../../history'
import { withRouter } from 'react-router';
import style from './style.module.scss';
import Img from 'react-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Types extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          types: [
            {
              id: 0,
              icon: 'http://icons.iconarchive.com/icons/bambulu/sailor-moon/256/ribbon-icon.png',
              name: 'Full stack',
              url: 'fullstack',
              path: ''
            },
            {
              id: 1,
              icon: 'http://icons.iconarchive.com/icons/bambulu/sailor-moon/256/sailor-moon-icon.png',
              name: 'Front-end',
              url: 'frontend'
            },
            {
              id: 2,
              icon: 'http://icons.iconarchive.com/icons/bambulu/sailor-moon/256/luna-p-icon.png',
              name: 'Back-end',
              url: 'backend'
            }
          ]
        }
    }


    render() {
        return(
            <div className={style.TypesContainer}>
              {this.renderTypes()}
            </div>
        )
    }

    componentDidMount() {}
    componentWillUnmount() {}

    renderTypes = () => {
      const { folderItem, folderIcon, folderName, indicator } = style;
      let types = [...this.state.types]

      return types.map(({id, name, icon, url}) =>
        <div key={id} className={folderItem} onClick={() => history.push(`${this.props.location.pathname}/${url}`)}>
          <FontAwesomeIcon className={indicator} icon="folder"/>
          <Img className={folderIcon} src={icon} alt="icon"/>
          <div className={folderName}>{name}</div>
        </div>
      )
    }
}

Types.propTypes = {  };
export default withRouter(Types);
