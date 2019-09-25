import React from 'react';
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
            <span onClick={ () => props.history.push('/' + array.filter((el, i) => i <= index).join('/') ) }>
              {el}
            </span>
          { index + 1 !== arr.length && <ArrowForwardIos/> }
          </span>
      )
    })
  }

  return (
      <div className={style.BreadPathContainer}>
        {props.location.pathname.split('/').slice(1).length > 1
        &&
        <div className={btn_back}
             onClick={() => props.history.goBack()}
        >
          <ArrowBackIos/>
          <span>{props.common.lang === 'en' ? 'back' : 'назад'}</span>
        </div>
        }
        <div className={path}>
          {renderPath(props.location.pathname)}
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
  withRouter,
  connect(mapStateToProps)
)(BreadPath);
        
