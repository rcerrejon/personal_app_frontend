import React from 'react';
import { Work, Home, Email, MenuBook } from '@material-ui/icons';
import style from './style.module.scss';
import { mdiNewspaper } from '@mdi/js';
import Icon from '@mdi/react';
import { NavLink } from 'react-router-dom';
import color from '../../constants/colors';
import { connect } from 'react-redux';

class NavbarMain extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
      const {
        NavbarMainContainer,
        button,
        home,
        portfolio,
        activeNavlink,
        blog,
        contacts
      } = style;

        return(
            <div className={NavbarMainContainer}
                 style={{
                   backgroundColor: this.props.common.theme === 'dark' ? color.greySelect : color.greySelect_light,
                   color: this.props.common.theme === 'dark' ? color.light : color.black,
                 }}
            >
              <NavLink exact to="/" className={[button, home].join(" ")} activeClassName={activeNavlink}><Home /></NavLink>
              <NavLink to="/portfolio" className={[button, portfolio].join(" ")} activeClassName={activeNavlink}><Work /></NavLink>
              <NavLink to="/blog" className={[button, blog].join(" ")} activeClassName={activeNavlink}><MenuBook color="#FFA500"/></NavLink>
              <NavLink to="/contacts" className={[button, contacts].join(" ")} activeClassName={activeNavlink}><Email /></NavLink>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}
export default connect(mapStateToProps)(NavbarMain);
