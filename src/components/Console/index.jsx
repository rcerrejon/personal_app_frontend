import React from 'react';
import style from './style.module.scss';

class Console extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return(
            <div className={style.ConsoleContainer}>
                $console
            </div>
        )
    }
}

export default Console;
