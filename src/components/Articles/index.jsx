import React from 'react';
import propTypes from 'prop-types'
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
        this.state = {
          filters: [
            {
              name: 'All',
              width: 40,
              left: '0'
            },
            {
              name: 'Recent',
              width: 70,
              left: '40px'
            },
            {
              name: 'the Best',
              width: 80,
              left: '110px'
            }
          ],
          currentFilter: 1,
          articles: [
            {
              id: 1,
              date: new Date(2019, 7, 3),
              name: 'Жопа съела трусы',
              tags: ['Vue', 'Nuxt'],
              text: 'Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны',
              views: 0,
              comments: [
                {
                  id: 1,
                  author: 'Tama-tama',
                  text: 'Реально жопа какая-то'
                },
                {
                  id: 2,
                  author: 'Чикунов',
                  text: 'Сочувствую вам чуваки, земля вам стекловатой'
                },
              ]
            },
            {
              id: 2,
              date: new Date(2019, 7, 3),
              name: 'А потом выплюнула',
              tags: ['Vue', 'Nuxt'],
              text: 'Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны',
              views: 0,
              comments: [
                {
                  id: 1,
                  author: 'Tama-tama',
                  text: 'Реально жопа какая-то'
                },
                {
                  id: 2,
                  author: 'Чикунов',
                  text: 'Сочувствую вам чуваки, земля вам стекловатой'
                },
              ]
            },
            {
              id: 3,
              date: new Date(2019, 7, 3),
              name: 'Понюхала и облизала',
              tags: ['Vue', 'Nuxt'],
              text: 'Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны',
              views: 0,
              comments: [
                {
                  id: 1,
                  author: 'Tama-tama',
                  text: 'Реально жопа какая-то'
                },
                {
                  id: 2,
                  author: 'Чикунов',
                  text: 'Сочувствую вам чуваки, земля вам стекловатой'
                },
              ]
            },
            {
              id: 4,
              date: new Date(2019, 7, 3),
              name: 'И все-таки решила съесть',
              tags: ['Vue', 'Nuxt'],
              text: 'Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны... Это просто полная жопа пацаны, не кодите на Vue - вы матерям еще нужны',
              views: 0,
              comments: [
                {
                  id: 1,
                  author: 'Tama-tama',
                  text: 'Реально жопа какая-то'
                },
                {
                  id: 2,
                  author: 'Чикунов',
                  text: 'Сочувствую вам чуваки, земля вам стекловатой'
                },
              ]
            },
          ]
        }
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
                 width: this.state.filters[this.state.currentFilter].width + 'px',
                 left: this.state.filters[this.state.currentFilter].left
               }}
          />
          {
            this.state.filters.map((el, index) => {
              return (
                <div className={filter}
                     onClick={() => {this.chooseFilter(index)}}
                     key={el.name}>
                  {el.name}
                </div>
              )
            })
          }
        </div>
      )
    }

    chooseFilter = (index) => {
      this.setState({currentFilter: index})
    }

    renderArticles = () => {
      return this.props.blog.articles.map(el => {
        return <div key={el.id}><ArticleCard article={el}/></div>
      })
    }
}

Articles.propTypes = {  };

const mapStateToProps = (state) => ({
  ...state
})
export default connect(mapStateToProps)(Articles);
