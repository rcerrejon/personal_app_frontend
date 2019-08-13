import React from 'react';
import {  AppsRounded, Work, EventNote, Home, Email } from '@material-ui/icons/index';
import propTypes from 'prop-types'
import style from './style.module.scss';
import { NavLink } from 'react-router-dom';

class NavbarMain extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
      const {NavbarMainContainer, button, home, portfolio, activeNavlink, blog, contacts} = style;

        return(
            <div className={NavbarMainContainer}>
              <NavLink exact to="/" className={[button, home].join(" ")} activeClassName={activeNavlink}><Home /></NavLink>
              <NavLink to="/portfolio" className={[button, portfolio].join(" ")} activeClassName={activeNavlink}><Work /></NavLink>
              <NavLink to="/blog" className={[button, blog].join(" ")} activeClassName={activeNavlink}><EventNote /></NavLink>
              <NavLink to="/contacts" className={[button, contacts].join(" ")} activeClassName={activeNavlink}><Email /></NavLink>
            </div>
        )
    }
}

NavbarMain.propTypes = {  };
export default NavbarMain;
