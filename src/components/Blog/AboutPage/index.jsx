import React from 'react';
import Icon from '@mdi/react';
import style from './style.module.scss';
import SidePanel from '../../Common/SidePanel';
import { mdiMedal, mdiSchool, mdiBriefcase } from '@mdi/js';
import { connect } from 'react-redux';
import color from '../../../constants/colors'
import BreadPath from '../../Common/BreadPath';

const icons = {
  award: {
    name: mdiMedal,
    color: color.yellow
  },
  work: {
    name: mdiBriefcase,
    color: color.secondary
  },
  education: {
    name: mdiSchool,
    color: color.primary
  }
}

class AboutPage extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
      const {
        main,
        sidePanelWrapper,
        title,
        workPath,
        workPathTitle,
        educationPath,
        educationTitle,
        shortInfo,
        noMobile,
      } = style;

      return(
          <div className={style.AboutPageContainer}>
              <div className={main}>
                <BreadPath/>
                <div className={title}>
                  {this.props.common.lang === 'en' ? 'About me' : 'Обо мне'}
                </div>
                <div className={shortInfo}>
                  {this.props.common.lang === 'en' ? this.state.info_en : this.state.info_ru}
                </div>
                <div className={workPathTitle}>
                  {this.props.common.lang === 'en' ? 'My path' : 'Мой путь'}
                </div>
                <div className={workPath}
                     style={{
                       backgroundColor: this.props.common.theme === 'dark' ? color.black : color.greySelect_light
                     }}
                >
                  {this.renderWorkPath()}
                </div>
              </div>

              <div className={[sidePanelWrapper, noMobile].join(" ")}>
                <SidePanel>
                  {/*TODO график*/}
                </SidePanel>
              </div>
          </div>
      )
    }

    renderWorkPath = () => {
      const {
        item,
        count,
        name,
        date,
        note,
        icon
      } = style;

      return this.state.works.map((el) => {
        return (
          <div className={item} key={el.id}>
            {/*<div className={count}>{index + 1}</div>*/}
            <div className={name}>
              <div className={icon}><Icon path={icons[el.type].name} color={icons[el.type].color}/></div>
              <span>{el.name}</span>
              <div className={style.spacer} />
              <div className={date}>{el.date}</div>
            </div>
            <div className={note}>{el.note}</div>
          </div>
        )
      })
    }
}

const mapStateToProps = (state) => ({
  common: state.common
})

export default connect(mapStateToProps)(AboutPage);
