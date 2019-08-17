import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';

function SidePanel(props) {
    return (
      <div className={style.SidePanelContainer}>
          {props.children}
      </div>
    );
}

SidePanel.propTypes = {  };
export default (SidePanel);
