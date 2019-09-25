import React from 'react';
import style from './style.module.scss';
import { Btn } from '../Portfolio/styled';
import { Search } from '@material-ui/icons';
import SearchPanel from '../../components/SearchPanel';
import TagPanel from '../../components/TagPanel';
import Hidebar from '../../components/Hidebar';
import {connect} from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import * as BlogAction from '../../actions/BlogAction';
import * as CommonAction from '../../actions/CommonAction';
import color from '../../constants/colors';

class Blog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isMobile: false,
        }
    }

    actionsBlog = bindActionCreators(BlogAction, this.props.dispatch);
    actionsCommon = bindActionCreators(CommonAction, this.props.dispatch);

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
                     onClick={() => this._switchTags(null, true)}
                >
                  <b style={{
                    transform: 'rotate(90deg)'
                  }}>#</b>
                </Btn>
              }
              {
                this.state.isMobile
                &&
                <Btn active={this.props.blog.isOpenSearch}
                     onClick={() => this._switchSearch(null, true)}
                >
                  <Search style={{
                    transform: 'rotate(90deg)'
                  }}/>
                </Btn>
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
      let isMobile = window.innerWidth <= 999;
      this.setState({isMobile});

      if ( isMobile ){
        if (this.props.blog.isOpenSearch){
          this._switchSearch(false)
        }
        if (this.props.blog.isOpenTags){
          this._switchTags(false)
        }
      } else {
        if (!this.props.blog.isOpenSearch){
          this._switchSearch(true)
        }
        if (!this.props.blog.isOpenTags){
          this._switchTags(true)
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

    _switchSearch = (value, isHandle) => {
      if (isHandle){
        this.actionsBlog.switchTags(false)
      }
      this.actionsBlog.switchSearch(value)
    }

    _switchTags = (value, isHandle) => {
      if (isHandle){
        this.actionsBlog.switchSearch(false)
      }
      this.actionsBlog.switchTags(value)
    }


}

const mapStateToProps = (state) => ({
  blog: state.blog
})
export default connect(mapStateToProps)(Blog);
