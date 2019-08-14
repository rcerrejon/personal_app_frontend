import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import { connect } from 'react-redux';

class RightPanel extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return(
            <div className={style.RightPanelContainer}>
              {this.props.children}
            </div>
        )
    }
}

RightPanel.propTypes = {  };
export default (RightPanel);
