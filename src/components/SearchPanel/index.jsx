import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import {withRouter} from 'react-router'
import { Search, Clear } from '@material-ui/icons';

class SearchPanel extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            history: [

            ]
        }
    }

    componentDidMount() {
        // localStorage.setItem('history', JSON.stringify(this.state.history))
        this.setState({history: JSON.parse(localStorage.getItem('history')) || []})
    }

    componentWillUnmount() {}

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
            <div className={style.SearchPanelContainer}>
                <div className={search}>
                    <div className={icon}><Search/></div>
                    <input/>
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

    renderHistory = (  ) => {
        const {listItem} = style;

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

SearchPanel.propTypes = {  };
export default withRouter(SearchPanel);
