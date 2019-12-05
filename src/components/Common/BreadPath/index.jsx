import React from 'react';
import Router from 'next/router'
import style from './style.module.scss';
import Img from 'react-image'
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

function BreadPath(props) {
  const {
    pathItem,
    path,
    btn_back
  } = style

  const renderPath = (str) => {
    let arr = str.split('/').slice(1);
    return arr.map((el, index, array) => {
      return (
        <span className={pathItem} key={el}>
            <span onClick={ () => Router.push('/' + array.filter((el, i) => i <= index).join('/') ) }>
              {el}
            </span>
          { index + 1 !== arr.length && <ArrowForwardIos/> }
          </span>
      )
    })
  }

  return (
      <div className={style.BreadPathContainer}>
        {props.pathname.split('/').slice(1).length > 1
        &&
        <div className={btn_back}
             onClick={() => Router.back()}
        >
          <ArrowBackIos/>
          <span>{props.common.lang === 'en' ? 'back' : 'назад'}</span>
        </div>
        }
        <div className={path}>
          {renderPath(props.pathname)}
        </div>
      </div>
  );
}

const mapStateToProps = (state) => ({
  common: {
    lang: state.common.lang
  }
})

export default compose(
  connect(mapStateToProps)
)(BreadPath);
        
