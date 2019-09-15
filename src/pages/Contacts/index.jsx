import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidePanel from '../../components/SidePanel';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as ContactsActions from '../../actions/ContactsAction';

class Contacts extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isAbleSendBtn: false,
          email: '',
          name: '',
          subject: '',
          message: ''
        }
    }
    actionsContacts = bindActionCreators(ContactsActions, this.props.dispatch);

    componentDidMount() {
      this.actionsContacts.getLinks()
    }

    componentWillUnmount() {}

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
        inputArea
      } = style;

      return(
          <div className={style.ContactsContainer}>
            {this.renderCanvasPanel()}
            <div className={main}>
              <div className={contactMe}>
                <div className={header}>Contact me</div>
                <div className={form}>
                  <input className={inputArea}
                         name="email"
                         value={this.state.email}
                         placeholder="E-mail"
                         onChange={this.onChangeForm}/>
                  <input className={inputArea}
                         name="name"
                         value={this.state.name}
                         placeholder="Name"
                         onChange={this.onChangeForm}/>
                  <input className={inputArea}
                         name="subject"
                         value={this.state.subject}
                         placeholder="Subject"
                         onChange={this.onChangeForm}/>
                  <textarea className={inputArea}
                            name="message"
                            value={this.state.message}
                            placeholder="Message"
                            onChange={this.onChangeForm}/>
                  <div className={this.checkFullForm() ? btn_send : btn_send__disable}
                       onClick={() => this.sendMail()}
                  >{'Send'}</div>
                </div>
              </div>
              <div className={separator}/>
              <div className={links}>
                <div className={header}>Links</div>
                {this.props.contacts.links && this.renderLinks(this.props.contacts.links)}
              </div>
            </div>
            {this.renderCanvasPanel()}
          </div>
      )
    }

    sendMail = async () => {
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
      } else {
        console.log('pls full form')
      }

      console.log(res) // TODO обработка действия после отправки сообщения
    }

    checkFullForm = () => {
      return this.state.email !== '' && this.state.name !== '' && this.state.subject !== '' && this.state.message !== ''
    }

    onChangeForm = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      this.setState({
        [name]: value
      })
    }

    _openInNewTab = (url) => {
      if (url) {
        if (url.indexOf('http') != -1) {
          window.open(url, '_blank');
        } else {
          window.open(url, '_self');
        }
      }
    }

    renderLinks = (links) => {
      const {
        linkItem
      } = style;

      return links.map(el => {
        return (
          <div key={el.url} className={linkItem} onClick={() => this._openInNewTab(el.url)}>
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

Contacts.propTypes = {  };
const mapStateToProps = (state) => ({
  ...state
})

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Contacts);
