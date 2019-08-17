import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidePanel from '../../components/SidePanel';

class Contacts extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          links: [
            {
              name: 'Github',
              icon: 'github',
              url: 'https://github.com/Imlerix'
            },
            {
              name: 'Gitlab',
              icon: 'gitlab',
              url: 'https://gitlab.com/Imlerith'
            },
            {
              name: 'Gmail',
              icon: 'google',
              url: 'mailto:udachin.vadim@gmail.com'
            },
            {
              name: 'Vkontakte',
              url: 'https://vk.com/imlerix'
            }
          ]
        }
    }

    componentDidMount() {}

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
        inputArea
      } = style;

      return(
          <div className={style.ContactsContainer}>
            {this.renderCanvasPanel()}
            <div className={main}>
              <div className={contactMe}>
                <div className={header}>Contact me</div>
                <div className={form}>
                  <input className={inputArea} placeholder="E-mail"/>
                  <input className={inputArea} placeholder="Name"/>
                  <input className={inputArea} placeholder="Subject"/>
                  <textarea className={inputArea} placeholder="Message"/>
                  <div className={btn_send}>{'Send'}</div>
                </div>
              </div>
              <div className={separator}/>
              <div className={links}>
                <div className={header}>Links</div>
                {this.renderLinks()}
              </div>
            </div>
            {this.renderCanvasPanel()}
          </div>
      )
    }

    _openInNewTab = (url) => {
      if (url) {
        if (url.indexOf('http') != -1) {
          console.log('Find http')
          window.open(url, '_blank');
        } else {
          window.open(url, '_self');
        }
      }
    }

    renderLinks = () => {
      const {
        linkItem
      } = style;

      return this.state.links.map(el => {
        return (
          <div key={el.url} className={linkItem} onClick={() => this._openInNewTab(el.url)}>
            {el.icon && <FontAwesomeIcon icon={['fab', el.icon]}/>}
            {el.icon && '__'}
            {el.name}
          </div>
        )
      })
    }

    renderCanvasPanel = () => {
      return(
        <div className={style.sidePanelWrapper}>
          <SidePanel>
            panel
          </SidePanel>
        </div>
      )
    }
}

Contacts.propTypes = {  };
export default Contacts;
