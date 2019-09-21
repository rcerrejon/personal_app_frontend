import React from 'react';

import style from './style.module.scss';
import ArticleCard from '../ArticleCard';
import {connect} from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import * as BlogAction from '../../actions/BlogAction';
import * as CommonAction from '../../actions/CommonAction';
import Preloader from '../Preloader';

class Articles extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    actionsBlog = bindActionCreators(BlogAction, this.props.dispatch);
    actionsCommon = bindActionCreators(CommonAction, this.props.dispatch);

    componentDidMount() {
      this.actionsCommon.setLoadingData(false);
      this.actionsBlog.getBlog();
    }

    componentWillUnmount() {}

    render() {
      const {
        articlesBlock
      } = style;

      return(
          <div className={style.ArticlesContainer}>
            {this.renderFilter()}
            <div className={articlesBlock}>
              {this.props.common.isDataLoaded
                ? this.renderArticles()
                : <Preloader/>
              }
            </div>
          </div>
      )
    }

    renderFilter = () => {
      const {
        filters,
        filterCursor,
        filter
      } = style;

      return (
        <div className={filters} style={{ width: `190px` }}>
          <div className={filterCursor}
               style={{
                 width: this.props.blog.filters[this.props.blog.currentFilter].width + 'px',
                 left: this.props.blog.filters[this.props.blog.currentFilter].left
               }}
          />
          {
            this.props.blog.filters.map((el, index) => {
              return (
                <div className={filter}
                     onClick={() => {this.chooseFilter(index)}}
                     key={el.name_en}>
                  {this.props.common.lang === 'en' ? el.name_en : el.name_ru}
                </div>
              )
            })
          }
        </div>
      )
    }

    chooseFilter = (index) => {
      this.actionsBlog.currentFilter(index)
      this.actionsBlog.getBlog()
    }

    renderArticles = () => {
      return this.props.blog.articles.map(el => {
        return <div key={el.id}><ArticleCard article={el}/></div>
      })
    }
}

const mapStateToProps = (state) => ({
  ...state
})
export default connect(mapStateToProps)(Articles);
