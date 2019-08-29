import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import SearchPanel from '../../components/SearchPanel';
import TagPanel from '../../components/TagPanel';
import Hidebar from '../../components/Hidebar';
import {connect} from 'react-redux'
import ArticleCard from '../../components/ArticleCard';

class Blog extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
      const {
        main,
        wrapSearch,
        wrapTag,
        articlesBlock
      } = style;

      return(
          <div className={style.BlogContainer}>
            <Hidebar>
              Hidebar
            </Hidebar>
            <div className={wrapSearch}><SearchPanel/></div>
            <div className={main}>
              {this.props.children}
            </div>
            <div className={wrapTag}><TagPanel/></div>
          </div>
      )
    }

    componentDidMount() {}
    componentWillUnmount() {}


}

Blog.propTypes = {  };

const mapStateToProps = (state) => ({
  ...state
})
export default connect(mapStateToProps)(Blog);
