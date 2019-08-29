import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import { Comment, Visibility, NavigateBefore, AddComment } from '@material-ui/icons';
import {withRouter} from 'react-router';
import PopupCommentCreate from '../PopupCommentCreate';

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

      const {article} = this.state;

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
                <div className={name}>{article.name}</div>
                <div className={spacer}/>
                <div className={date}>{this.getDate(article.date)}</div>
              </div>
              <div className={tags}>
                {this.renderTags()}
              </div>
              <div className={text}>{article.text}</div>
              <div className={comments}>
                <div className={title}>
                  <span>Комментарии <Comment/> {article.comments.length}</span>
                  <div className={btn_comment} onClick={() => {this.switchPopupComment()}}><AddComment/></div>
                </div>
                {this.renderComments()}
              </div>
            </div>
        )
    }

    componentDidMount() {}
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

      return this.state.article.comments.map(el => {
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

    renderTags = () => {
      const {
        tag,
        hash
      } = style;

      return this.state.article.tags.map((el, index) => {
        return (
          <div className={tag} key={index}>
            <span className={hash}>#</span>
            {el}
          </div>
        )
      })
    }

    getDate = (date) => {
      return `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}`
    }
}

ArticlePage.propTypes = {  };
export default withRouter(ArticlePage);
