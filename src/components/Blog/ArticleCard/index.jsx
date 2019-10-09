import React from 'react';
import style from './style.scss';
import { Visibility, Comment, ArrowForward } from '@material-ui/icons';
import { bindActionCreators, compose } from 'redux';
import {connect} from 'react-redux';
import * as BlogAction from '../../../actions/BlogAction';
import color from '../../../constants/colors'
import Link from 'next/link';

class ArticleCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  months = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Мая',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ]
  months_en = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
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
    let months = this.props.common.lang === 'en' ? this.months_en : this.months
    let date = new Date(dateProp)
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  sliceText = (prop_text) => {
    return prop_text.slice(0, 250) + '...'
  }

  render() {
    const {
      article
    } = this.props

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
      btn_open,
      noMobile,
      noPC
    } = style

    return (
      <div className={style.ArticleCardContainer} >
        <div className={[date, noPC].join(' ')}>{this.getDate(article.date)}</div>
        <div className={header}>
          <div className={name}>
            {this.props.common.lang === 'en' ? article.name_EN : article.name_RU}
          </div>
          <div className={[spacer, noMobile].join(' ')} />
          <div className={[date, noMobile].join(' ')}>{this.getDate(article.date)}</div>
        </div>
        <div className={tags}>
          {this.renderTags()}
        </div>
        <div className={text}>{this.sliceText(this.props.common.lang === 'en' ? article.text_EN : article.text_RU)}</div>
        <div className={action_panel}>
          <Link href={`blog/${article.id}`}>
            <div className={btn_open}
                 onClick={() => { this.incrementViews(article.id) }}
            >
              <div>{this.props.common.lang === 'en' ? 'Continue read ' : 'Продолжить читать '}</div>
               <ArrowForward/>
            </div>
          </Link>
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
  common: state.common,
  blog: state.blog
})

export default compose(
  connect(mapStateToProps)
)(ArticleCard);
        
