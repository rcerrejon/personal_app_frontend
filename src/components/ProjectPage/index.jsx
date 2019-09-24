import React from 'react';
import {BtnLink} from '../../styled';
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
import BreadPath from '../BreadPath';

class ProjectPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          isMobile: false,
          isOpenPopupGalary: false,
          selectedImageId: null
        }
    }
    actions = bindActionCreators(PortfolioActions, this.props.dispatch);

    async componentDidMount() {
      window.addEventListener('resize', this.updateWidth)
      this.updateWidth()
      let project = await this.findProjectByUrl()
      this.actions.getProjectPage(project.id)
    }

    updateWidth = () => {
      this.setState({isMobile: window.innerWidth <= 999})
    }

    componentWillMount() {
      this.updateWidth()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWidth)
    }

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
                {!(this.props.portfolio.isOpenInfo && this.state.isMobile) && <BreadPath/>}
                <div className={spanWrapper}>
                  <span className={name}
                        onClick={() => this._openInNewTab(project.linkToSite)}
                  >{project.name_ru} <OpenInNewRounded/></span>
                  {this.state.isMobile &&
                    <BtnLink currTheme={this.props.common.theme}
                             onClick={() => this._switchInfo()}
                    >
                      {this.props.common.lang === 'en' ? 'Info' : 'Инфо'}
                    </BtnLink>
                  }
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
                        {this.state.isMobile && <BreadPath/>}
                        <div className={spanWrapper}>
                          <span className={[name, nameSidePanel].join(" ")}
                                onClick={() => this._openInNewTab(project.linkToSite)}
                          >
                            {project.name_ru} <OpenInNewRounded/>
                          </span>
                          {this.state.isMobile &&
                          <BtnLink currTheme={this.props.common.theme}
                                   onClick={() => this._switchInfo()}
                          >
                            {this.props.common.lang === 'en' ? 'Gallery' : 'Галерея'}
                          </BtnLink>
                          }
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

  _switchInfo = () => {
    this.actions.switchInfo()
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
          <FontAwesomeIcon icon={['fab', link.icon]}/> {link.name}</span>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  ...state
})

export default connect(mapStateToProps)(ProjectPage);
