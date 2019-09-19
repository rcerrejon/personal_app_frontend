import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WbSunnyOutlined } from '@material-ui/icons/index';
import { withRouter } from "react-router";
import style from './style.module.scss';

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {}

    render() {
        const { HeaderContainer, HeaderLeftButtons, button, close, yellow, green, HeaderPath, HeaderRightButtons } = style;

        return(
            <div className={HeaderContainer}>
              <div className={HeaderLeftButtons}>
                <div className={[button, close].join(" ")}> </div>
                <div className={[button, yellow].join(" ")}> </div>
                <div className={[button, green].join(" ")}> </div>
              </div>
              {/*<div className={style.HeaderLogo}> </div>*/}
              <div className={HeaderPath}>
                {`Udachin${this.props.location.pathname}`}
              </div>
              <div className={HeaderRightButtons}>
                <div className={[button].join(" ")}><WbSunnyOutlined/></div>
                <div className={[button].join(" ")}><img width="40" height="25" src={require("../../assets/ru.svg")} alt="missing"/></div>
              </div>
            </div>
        )
    }
}

export default withRouter(Header);
