import React, { useState } from 'react';
import style from './style.module.scss';
import Img from 'react-image';
import { KeyboardArrowRightRounded, KeyboardArrowLeftRounded, Close } from '@material-ui/icons';
import Preloader from '../Preloader';

function PopupGalary(props) {
  const { PopupGalaryContainer, image, btn, close, left, right } = style;
  let arrayImages = props.arrayImages;
  const [currentImage, setCurrentImage] = useState(props.arrayImages.find(el => el.id === props.currentImageId));

  const goNextImage = () => {
    let currentIndex ;
    arrayImages.forEach((el, index) => {
      if(el.id === currentImage.id) {
        currentIndex = index
      }
    })
    if (currentIndex !== arrayImages.length - 1) {
      setCurrentImage(arrayImages[currentIndex + 1])
    }
  }

  const goPrevImage = () => {
    let currentIndex ;
    arrayImages.forEach((el, index) => {
      if(el.id === currentImage.id) {
        currentIndex = index
      }
    })
    if (currentIndex !== 0) {
      setCurrentImage(arrayImages[currentIndex - 1])
    }
  }

  const renderImages = () => {
    return arrayImages.map(el => {
      return(
        <Img key={el.id} src={el.src} style={{zIndex: currentImage.id === el.id ? '11' : '10'}} loader={<Preloader/>}/>
      )
    })
  }

  return (
    <div className={PopupGalaryContainer}>
      <div className={image}>
        {renderImages()}
        <div className={[btn, close].join(" ")} onClick={() => props.closePopup()}><Close/></div>
        <div className={[btn, right].join(" ")} onClick={() => goNextImage()}><KeyboardArrowRightRounded/></div>
        <div className={[btn, left].join(" ")}
             onClick={() => goPrevImage()}
             style={{}}
        ><KeyboardArrowLeftRounded/></div>
      </div>
    </div>
  );
}

export default PopupGalary;
        
