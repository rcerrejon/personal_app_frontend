import React from 'react';
import { mdiLightbulbOutline,  mdiLightbulb, mdiClose, mdiMinus, mdiFullscreen } from '@mdi/js';
import Icon, { Stack } from '@mdi/react';
import color from '../../constants/colors'
import { withRouter } from "react-router";
import style from './style.module.scss';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CommonAction from '../../actions/CommonAction';
import Img from 'react-image'

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    actionsCommon = bindActionCreators(CommonAction, this.props.dispatch);

    render() {
        const {
          HeaderContainer,
          HeaderLeftButtons,
          button,
          icon,
          close,
          yellow,
          green,
          HeaderLogo,
          HeaderRightButtons
        } = style;

        return(
            <div className={HeaderContainer}
                 style={{
                   backgroundColor: this.props.common.theme === 'dark' ? color.grey2C : color.light,
                   color: this.props.common.theme === 'dark' ? color.light : color.black,
                 }}
            >
              <div className={HeaderLeftButtons}>
                <div className={[button, close].join(" ")}>
                  <div className={icon}><Icon path={mdiClose}/></div>
                </div>
                <div className={[button, yellow].join(" ")}>
                  <div className={icon}><Icon path={mdiMinus}/></div>
                </div>
                <div className={[button, green].join(" ")}>
                  <div className={icon}><Icon path={mdiFullscreen}/></div>
                </div>
              </div>
              {/*<div className={style.HeaderLogo}> </div>*/}
              <Img className={HeaderLogo}
                   src="https://cdn1.savepice.ru/uploads/2019/9/19/22693186150623c85e17e2ab6311c481-full.png"
                   src={require(`../../assets/horseshoeIcon${this.props.common.theme === 'dark' ? '' : '_light'}.png`)}
                   onClick={() => {this.props.history.push('/')}}
              />
              <div className={HeaderRightButtons}>
                <div className={[button].join(" ")}
                     onClick={() => this.actionsCommon.switchTheme()}
                >
                  <Stack color={this.props.common.theme === 'dark' ? '#ffffff' : '#000000'}>
                    <Icon path={mdiLightbulb}/>
                  </Stack>
                </div>
                <div className={[button].join(" ")}
                     onClick={() => this.actionsCommon.switchLang()}
                >
                  <img width="40"
                       height="25"
                       src={require(`../../assets/${this.props.common.lang === 'en' ? 'ru' : 'en'}.svg`)}
                       alt="missing"/>
                </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}
export default compose(
  withRouter,
  connect(mapStateToProps)
)(Header);
