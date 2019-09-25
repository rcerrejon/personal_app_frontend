import React from 'react';
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidePanel from '../../components/SidePanel';
import { bindActionCreators, compose } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as ContactsActions from '../../actions/ContactsAction';
import { _openInNewTab } from '../../utils/commonFunctions'
import color from '../../constants/colors'

class Contacts extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isAbleSendBtn: false,
          Email: '',
          Name: '',
          Subject: '',
          Message: ''
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
        btn_send_light,
        btn_send_light__disable
      } = style;

      return(
          <div className={style.ContactsContainer}>
            {this.renderCanvasPanel()}
            <div className={main}>
              <div className={contactMe}>
                <div className={header}>Contact me</div>
                <div className={form}>
                  {this.renderInputs(['Email', 'Name', 'Subject', 'Message'])}
                  <div onClick={() => this.sendMail()}
                       className={
                         this.props.common.theme === 'dark'
                         ?
                         this.checkFullForm() ? btn_send : btn_send__disable
                         :
                         this.checkFullForm() ? btn_send_light : btn_send_light__disable
                       }
                  >{'Send'}</div>
                </div>
              </div>
              <div className={separator}
                   style={{
                     backgroundColor: this.props.common.theme === 'dark' ? color.black : color.grey2C_light,
                   }}
              />
              <div className={links}>
                <div className={header}>Links</div>
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
        <div>
          {el === 'Message'
            ?
            <textarea className={inputArea}
                      name={el}
                      key={el}
                      style={{
                        background: this.props.common.theme === 'dark' ? color.dark : color.grey2C_light,
                        color: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                        borderColor: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                      }}
                      value={this.state[el]}
                      placeholder={el}
                      onChange={this.onChangeForm}/>
            :
            <input className={inputArea}
                   key={el}
                   name={el}
                   style={{
                     background: this.props.common.theme === 'dark' ? color.dark : color.grey2C_light,
                     color: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                     borderColor: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                   }}
                   value={this.state[el]}
                   placeholder={el}
                   onChange={this.onChangeForm}/>
          }
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

        this.setState({
          Name: '',
          Subject: '',
          Message: '',
          Email: ''
        })
      } else {
        console.log('pls full form')
      }

      console.log(res) // TODO обработка действия после отправки сообщения
    }

    checkFullForm = () => {
      return this.state.Email !== '' && this.state.Name !== '' && this.state.Subject !== '' && this.state.Message !== ''
    }

    onChangeForm = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      console.log(name, value)

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
          <div key={el.url} className={linkItem} onClick={() => _openInNewTab(el.url)}>
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
  withRouter,
  connect(mapStateToProps)
)(Contacts);
