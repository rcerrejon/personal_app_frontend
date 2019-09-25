import React from 'react';
import style from './style.module.scss';
import { connect } from 'react-redux';
import color from '../../../constants/colors';

function SidePanel(props) {
    return (
      <div className={style.SidePanelContainer}
           style={{
             backgroundColor: props.common.theme === 'dark' ? color.black : color.grey2C_light,
           }}
      >
          {props.children}
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    common: {
      theme: state.common.theme
    }
  }
}
export default connect(mapStateToProps)(SidePanel);
