import React from 'react';
import style from './style.module.scss';
import { Visibility, Comment } from '@material-ui/icons';
import {withRouter} from 'react-router';

function ArticleCard(props) {
  const { article } = props

  const {
    header,
    date,
    spacer,
    name,
    tag,
    hash,
    tags,
    text,
    action_panel,
    stat,
    stats,
    btn_open
  } = style

  const months = [
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

  const renderTags = () => {
    return article.tags.map((el) => {
      return (
        <div className={tag} key={el.id}>
          <span className={hash}>#</span>
          {el.name}
        </div>
      )
    })
  }

  const getDate = (dateProp) => {
    let date = new Date(dateProp)
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const sliceText = (prop_text) => {
    return prop_text.slice(0, 250) + '...'
  }

  return (
      <div className={style.ArticleCardContainer} >
        <div className={header}>
          <div className={name}>{article.name_RU}</div>
          <div className={spacer} />
          <div className={date}>{getDate(article.date)}</div>
        </div>
        <div className={tags}>
          {renderTags()}
        </div>
        <div className={text}>{sliceText(article.text_RU)}</div>
        <div className={action_panel}>
          <div className={btn_open}
               onClick={() => {props.history.push(`blog/${article.id}`)}}
          >Read</div>
          <div className={stats}>
            <div className={stat}><Visibility/> {article.views}</div>
            <div className={stat}><Comment/> {/*{article.comments.length}*/}0</div> {/*TODO*/}
          </div>
        </div>
      </div>
  );
}

export default withRouter(ArticleCard);
        
