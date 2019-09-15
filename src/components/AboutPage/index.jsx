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
              name: 'WNM.Digital',
              linkToSite: 'www.wnm.digital',
              date: 'Feb - May, 2019',
              note: 'Будучи junior-программистом занимался front-end разработкой на Vue.js .'
            },
            {
              id: 2,
              name: 'Qiwi',
              linkToSite: 'www.wnm.digital',
              date: 'Aug 2019 - Aug 2020',
              note: 'Будучи middle-программистом занимался front-end разработкой на React.js .'
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
                <div className={workPath}>
                  {this.renderWorkPath()}
                </div>
                <div className={educationTitle}>Education</div>
                <div className={educationPath}>
                  {this.renderEducations()}
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

  renderEducations = () => {
    const {
      item,
      count,
      name,
      date,
      note
    } = style;

      return this.state.educations.map((el) => {
        return (
          <div className={item} key={el.id}>
            {/*<div className={count}>{index + 1}</div>*/}
            <div className={name}>
              <span>{el.name}</span>
              <div className={date}>{el.date}</div>
            </div>
            <div className={note}>{el.note}</div>
          </div>
        )
      })
  }

    renderWorkPath = () => {
      const {
        item,
        count,
        name,
        date,
        note
      } = style;

      return this.state.works.map((el) => {
        return (
          <div className={item} key={el.id}>
            {/*<div className={count}>{index + 1}</div>*/}
            <div className={name}>
              <span>{el.name}</span>
              <div className={date}>{el.date}</div>
            </div>
            <div className={note}>{el.note}</div>
          </div>
        )
      })
    }
}

AboutPage.propTypes = {  };
export default AboutPage;
