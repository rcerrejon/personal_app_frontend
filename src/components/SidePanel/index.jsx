import React from 'react';
import style from './style.module.scss';

function SidePanel(props) {
    return (
      <div className={style.SidePanelContainer}>
          {props.children}
      </div>
    );
}

export default (SidePanel);
