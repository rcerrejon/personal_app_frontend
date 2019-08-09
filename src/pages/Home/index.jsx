import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import propTypes from 'prop-types'
import style from './style.scss';
import Logo from '../../components/Logo';

class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        return(
            <div className={style.HomeContainer}>
              <div className={style.empty}></div>
              <div className={style.profileContainer}>
                <div className={style.image} />
                <div className={style.btn_action}><FontAwesomeIcon icon={['fab', 'github']}/> Github</div>
              </div>
              <div className={style.infoContainer}>
                <div className={style.greetText}>Hi,<br/> i'm Vadim,<br/> web developer</div>
                <div className={style.skills}>Full stack / Reactjs / Expressjs </div>
              </div>
              <div className={style.empty2}></div>
              <div className={style.coolThing}>крутая штука <br/>вращается.</div>
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
