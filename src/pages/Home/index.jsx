import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import style from './style.module.scss';
import {_openInNewTab} from '../../utils/commonFunctions';
import color from '../../constants/colors';
import { connect } from 'react-redux';
import { BtnYellowHome } from '../../styled';
// import CanvasTest from '../../components/CanvasTest';
import ThreejsComponent from '../../components/ThreejsComponent';

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          text_top: '',
          text_left: '',
          text_right: '',
          canRerender: false
        }
    }

  componentDidMount() {
      if (this.props.common.lang === 'en') {
        this.typeText('text_left', 'Greetings')
        setTimeout(() => this.typeText('text_top', "i am Vadim"), 700)
        setTimeout(() => this.typeText('text_right', "web developer"), 1300)
      } else {
        this.typeText('text_left', 'Привет')
        setTimeout(() => this.typeText('text_top', "я Вадим"), 700)
        setTimeout(() => this.typeText('text_right', "веб разработчик"), 1300)
      }
      setTimeout(() => this.setState({
        canRerender: true
      }), 1400)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps && prevProps.common.lang !== this.props.common.lang && this.state && this.state.canRerender){
      this.setState({
        canRerender: false
      })
      this.setState({
        text_top: '',
        text_left: '',
        text_right: ''
      })

      if (this.props.common.lang === 'en') {
        setTimeout(() => this.typeText('text_left', 'Greetings'), 60)
        setTimeout(() => this.typeText('text_top', "i am Vadim"), 700)
        setTimeout(() => this.typeText('text_right', "web developer"), 1300)
      } else {
        setTimeout(() => this.typeText('text_left', 'Привет'), 60)
        setTimeout(() => this.typeText('text_top', "я Вадим"), 700)
        setTimeout(() => this.typeText('text_right', "веб разработчик"), 1300)
      }
      setTimeout(() => this.setState({
        canRerender: true
      }), 1400)
    }
  }

  render() {
      const {
        HomeContainer,
        profileContainer,
        image,
        infoContainer,
        greetText,
        greetItem,
        skills,
        coolThing,
        noBrMobile,
        topText,
        rightText,
        leftText,
        profileContainerWrap
      } = style;

        return(
            <div className={HomeContainer}
                 style={{
                   color: this.props.common.theme === 'dark' ? color.light : color.text_secondary,
                 }}
            >
              <div className={profileContainerWrap}>
                <div className={profileContainer}
                     style={{
                       color: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                     }}
                >
                  <div className={leftText}>{this.state.text_left}{/*Greetings*/}</div>
                  <div className={topText}>{this.state.text_top}{/*i am Vadim*/}</div>
                  <div className={rightText}>{this.state.text_right}{/*web developer*/}</div>
                  <div className={image}
                       style={{
                         borderColor: this.props.common.theme === 'dark' ? color.primary : color.secondary,
                       }}
                  />
                  <BtnYellowHome onClick={() => _openInNewTab("https://github.com/Imlerix")} currTheme={this.props.common.theme}>
                    <FontAwesomeIcon icon={['fab', 'github']}/>
                    {' Github'}
                  </BtnYellowHome>
                </div>
              </div>
              <div className={coolThing}>
                {/*<CanvasTest />*/}
                <ThreejsComponent/>
              </div>
            </div>
        )
    }

    typeText = (state_var, content) => {
      if (content)
        this.setState({
          [state_var]: this.state[state_var] + content[0]
        })
      if (content && content.length > 0)
        setTimeout(() => {
          this.typeText(state_var, content.slice(1))
        }, 50)
    }
}

const mapStateToProps = (state) => {
  return {
    common: state.common
  }
}
export default connect(mapStateToProps)(Home);
