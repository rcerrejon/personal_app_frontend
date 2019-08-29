import React from 'react';
import style from './style.module.scss';

function Hidebar(props) {
    return (
        <div className={style.HidebarContainer}>
          {props.children}
        </div>
    );
}

export default Hidebar;
        
