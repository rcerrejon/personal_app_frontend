import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import Img from 'react-image'
import RightPanel from '../RightPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Preloader from '../Preloader';

class ProjectPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          project: {
            id: 1,
            parent_id: 3,
            url: '/projects/frontend/teams-mospolytech',
            linkToSite: 'http://teams.mospolytech.ru/',
            name: 'Сайт портфолио',
            role: 'Создатель сайта',
            desc: 'Для того чтобы начать работу над проектами Для того чтобы начать работу над проектами вам необходимо зарегистрироваться на сайте в качестве исполнителя. Как только вы пройдёте процедуру регистрации у вас автоматически создастся ваша личная команда. Эта команда в вашем лице может записаться на проект, если выполнить его вы захотите в одиночку. вам необходимо зарегистрироваться на сайте в качестве исполнителя. Как только вы пройдёте процедуру регистрации у вас автоматически создастся ваша личная команда. Эта команда в вашем лице может записаться на проект, если выполнить его вы захотите в одиночку. ',
            skills: [
              {
                name: 'ReactJS',
                icon: 'https://png.pngtree.com/svg/20170719/1217a8a69e.svg'
              },
              {
                name: 'ExpressJS',
                icon: 'https://www.pngfind.com/pngs/m/136-1363736_express-js-icon-png-transparent-png.png'
              },
              {
                name: 'PostgreSQL',
                icon: 'https://user-images.githubusercontent.com/24623425/36042969-f87531d4-0d8a-11e8-9dee-e87ab8c6a9e3.png'
              },
              {
                name: 'Node.js',
                icon: 'https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png'
              },
            ],
            images: [
              {
                title: 'Панель администрирования сайта',
                src: 'https://sun9-15.userapi.com/c855128/v855128726/18345/SsZtDyWOt6Y.jpg'
              },
              {
                title: 'Панель администрирования сайта',
                src: 'https://sun9-15.userapi.com/c855128/v855128726/18345/SsZtDyWOt6Y.jpg'
              },
              {
                title: 'Панель администрирования сайта',
                src: 'https://sun9-15.userapi.com/c855128/v855128726/18345/SsZtDyWOt6Y.jpg'
              },
            ],
            links: [
              {
                name: 'Backend на гитхабе',
                url: 'https://ibb.co/xYm5Y4p',
              },
              {
                name: 'Frontend на гитхабе',
                url: 'https://ibb.co/xYm5Y4p'
              }
            ]
          }
        }
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        const { main, name, nameRightPanel, images, role, skills, desc, links, linkItem } = style;
        const project = this.state.project

        return(
            <div className={style.ProjectPageContainer}>
              <div className={main}>
                <div className={name}
                     onClick={() => this._openInNewTab(project.linkToSite)}
                >{project.name}</div>
                <div className={images}>
                  {this.renderImages()}
                </div>
              </div>

              <RightPanel>
                <div className={[name, nameRightPanel].join(" ")}
                     onClick={() => this._openInNewTab(project.linkToSite)}
                >{project.name}</div>
                <div className={skills}>
                  {this.renderSkills()}
                </div>
                <div className={role}>Роль: {project.role}</div>
                <div className={desc}>{project.desc}</div>
                <div className={links}>
                  {this.renderLinks()}
                </div>
              </RightPanel>
            </div>
        )
    }

    _openInNewTab = (url) => {
      window.open(url, '_blank');
    }

    renderImages = () => {
      return this.state.project.images.map(image => {
        // let img = require(`${image.src}`)
        return (
        <div className={style.imageItem}
             title={image.title}
             key={image.title}>
          {/*<img width="100" src={image.src} alt={image.title}/>*/}
          <Img src={image.src} alt={image.title} loader={<Preloader/>}/>
        </div>
        )}
      )
    }

    renderSkills = () => {
      return this.state.project.skills.map(skill => (
          <div className={style.skillItem}
               title={skill.name}
               key={skill.name}>
            <img width="100" src={skill.icon} alt={skill.name}/>
          </div>
        )
      )
    }
    renderLinks = () => {
      return this.state.project.links.map(link =>
        <>
          <div className={style.linkItem}
               onClick={() => {this._openInNewTab(link.url)}}
               key={link.name}>
            <FontAwesomeIcon icon={['fab', 'github']}/> {link.name}</div>
          <br/>
        </>
      )
    }
}

ProjectPage.propTypes = {  };
export default ProjectPage;
