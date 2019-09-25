import React from 'react';
import style from './style.module.scss';
import { Comment, Visibility, NavigateBefore, AddComment, Edit } from '@material-ui/icons';
import {withRouter} from 'react-router';
import PopupCommentCreate from '../PopupCommentCreate';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as BlogActions from '../../../actions/BlogAction'
import * as CommonActions from '../../../actions/CommonAction'
import Preloader from '../../Common/Preloader';
import axios from 'axios/index'
import * as types from '../../../constants/ActionTypes';

class ArticlePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isOpenPopupComment: false,
        }
    }

    actionsBlog = bindActionCreators(BlogActions, this.props.dispatch);
    actionsCommon = bindActionCreators(CommonActions, this.props.dispatch);

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
        header,
        noPC,
        noMobile
      } = style

      const {article} = this.props.blog;

      if (this.props.common.isDataLoaded)
        return(
            <div className={style.ArticlePageContainer}>
              {this.state.isOpenPopupComment && <PopupCommentCreate articleId={article.id} closePopup={this.switchPopupComment}/>}

              <div className={action_panel}>
                <div className={btn_back}
                     onClick={() => {this.props.history.goBack()}}
                ><NavigateBefore/></div>
                <div className={stats}>
                  <div className={stat}><Visibility/> {article.views}</div>
                </div>
              </div>
              <div className={[date, noPC].join(" ")}>{this.getDate(article.date)}</div>
              <div className={header}>
                <div className={name}>
                  { this.props.common.lang === 'en' ?  article.name_EN : article.name_RU }
                </div>
                <div className={[spacer, noMobile].join(" ")}/>
                <div className={[date, noMobile].join(" ")}>{this.getDate(article.date)}</div>
              </div>
              <div className={tags}>
                {article.tags && this.renderTags(article.tags)}
              </div>
              <div className={text}>
                {this.props.common.lang === 'en' ?  article.text_EN : article.text_RU}
              </div>
              <div className={comments}>
                <div className={title}>
                  <span>
                    {this.props.common.lang === 'en' ?  'Comments' : 'Комментарии'}
                    <Comment/>
                    {article.comments && article.comments.length}
                  </span>
                  <div className={btn_comment}
                       onClick={() => {this.switchPopupComment()}}
                  >
                    <Edit/>
                    {/*{this.props.common.lang === 'en' ?  'Write' : 'Написать'}*/}
                  </div>
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
      this.actionsBlog.getBlog();
    }

    setHistory = (article) => {
      let history = JSON.parse(localStorage.getItem('history'))

      if(history) {
        if (!history.find(el => el.id === article.id)) {
          history = [...history, {
            id: article.id,
            link: '/blog/' + article.id,
            name: this.props.common.lang === 'en' ?  article.name_RU : article.name_EN
          }]

          localStorage.setItem('history', JSON.stringify(history))
        }
      }else {
        history = [{
          id: article.id,
          link: '/blog/' + article.id,
          name: this.props.common.lang === 'en' ?  article.name_RU : article.name_EN
        }]
        localStorage.setItem('history', JSON.stringify(history))
      }
    }

    componentDidMount() {
      axios.get(`${process.env.REACT_APP_SERVERURL}/blog` + `/${this.props.match.params.id}`)
        .then(res => {
          this.setHistory(res.data)
        })
        .catch(err => {
          console.error(err)
        })
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
        spacer,
        noMobile,
        noPC
      } = style;

      return this.props.blog.article.comments.map(el => {
        el.date = new Date(el.date)
        return (
          <div className={comment} key={el.id}>
            <div className={[comment_date, noPC].join(" ")}>{el.date.getUTCHours()}:{el.date.getMinutes()} | {this.getDate(el.date)}</div>
            <div className={comment_header}>
              <div className={comment_author}>{el.author}</div>
              <div className={spacer} />
              <div className={[comment_date, noMobile].join(" ")}>{el.date.getUTCHours()}:{el.date.getMinutes()} | {this.getDate(el.date)}</div>
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
       let months = this.props.common.lang === 'en' ?  this.months_en : this.months
       const date = new Date(dateProp)

       return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    }
}

const mapStateToProps = (state) => ({
  common: state.common,
  blog: state.blog
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ArticlePage);
