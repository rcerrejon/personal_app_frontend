import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import Img from 'react-image'
import SidePanel from '../SidePanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OpenInNewRounded } from '@material-ui/icons';
import Preloader from '../Preloader';
import PopupGalary from '../PopupGalary';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PortfolioActions from '../../actions/PortfolioActions';
import * as axios from 'axios';

class ProjectPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isOpenPopupGalary: false,
          selectedImageId: null,
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
                name: 'PostgreSQL',
                icon: 'https://user-images.githubusercontent.com/24623425/36042969-f87531d4-0d8a-11e8-9dee-e87ab8c6a9e3.png'
              },
              {
                name: 'Node.js',
                icon: 'https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png'
              }
            ],
            images: [
              {
                id: 1,
                title: 'Панель администрирования сайта',
                src: 'https://sun9-27.userapi.com/c856016/v856016513/c113f/KDdbBZnEzx8.jpg'
              },
              {
                id: 2,
                title: 'Панель администрирования сайта',
                src: 'https://pp.userapi.com/c856016/v856016513/c1149/4iqOKkzBDtY.jpg'
              },
              {
                id: 3,
                title: 'Панель администрирования сайта',
                src: 'https://sun9-27.userapi.com/c856016/v856016513/c113f/KDdbBZnEzx8.jpg'
              },
            ],
            links: [
              {
                name: 'Backend репозиторий',
                url: 'https://ibb.co/xYm5Y4p',
              },
              {
                name: 'Frontend репозиторий',
                url: 'https://ibb.co/xYm5Y4p'
              }
            ]
          }
        }
    }
    actions = bindActionCreators(PortfolioActions, this.props.dispatch);

    async componentDidMount() {
      let project = await this.findProjectByUrl()
      this.actions.getProjectPage(project.id)
    }

    componentWillUnmount() {}

    render() {
        const {
          main,
          name,
          spanWrapper,
          nameSidePanel,
          images,
          role,
          skills,
          desc,
          links,
          sidePanelWrapper
        } = style;
        const project = this.props.portfolio.project;

        return(
            <div className={style.ProjectPageContainer}>
              {this.state.isOpenPopupGalary ? <PopupGalary arrayImages={project.images} currentImageId={this.state.selectedImageId} closePopup={this._switchPopupGalery}/> : null}
              <div className={main}>
                <div className={spanWrapper}>
                  <span className={name}
                        onClick={() => this._openInNewTab(project.linkToSite)}
                  >{project.name_ru} <OpenInNewRounded/></span>
                </div>
                <div className={images}>
                  {project.images && this.renderImages(project.images)}
                </div>
              </div>

              {
                this.props.portfolio.isOpenInfo
                &&
                (
                  this.props.portfolio.project
                    ?
                    <div className={sidePanelWrapper}>
                      <SidePanel>
                        <div className={spanWrapper}>
                    <span className={[name, nameSidePanel].join(" ")}
                          onClick={() => this._openInNewTab(project.linkToSite)}
                    >{project.name_ru} <OpenInNewRounded/></span>
                        </div>
                        <div className={spanWrapper}>
                          <span className={role}>Моя роль: {project.role_ru}</span>
                        </div>
                        <div className={skills}>
                          {project.skills && this.renderSkills(project.skills)}
                        </div>
                        <div className={desc}>{project.desc_ru}</div>
                        <div className={links}>
                          {project.links && this.renderLinks(project.links)}
                        </div>
                      </SidePanel>
                    </div>
                    :
                    <Preloader/>
                )
              }
            </div>
        )
    }

  findProjectByUrl = async () => {

    let folders = [];
    let project = {};
    let url = this.props.location.pathname.replace('/portfolio', '')

    await axios.get(`${process.env.REACT_APP_SERVERURL}/portfolio`)
      .then(res => {
        folders = res.data
      })
      .catch(error => console.error(error))

    let openEach = (arr) => arr.forEach(item => {
      if (item.type === 'project' && item.url === url) {
        project = item;
        return;
      } else if (item.type === 'folder' && item.childs) {
        openEach(item.childs)
      }
    })
    openEach(folders)

    return project;
  }

    _switchPopupGalery = () => {
      this.setState({isOpenPopupGalary: !this.state.isOpenPopupGalary})
    }

    _openImageInPopup = (id) => {
      this.setState({selectedImageId: id})
      this._switchPopupGalery()
    }

    _openInNewTab = (url) => {
      if (url) {
        window.open(url, '_blank');
      }
    }

    renderImages = (images) => {
      return images.map(image => {
        // let img = require(`${image.src}`)
        return (
        <div className={style.imageItem}
             title={image.title}
             key={image.id}
             onClick={() => this._openImageInPopup(image.id)}
        >
          {/*<img width="100" src={image.src} alt={image.title}/>*/}
          <Img src={image.src} alt={image.title} loader={<Preloader/>}/>
        </div>
        )}
      )
    }

    renderSkills = (skills) => {
      return skills.map(skill => (
          <div className={style.skillItem}
               title={skill.name}
               key={skill.id}>
            <img width="100" src={skill.icon} alt={skill.name}/>
          </div>
        )
      )
    }

    renderLinks = (links) => {
      return links.map(link =>
        <div className={style.linkWrap} key={link.id} title={link.name}>
          <span className={style.linkItem}
               onClick={() => {this._openInNewTab(link.url)}}>
            <FontAwesomeIcon icon={['fab', 'github']}/> {link.name}</span>
        </div>
      )
    }
}

ProjectPage.propTypes = {  };
const mapStateToProps = (state) => ({
  ...state
})

export default connect(mapStateToProps)(ProjectPage);
