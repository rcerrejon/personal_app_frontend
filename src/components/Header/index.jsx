import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WbSunny, WbSunnyOutlined } from '@material-ui/icons';
import propTypes from 'prop-types'
import { withRouter } from "react-router";
import style from './style.scss';

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {}

    render() {
        return(
            <div className={style.HeaderContainer}>
              <div className={style.HeaderLeftButtons}>
                <div className={[style.button, style.close].join(" ")}> </div>
                <div className={[style.button, style.yellow].join(" ")}> </div>
                <div className={[style.button, style.green].join(" ")}> </div>
              </div>
              {/*<div className={style.HeaderLogo}> </div>*/}
              <div className={style.HeaderPath}>
                {`Udachin${this.props.location.pathname}`}
              </div>
              <div className={style.HeaderRightButtons}>
                <div className={[style.button].join(" ")}><WbSunnyOutlined/></div>
                <div className={[style.button].join(" ")}><img width="40" height="25" src={require("../../../assets/ru.svg")} alt="missing"/></div>
              </div>
            </div>
        )
    }
}

Header.propTypes = {  };
export default withRouter(Header);
