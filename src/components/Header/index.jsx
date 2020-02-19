import React from 'react';
import { mdiLightbulbOutline, mdiLightbulb, mdiClose, mdiMinus, mdiFullscreen } from '@mdi/js';
import { Tonality, Brightness6 } from '@material-ui/icons';
import Icon, { Stack } from '@mdi/react';
import color from '../../constants/colors';
import { withRouter } from 'react-router';
import style from './style.module.scss';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CommonAction from '../../actions/CommonAction';
import Img from 'react-image';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      HeaderRightButtons,
    } = style;

    return (
      <div
        className={HeaderContainer}
        style={{
          backgroundColor: this.props.common.theme === 'dark' ? color.grey2C : color.greyHeader,
          color: this.props.common.theme === 'dark' ? color.light : color.black,
        }}
      >
        <div className={HeaderLeftButtons}>
          <div className={[button, close].join(' ')}>
            <div className={icon}>
              <Icon path={mdiClose} />
            </div>
          </div>
          <div className={[button, yellow].join(' ')}>
            <div className={icon}>
              <Icon path={mdiMinus} />
            </div>
          </div>
          <div className={[button, green].join(' ')}>
            <div className={icon}>
              <Icon path={mdiFullscreen} />
            </div>
          </div>
        </div>
        {/*<div className={style.HeaderLogo}> </div>*/}
        <Img className={HeaderLogo} src={require('../../assets/circle_avatar.png')} />
        <div className={HeaderRightButtons}>
          <div className={button} onClick={() => this.actionsCommon.switchTheme()}>
            <Brightness6
              style={{
                color: this.props.common.theme === 'dark' ? color.light : color.dark,
              }}
            />
          </div>
          <div className={[button].join(' ')} onClick={() => this.actionsCommon.switchLang()}>
            <img
              width="40"
              height="25"
              src={require(`../../assets/${this.props.common.lang === 'en' ? 'ru' : 'en'}.svg`)}
              alt="missing"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    common: {
      theme: state.common.theme,
      lang: state.common.lang,
    },
  };
};
export default compose(withRouter, connect(mapStateToProps))(Header);
