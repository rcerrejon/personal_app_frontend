import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import { Btn } from '../Portfolio/styled';
import SearchPanel from '../../components/SearchPanel';
import TagPanel from '../../components/TagPanel';
import Hidebar from '../../components/Hidebar';
import {connect} from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import * as BlogAction from '../../actions/BlogAction';

class Blog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isMobile: false,
        }
    }

    actions = bindActionCreators(BlogAction, this.props.dispatch);

    render() {
      const {
        main,
        wrapSearch,
        wrapTag,
        disabled_btn
      } = style;

      return(
          <div className={style.BlogContainer}>
            <Hidebar>
              {
                this.state.isMobile
                &&
                <Btn active={this.props.blog.isOpenTags}
                     onClick={() => this._switchTags()}
                >2: Tags</Btn>
              }
              {
                this.state.isMobile
                &&
                <Btn active={this.props.blog.isOpenSearch}
                     onClick={() => this._switchSearch()}
                >1: Search</Btn>
              }
              <div className={disabled_btn}>Blog</div>
            </Hidebar>
            {
              this.props.blog.isOpenSearch
              &&
              <div className={wrapSearch}><SearchPanel/></div>
            }
            <div className={main}>
              {this.props.children}
            </div>
            {
              this.props.blog.isOpenTags
              &&
              <div className={wrapTag}><TagPanel/></div>
            }
          </div>
      )
    }

    updateWidth = () => {
      this.setState({isMobile: window.innerWidth <= 999})
      if (this.state.isMobile ){
        if (this.props.blog.isOpenSearch){
          this._switchSearch()
        }
        if (this.props.blog.isOpenTags){
          this._switchTags()
        }
      } else {
        if (!this.props.blog.isOpenSearch){
          this._switchSearch()
        }
        if (!this.props.blog.isOpenTags){
          this._switchTags()
        }
      }
    }
    componentDidMount() {
      window.addEventListener('resize', this.updateWidth)
      this.updateWidth()
    }
    componentWillMount() {
      this.updateWidth()
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWidth)
    }

    _switchSearch = () => {
      this.actions.switchSearch()
    }

    _switchTags = () => {
      this.actions.switchTags()
    }


}

Blog.propTypes = {  };

const mapStateToProps = (state) => ({
  ...state
})
export default connect(mapStateToProps)(Blog);
