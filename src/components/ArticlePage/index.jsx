import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import { Comment, Visibility, NavigateBefore, AddComment } from '@material-ui/icons';
import {withRouter} from 'react-router';
import PopupCommentCreate from '../PopupCommentCreate';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as BlogActions from '../../actions/BlogAction'
import * as CommonActions from '../../actions/CommonAction'
import Preloader from '../Preloader';

class ArticlePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isOpenPopupComment: false,
          article: {
            id: 2,
            date: new Date(2019, 7, 3),
            name: 'А потом выплюнула',
            tags: ['Vue', 'Nuxt'],
            text: 'Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны',
            views: 134,
            comments: [
              {
                id: 1,
                date: new Date(),
                author: 'Tama-tama',
                text: 'Реально жопа какая-то'
              },
              {
                id: 2,
                date: new Date(2019, 8, 15),
                author: 'Чикунов',
                text: 'Сочувствую вам чуваки, земля вам стекловатой'
              },
            ]
          }
        }
    }

    actionsBlog = bindActionCreators(BlogActions, this.props.dispatch);
    actionsCommon = bindActionCreators(CommonActions, this.props.dispatch);

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

    render() {
      const {
        date,
        name,
        tags,
        text,
        action_panel,
        stat,
        stats,
        btn_back,
        comments,
        title,
        btn_comment,
        spacer,
        header
      } = style

      const {article} = this.props.blog;

      if (this.props.common.isDataLoaded)
        return(
            <div className={style.ArticlePageContainer}>
              {this.state.isOpenPopupComment && <PopupCommentCreate closePopup={this.switchPopupComment}/>}

              <div className={action_panel}>
                <div className={btn_back}
                     onClick={() => {this.props.history.goBack()}}
                ><NavigateBefore/></div>
                <div className={stats}>
                  <div className={stat}><Visibility/> {article.views}</div>
                </div>
              </div>
              <div className={header}>
                <div className={name}>{article.name_RU}</div>
                <div className={spacer}/>
                <div className={date}>{this.getDate(article.date)}</div>
              </div>
              <div className={tags}>
                {article.tags && this.renderTags(article.tags)}
              </div>
              <div className={text}>{article.text_RU}</div>
              <div className={comments}>
                <div className={title}>
                  <span>Комментарии <Comment/> {article.comments && article.comments.length}</span>
                  <div className={btn_comment} onClick={() => {this.switchPopupComment()}}><AddComment/></div>
                </div>
                {article.comments && this.renderComments()}
              </div>
            </div>
        )
      else
        return <Preloader/>
    }

    componentWillMount() {
      this.actionsCommon.setLoadingData(false)
      this.actionsBlog.getArticle(this.props.match.params.id)
    }

  componentDidMount() {

    }
    componentWillUnmount() {}

    switchPopupComment = () => {
      this.setState({isOpenPopupComment: !this.state.isOpenPopupComment})
    }

    renderComments = () => {
      const {
        comment,
        comment_author,
        comment_date,
        comment_text,
        comment_header,
        spacer
      } = style;

      return this.props.blog.article.comments.map(el => {
        el.date = new Date(el.date)
        return (
          <div className={comment} key={el.id}>
            <div className={comment_header}>
              <div className={comment_author}>{el.author}</div>
              <div className={spacer} />
              <div className={comment_date}>{el.date.getUTCHours()}:{el.date.getMinutes()} | {this.getDate(el.date)}</div>
            </div>
            <div className={comment_text}>{el.text}</div>
          </div>
        )
      })
    }

    renderTags = (tags) => {
      const {
        tag,
        hash
      } = style;

      return tags.map((el) => {
        return (
          <div className={tag} key={el.id}>
            <span className={hash}>#</span>
            {el.name}
          </div>
        )
      })
    }

    getDate = (dateProp) => {
       const date = new Date(dateProp)
       return `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}`
    }
}

ArticlePage.propTypes = {  };

const mapStateToProps = (state) => ({
  ...state
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ArticlePage);
