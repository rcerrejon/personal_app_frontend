import React from 'react';
import style from './style.module.scss';
import { Visibility, Comment } from '@material-ui/icons';
import { bindActionCreators, compose } from 'redux';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import * as BlogAction from '../../actions/BlogAction';

class ArticleCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  months = [
    'Января',
    'Февраля',
    'Март',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ]
  actionsBlog = bindActionCreators(BlogAction, this.props.dispatch);

  checkChosenTag = (id) => {
    return this.props.blog.tags.find(el => el.id === id);
  }

  renderTags = () => {
    const {
      tag,
      hash
    } = style;

    return this.props.article.tags.map((el) => {
      return (
        <div className={tag}
             key={el.id}
             onClick={() => {this.chooseTag(el.id)}}
             style={{opacity: this.checkChosenTag(el.id).chosen ? '1' : '0.6'}}
        >
          <span className={hash}>#</span>
          {el.name}
        </div>
      )
    })
  }
  chooseTag = (id) => {
      let tags = [...this.props.blog.tags]
      tags.forEach(item => {
        if (item.id === id) {
          item.chosen = !item.chosen;
        }
      })
      this.actionsBlog.chooseTags(tags)
      this.actionsBlog.getBlog();
  }

  incrementViews = (id) => {
    this.actionsBlog.incrementViews(id)
  }

  getDate = (dateProp) => {
    let date = new Date(dateProp)
    return `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}`
  }

  sliceText = (prop_text) => {
    return prop_text.slice(0, 250) + '...'
  }

  render() {
    const { article } = this.props

    const {
      header,
      date,
      spacer,
      name,
      tags,
      text,
      action_panel,
      stat,
      stats,
      btn_open
    } = style

    return (
      <div className={style.ArticleCardContainer} >
        <div className={header}>
          <div className={name}>{article.name_RU}</div>
          <div className={spacer} />
          <div className={date}>{this.getDate(article.date)}</div>
        </div>
        <div className={tags}>
          {this.renderTags()}
        </div>
        <div className={text}>{this.sliceText(article.text_RU)}</div>
        <div className={action_panel}>
          <div className={btn_open}
               onClick={() => { this.props.history.push(`blog/${article.id}`); this.incrementViews(article.id) }}
          >Read</div>
          <div className={stats}>
            <div className={stat}><Visibility/> {article.views}</div>
            <div className={stat}><Comment/> {article.commentsCount}</div>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  ...state
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ArticleCard);
        
