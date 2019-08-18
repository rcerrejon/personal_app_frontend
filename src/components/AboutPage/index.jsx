import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import SidePanel from '../SidePanel';
import { OpenInNewRounded } from '@material-ui/icons/index';

class AboutPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          shortInfo: 'Привет, я Голенко Вадим (Удачин - псевдоним), родился в Волгограде и в 2017 году поступил в МосПолитех на "Веб-разработку". В настоящий момент ищу работу направленности Full-stack или Front-end разработчика.',
          works: [
            {
              id: 1,
              company: 'WNM.Digital',
              linkToSite: 'www.wnm.digital',
              date: 'February 2019',
              period: 3.5,
              note: 'Два месяца стажировался, затем 1.5 месяца работа на должности'
            }
          ],
          educations: [
            {
              id: 2,
              name: 'Московский Политехнический Университет',
              date: '2017 - 2021',
              note: 'Факультет информационных технологий (ФИТ), направление Веб-разработка'
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
                <div className={title}>About me</div>
                <div className={shortInfo}>{this.state.shortInfo}</div>
                <div className={workPathTitle}>Work path</div>
                <div className={[workPath, noMobile].join(" ")}>
                  {this.renderWorkPath()}
                </div>
                <div className={educationTitle}>Education</div>
                <div className={educationPath}>
                  {this.renderEducations()}
                </div>
              </div>

              <div className={sidePanelWrapper}>
                <SidePanel>
                  график
                </SidePanel>
              </div>
          </div>
      )
    }

  renderEducations = () => {
    const {
      eduItem,
      count,
      name,
      date,
      note
    } = style;

      return this.state.educations.map((el, index) => {
        return (
          <div className={eduItem}>
            <div className={count}>{index + 1}</div>
            <div className={name}>{el.name}</div>
            <div className={date}>{el.date}</div>
            <div className={note}>{el.note}</div>
          </div>
        )
      })
  }

    renderWorkPath = () => {
      const {
        workItem,
        count,
        company,
        date,
        period,
        note
      } = style;

      return this.state.works.map((el, index) => {
        return (
          <div className={workItem}>
            <div className={count}>{index + 1}</div>
            <div className={company}>{el.company}</div>
            <div className={date}>{el.date}</div>
            <div className={period}>{el.period}</div>
            <div className={note}>{el.note}</div>
          </div>
        )
      })
    }
}

AboutPage.propTypes = {  };
export default AboutPage;
