import React from 'react';
import style from './style.module.scss';
import { connect } from 'react-redux';
import color from '../../constants/colors';

function SidePanel(props) {
    return (
      <div className={style.SidePanelContainer}
           style={{
             backgroundColor: props.common.theme === 'dark' ? color.dark : color.grey2C_light,
           }}
      >
          {props.children}
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}
export default connect(mapStateToProps)(SidePanel);
