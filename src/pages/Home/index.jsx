import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import style from './style.module.scss';
import {_openInNewTab} from '../../utils/commonFunctions';
import color from '../../constants/colors';
import { connect } from 'react-redux';

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
      const {
        HomeContainer,
        empty,
        profileContainer,
        image,
        btn_action,
        infoContainer,
        greetText,
        greetItem,
        skills,
        empty2,
        coolThing
      } = style;

        return(
            <div className={HomeContainer}
                 style={{
                   color: this.props.common.theme === 'dark' ? color.light : color.text_secondary,
                 }}
            >
              <div className={empty} />
              <div className={profileContainer}>
                <div className={image}
                     style={{
                       borderColor: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                     }}
                />
                <div className={btn_action} onClick={() => _openInNewTab("https://github.com/Imlerix")}>
                  <FontAwesomeIcon icon={['fab', 'github']}/>
                  {this.props.common.lang === 'en'
                    ?
                    ' Github'
                    :
                    ' Гитхаб'
                  }
                </div>
              </div>
              <div className={infoContainer}>
                <div className={greetText}>
                  {this.props.common.lang === 'en'
                    ?
                    <div><span className={greetItem}>Hi,</span><br/><span className={greetItem}>i'm Vadim,</span><br/><span className={greetItem}>web developer</span></div>
                    :
                    <div><span className={greetItem}>Привет,</span><br/><span className={greetItem}>я Вадим,</span><br/><span className={greetItem}>веб разработчик</span></div>
                }</div>
                <div className={skills}>Full stack / ReactJS / ExpressJS </div>
              </div>
              <div className={empty2} />
              <div className={coolThing}>{/*TODO крутая штука <br/>вращается.*/}</div>
            </div>
        )
    }

    componentDidMount() {}

    componentWillUnmount() {}


    // onMouseEnterCustom = (e, item) => {
    //   console.log(item)
    // }
    // onMouseLeaveCustom = () => {
    //   console.log('Mouse leaved!')
    // }
    // onMouseOutCustom = () => {
    //   console.log('Mouse out!')
    // }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}
export default connect(mapStateToProps)(Home);
