import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import propTypes from 'prop-types'
import style from './style.module.scss';
import Logo from '../../components/Logo';

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
      const {HomeContainer, empty, profileContainer, image, btn_action, infoContainer, greetText, skills, empty2, coolThing} = style;

        return(
            <div className={HomeContainer}>
              <div className={empty}></div>
              <div className={profileContainer}>
                <div className={image} />
                <div className={btn_action}><FontAwesomeIcon icon={['fab', 'github']}/> Github</div>
              </div>
              <div className={infoContainer}>
                <div className={greetText}>Hi,<br/> i'm Vadim,<br/> web developer</div>
                <div className={skills}>Full stack / Reactjs / Expressjs </div>
              </div>
              <div className={empty2}></div>
              <div className={coolThing}>крутая штука <br/>вращается.</div>
            </div>
        )
    }

    componentDidMount() {}

    componentWillUnmount() {}


    onMouseEnterCustom = (e, item) => {
      console.log(item)
    }
    onMouseLeaveCustom = () => {
      console.log('Mouse leaved!')
    }
    onMouseOutCustom = () => {
      console.log('Mouse out!')
    }
}

Home.propTypes = {  };
export default Home;
