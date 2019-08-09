import React from 'react';
import { DeveloperBoard, AppsRounded, Work, EventNote, Home, Email } from '@material-ui/icons';
import propTypes from 'prop-types'
import style from './style.scss';
import { NavLink } from 'react-router-dom';

class NavbarMain extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return(
            <div className={style.NavbarMainContainer}>
              <NavLink exact to="/" className={[style.button, style.home].join(" ")} activeClassName={style.activeNavlink}><Home /></NavLink>
              <NavLink to="/portfolio" className={[style.button, style.portfolio].join(" ")} activeClassName={style.activeNavlink}><Work /></NavLink>
              <NavLink to="/blog" className={[style.button, style.blog].join(" ")} activeClassName={style.activeNavlink}><EventNote /></NavLink>
              <NavLink to="/contacts" className={[style.button, style.contacts].join(" ")} activeClassName={style.activeNavlink}><Email /></NavLink>
              {this.props.location}
            </div>
        )
    }
}

NavbarMain.propTypes = {  };
export default NavbarMain;
