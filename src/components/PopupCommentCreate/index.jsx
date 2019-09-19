import React from 'react';

import style from './style.module.scss';
import {Close} from '@material-ui/icons';

class PopupCommentCreate extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
      const {
        form,
        btn_close,
        inputArea,
        btn_send,
        title
      } = style;

        return(
            <div className={style.PopupCommentCreateContainer}>
              <div className={form}>
                <div className={title}>Оставьте комментарий</div>
                <div className={btn_close}
                     onClick={() => this.props.closePopup()}
                ><Close/></div>
                <input className={inputArea} placeholder="Name"/>
                <input className={inputArea} placeholder="E-mail"/>
                <textarea className={inputArea} placeholder="Comment"/>
                <div className={btn_send}>{'Send'}</div>
              </div>
            </div>
        )
    }
}

export default PopupCommentCreate;
