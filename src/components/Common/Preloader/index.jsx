import React from 'react';
import style from './style.module.scss';

function Preloader() {
    return (
          <div className={style.PreloaderContainer}>
              <div className={style.loaderItem}/>
          </div>
    );
}

export default Preloader;
        
