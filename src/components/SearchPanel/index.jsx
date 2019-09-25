import React from 'react';
import style from './style.module.scss';
import {withRouter} from 'react-router'
import { Search, Clear } from '@material-ui/icons';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import * as BlogAction from '../../actions/BlogAction';
import color from '../../constants/colors';

class SearchPanel extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            history: [],
            isTyping: false
        }
    }
    actionsBlog = bindActionCreators(BlogAction, this.props.dispatch);

    componentDidMount() {
        // localStorage.setItem('history', JSON.stringify(this.state.history))
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
            list,

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
                           style={{
                               backgroundColor: this.props.common.theme === 'dark' ? color.dark : color.grey2C_light,
                           }}
                    />
                    <div className={clear_btn}><Clear/></div>
                </div>
                <div className={history}>
                    <div className={titleHistory}>History</div>
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
        theme: state.common.theme
    }
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(SearchPanel);
