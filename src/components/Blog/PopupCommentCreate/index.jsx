import React from 'react';
import style from './style.module.scss';
import {Close} from '@material-ui/icons';
import { connect } from 'react-redux';
import color from '../../../constants/colors'

class PopupCommentCreate extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isAbleSendBtn: false,
          Email: '',
          Name: '',
          Message: ''
        }
    }

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
              <div className={form}
                   style={{
                     backgroundColor: this.props.common.theme === 'dark' ? color.greySelect : color.grey2C_light,
                     color: this.props.common.theme === 'dark' ? '#ffffff' : color.text_secondary,
                     boxShadow: this.props.common.theme === 'dark' ? `0 5px 10px 5px ${color.dark}` : `0 5px 10px 5px ${color.text_secondary}`,
                   }}
              >
                <div className={title}>
                  {this.props.common.lang === 'ru'
                    ? 'Оставьте комментарий'
                    : 'Send comment'
                  }
                </div>
                <div className={btn_close}
                     onClick={() => this.props.closePopup()}
                ><Close/></div>
                <input className={inputArea}
                       placeholder={this.props.common.lang === 'ru' ? 'Ваше Имя' : 'Your Name'}
                />
                <input className={inputArea} placeholder="E-mail"/>
                <textarea className={inputArea}
                          placeholder={this.props.common.lang === 'ru' ? 'Комментарий' : 'Comment'}
                />
                <div className={btn_send}>{this.props.common.lang === 'ru' ? 'Отправить' : 'Send'}</div>
              </div>
            </div>
        )
    }

    renderInputs = (arrayOfInputs) => {
      return arrayOfInputs.map(el => {
        return (
          <div>

          </div>
        )
      })
    }
}

const mapStateToProps = (state) => {
  return {
    common: {
      theme: state.common.theme,
      lang: state.common.lang,
    }
  }
}
export default connect(mapStateToProps)(PopupCommentCreate);
