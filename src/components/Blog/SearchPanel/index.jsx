import React from 'react';
import style from './style.module.scss';
import {withRouter} from 'react-router'
import { Search, Clear } from '@material-ui/icons/index';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as BlogAction from '../../../actions/BlogAction';
import color from '../../../constants/colors';
import { BtnSearch } from './slyled';

class SearchPanel extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            history: [],
            isMobile: false,
            isTyping: false,
        }
    }
    actionsBlog = bindActionCreators(BlogAction, this.props.dispatch);

    componentDidMount() {
        document.addEventListener('click', this.checkHistory);
        this.checkHistory()
    }
    checkHistory = () => {
        this.setState({history: JSON.parse(localStorage.getItem('history')) || []})
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.checkHistory);
    }

    render() {
        const {
            search,
            icon,
            clear_btn,
            history,
            titleHistory,
            list
        } = style;

        return(
            <div className={style.SearchPanelContainer}
                 style={{
                     backgroundColor: this.props.common.theme === 'dark' ? color.dark : color.grey2C_light,
                     color: this.props.common.theme === 'dark' ? color.light : color.text_secondary,
                 }}
            >
                <div className={search}>
                    <div className={icon}><Search/></div>
                    <input onChange={this.changeSearch}
                           value={this.props.blog.search}
                           style={{
                               backgroundColor: this.props.common.theme === 'dark' ? color.dark : color.grey2C_light,
                           }}
                    />
                    <div className={clear_btn}
                         onClick={() => this.clearSearch()}
                         style={{
                             opacity: this.state.searchInput === '' ? '0.4' : '1'
                         }}
                    >
                        <Clear/>
                    </div>
                </div>
                {this.props.isMobile &&
                    <BtnSearch currTheme={this.props.common.theme}
                               onClick={() => this.doSearch()}
                    >
                        {this.props.common.lang === 'en' ? 'Search' : 'Поиск'}
                    </BtnSearch>
                }
                <div className={history}>
                    <div className={titleHistory}>
                        {this.props.common.lang === 'en' ? 'History' : 'История'}
                    </div>
                    <div className={list}>
                        {this.renderHistory()}
                    </div>
                </div>
            </div>
        )
    }

    changeSearch = (e) => {
        this.actionsBlog.setSearch(e.target.value)
        this.actionsBlog.getBlog()
    }

    clearSearch = () => {
        this.actionsBlog.setSearch('')
        this.actionsBlog.getBlog()
        if (this.props.isMobile)
            this.actionsBlog.switchSearch(false)
    }

    doSearch = () => {
        if (this.props.isMobile)
            this.actionsBlog.switchSearch(false)
    }

    renderHistory = (  ) => {
        const {
            listItem
        } = style;

        return this.state.history.map(el => {
            return (
            <div className={listItem}
                 key={el.id}
                 onClick={() => this.props.history.push(el.link)}
            >
                <span>{el.name}</span>
            </div>
            )
        })
    }
}

const mapStateToProps = (state) => ({
    common: {
        theme: state.common.theme,
        lang: state.common.lang
    },
    blog: state.blog
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(SearchPanel);
