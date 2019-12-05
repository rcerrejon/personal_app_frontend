import React from 'react';
import style from './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidePanel from '../../components/Common/SidePanel';
import { bindActionCreators, compose } from 'redux';
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from 'react-redux';
import * as ContactsActions from '../../actions/ContactsAction';
import { _openInNewTab } from '../../utils/commonFunctions'
import color from '../../constants/colors'
import Preloader from '../../components/Common/Preloader';

class Contacts extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isAbleSendBtn: false,
          Email: '',
          Name: '',
          Subject: '',
          Message: '',
          callbackCaptcha: null,
          valueCaptcha: null,
          loadCaptcha: false,
          expiredCaptcha: false
        }
        this._reCaptchaRef = React.createRef();
    }


    // static async getInitialProps(context) {
    //   context.store.dispatch(ContactsActions.getLinks())
    // }
    // componentDidMount() {
    //   this.actionsContacts.getLinks()
    // }

    render() {
      const {
        main,
        sidePanelWrapper,
        contactMe,
        links,
        separator,
        header,
        form,
        btn_send,
        btn_send__disable,
        btn_send_light,
        btn_send_light__disable
      } = style;

      return(
          <div className={style.ContactsContainer}
               style={{
                 backgroundColor: this.props.common.theme === 'dark' ? color.routerBg : color.light,
                 color: this.props.common.theme === 'dark' ? color.light : color.text_secondary,
               }}>
            {this.renderCanvasPanel()}
            <div className={main}>
              <div className={contactMe}>
                <div className={header}>
                  {this.props.common.lang === 'en' ? 'Contact me' : 'Написать мне'}
                </div>
                <div className={form}>
                  {this.renderInputs([
                    { name: 'Your email', ru: 'Ваш email' },
                    { name: 'Your name', ru: 'Ваше имя' },
                    { name: 'Subject', ru: 'Тема' },
                    { name: 'Message', ru: 'Текст письма' }
                  ])}
                  {
                    <ReCAPTCHA
                      style={{
                        margin: '0 0 15px 0'
                      }}
                      theme={this.props.common.theme}
                      ref={this._reCaptchaRef}
                      sitekey={'6LcnKDsUAAAAAHsAgcPXQFNFyFnAssWPNSZ5tLjx'}
                      onChange={this.handleChange}
                      asyncScriptOnLoad={this.asyncScriptOnLoad}
                    />
                    ||
                    <Preloader/>
                  }
                  <div onClick={this.sendMail}
                       className={
                         this.props.common.theme === 'dark'
                         ?
                         this.checkFullForm() ? btn_send : btn_send__disable
                         :
                         this.checkFullForm() ? btn_send_light : btn_send_light__disable
                       }
                  >{this.props.common.lang === 'en' ? 'Send' : 'Отправить'}</div>
                </div>
              </div>
              <div className={separator}
                   style={{
                     backgroundColor: this.props.common.theme === 'dark' ? color.black : color.grey2C_light,
                   }}
              />
              <div className={links}>
                <div className={header}>
                  {this.props.common.lang === 'en' ? 'Links' : 'Ссылки '}
                </div>
                {this.props.contacts.links && this.renderLinks(this.props.contacts.links)}
              </div>
            </div>
            {this.renderCanvasPanel()}
          </div>
      )
    }

    renderInputs = (arr) => {
      const {
        inputArea
      } = style;

      return arr.map((el) =>
        <div key={el.name}>
          {el.name === 'Message'
            ?
            <textarea className={inputArea}
                      name={el.name}
                      style={{
                        background: this.props.common.theme === 'dark' ? color.dark : color.grey2C_light,
                        color: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                        borderColor: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                      }}
                      value={this.state[el.name]}
                      placeholder={this.props.common.lang === 'en' ? el.name : el.ru}
                      onChange={this.onChangeForm}/>
            :
            <input className={inputArea}
                   name={el.name}
                   style={{
                     background: this.props.common.theme === 'dark' ? color.dark : color.grey2C_light,
                     color: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                     borderColor: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                   }}
                   value={this.state[el.name]}
                   placeholder={this.props.common.lang === 'en' ? el.name : el.ru}
                   onChange={this.onChangeForm}/>
          }
        </div>
      )
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

    sendMail = async () => {
      if (this.checkFullForm()){
        let res;
        if (this.checkFullForm()) {
          const {
            email,
            name,
            subject,
            message
          } = this.state;

          res = await this.actionsContacts.postMail({
            email,
            name,
            subject,
            message
          })

          this.setState({
            Name: '',
            Subject: '',
            Message: '',
            Email: ''
          })
        } else {
          console.log('pls full form')
        }
        this._reCaptchaRef.current.reset();
        console.log(res) // TODO обработка действия после отправки сообщения
      }

    }

    checkFullForm = () => {
      return this.state.Email !== ''
        && this.state.Name !== ''
        && this.state.Subject !== ''
        && this.state.Message !== ''
        && this.state.valueCaptcha !== null
    }

    onChangeForm = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      this.setState({
        [name]: value
      })
    }



    renderLinks = (links) => {
      const {
        linkItem
      } = style;

      return links.map(el => {
        return (
          <div key={el.url}
               className={linkItem}
               style={{
                 backgroundColor: this.props.common.theme === 'dark' ? color.black : color.greySelect_light
               }}
               onClick={() => _openInNewTab(el.url)}>
            {el.icon && <FontAwesomeIcon icon={['fab', el.icon]}/>}
            {el.icon && ' '}
            {el.name}
          </div>
        )
      })
    }

    renderCanvasPanel = () => {
      return(
        <div className={style.sidePanelWrapper}>
          <SidePanel>
            {/*TODO panel*/}
          </SidePanel>
        </div>
      )
    }
}

const mapStateToProps = (state) => ({
  contacts: state.contacts,
  common: state.common,
})

export default compose(
  connect(mapStateToProps)
)(Contacts);
