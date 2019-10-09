import React from 'react';
import style from './style.scss';
import {Close} from '@material-ui/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import color from '../../../constants/colors'
import ReCAPTCHA from "react-google-recaptcha";
import Preloader from '../../Common/Preloader';
import * as BlogAction from '../../../actions/BlogAction';

class PopupCommentCreate extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isAbleSendBtn: false,
          Email: '',
          Name: '',
          Message: '',
          callbackCaptcha: null,
          valueCaptcha: null,
          loadCaptcha: false,
          expiredCaptcha: false
        }
        this._reCaptchaRef = React.createRef();
    }
    actionsBlog = bindActionCreators(BlogAction, this.props.dispatch);

    render() {
      const {
        form,
        title,
        btn_close,
        inputArea,
        btn_send,
        btn_send__disable,
        btn_send_light,
        btn_send_light__disable,
      } = style;

        return(
            <div className={style.PopupCommentCreateContainer}>
              <div className={form}
                   style={{
                     backgroundColor: this.props.common.theme === 'dark' ? color.greySelect : color.greySelect_light,
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
                       name="Name"
                       value={this.state.Name}
                       onChange={this.onChangeForm}
                       placeholder={this.props.common.lang === 'ru' ? 'Ваше Имя' : 'Your Name'}
                       style={{
                         background: this.props.common.theme === 'dark' ? color.dark : color.grey2C_light,
                         color: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                         borderColor: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                       }}
                />
                <input className={inputArea} placeholder="E-mail"
                       name="Email"
                       value={this.state.Email}
                       onChange={this.onChangeForm}
                       style={{
                         background: this.props.common.theme === 'dark' ? color.dark : color.grey2C_light,
                         color: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                         borderColor: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                       }}
                />
                <textarea className={inputArea}
                          name="Message"
                          value={this.state.Message}
                          onChange={this.onChangeForm}
                          placeholder={this.props.common.lang === 'ru' ? 'Комментарий' : 'Comment'}
                          style={{
                            background: this.props.common.theme === 'dark' ? color.dark : color.grey2C_light,
                            color: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                            borderColor: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                          }}
                />
                {
                  <ReCAPTCHA
                    style={{ margin: "0 0 20px 0" }}
                    theme={this.props.common.theme}
                    ref={this._reCaptchaRef}
                    sitekey={'6LcnKDsUAAAAAHsAgcPXQFNFyFnAssWPNSZ5tLjx'}
                    onChange={this.handleChange}
                    asyncScriptOnLoad={this.asyncScriptOnLoad}
                  />
                  ||
                  <Preloader/>
                }

                <div onClick={() => this.sendComment()}
                     className={
                       this.props.common.theme === 'dark'
                         ?
                         this.checkFullForm() ? btn_send : btn_send__disable
                         :
                         this.checkFullForm() ? btn_send_light : btn_send_light__disable
                     }
                >{this.props.common.lang === 'ru' ? 'Отправить' : 'Send'}</div>
              </div>
            </div>
        )
    }

    sendComment = async () => {
      if (this.checkFullForm()){
        const {
          Email,
          Name,
          Message,
        } = this.state
        let self = this

        await this.actionsBlog.sendComment(
          this.props.articleId,
          {
            email: Email,
            author: Name,
            text: Message,
          }
        )
          .then(res => self.props.closePopup())
          .catch(e => console.log(e))
      }
    }

    handleChange = value => {
      console.log("Captcha value:", value);
      this.setState({ valueCaptcha: value });
      // if value is null recaptcha expired
      if (value === null) this.setState({ expiredCaptcha: "true" });
    };
    asyncScriptOnLoad = () => {
      this.setState({ callbackCaptcha: "called!" });
      console.log("scriptLoad - reCaptcha Ref-", this._reCaptchaRef);
    };

    checkFullForm = () => {
      return this.state.Email !== '' && this.state.Name !== '' && this.state.Message !== '' && this.state.valueCaptcha !== null
    }

    onChangeForm = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      this.setState({
        [name]: value
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
