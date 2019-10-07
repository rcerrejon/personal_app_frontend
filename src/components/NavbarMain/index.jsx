import React from 'react';
import { Work, Home, Email, MenuBook } from '@material-ui/icons';
import style from './style.scss';
import { mdiNewspaper } from '@mdi/js';
import Icon from '@mdi/react';
import { NavLink } from 'react-router-dom';
import color from '../../constants/colors';
import { connect } from 'react-redux';
import Link from 'next/link';

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
              {/*activeClassName={activeNavlink}*/}
              <Link href="/">
                <div className={[button, home].join(" ")} >
                  <Home />
                </div>
              </Link>
              <Link href="/portfolio">
                <div className={[button, portfolio].join(" ")} >
                  <Work />
                </div>
              </Link>
              <Link href="/blog">
                <div className={[button, blog].join(" ")} >
                  <MenuBook />
                </div>
              </Link>
              <Link href="/contacts">
                <div className={[button, contacts].join(" ")} >
                  <Email />
                </div>
              </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    common: {
      theme: state.common.theme
    }
  }
}
export default connect(mapStateToProps)(NavbarMain);
