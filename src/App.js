import React from 'react';
import style from './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core/index'
import { faCheckSquare, faCoffee, faArrowRight, faArrowLeft, faEnvelopeOpenText, faTimes, faLanguage, faWindowClose, faFile, faFolder, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/index'
import { fab, faGithub, faGitlab, faGoogle, faBehance, faBitcoin, faPaypal, faCcVisa, faChrome, faCodepen, faDiscord, faDigitalOcean, faDocker, faDribbble, faFacebookSquare, faFirefox, faFlipboard, faFreeCodeCamp, faGit, faGitAlt, faGooglePlusG, faInstagram, faItunes, faItunesNote, faJava, faJsSquare, faNodeJs, faNode, faKickstarter, faLinkedin, faLinux, faMedium, faMicrosoft, faNpm, faOdnoklassnikiSquare, faOpera, faPatreon, faCcPaypal, faPeriscope, faPhp, faPinterest, faPlaystation, faPython, faReact, faReadme, faReddit, faSafari, faSass, faLess, faSistrix, faSketch, faSkype, faSlackHash, faSnapchatSquare, faSoundcloud, faStackOverflow, faSteam, faTelegram, faTrello, faTwitch, faTwitter, faUbuntu, faVk, faWindows, faWikipediaW, faWordpress, faXbox, faYahoo, faYandex, faYandexInternational, faYarn, faYoutube } from '@fortawesome/free-brands-svg-icons'

import { ThemeProvider } from 'styled-components';

import Console from './components/Console';
import Header from './components/Header';
import NavbarMain from './components/NavbarMain';

// eslint-disable-next-line import/no-webpack-loader-syntax
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./config/scss/index.scss');

library.add(faCheckSquare, faCoffee, faArrowRight, faArrowLeft, faEnvelopeOpenText, faTimes, faLanguage, faWindowClose, faGithub, fab, faFile, faFolder, faExternalLinkAlt, faGitlab, faGoogle, faBehance, faBitcoin, faPaypal, faCcVisa, faChrome, faCodepen, faDiscord, faDigitalOcean, faDocker, faDribbble, faFacebookSquare, faFirefox, faFlipboard, faFreeCodeCamp, faGit, faGitAlt, faGooglePlusG, faInstagram, faItunes, faItunesNote, faJava, faJsSquare, faNodeJs, faNode, faKickstarter, faLinkedin, faLinux, faMedium, faMicrosoft, faNpm, faOdnoklassnikiSquare, faOpera, faPatreon, faCcPaypal, faPeriscope, faPhp, faPinterest, faPlaystation, faPython, faReact, faReadme, faReddit, faSafari, faSass, faLess, faSistrix, faSketch, faSkype, faSlackHash, faSnapchatSquare, faSoundcloud, faStackOverflow, faSteam, faTelegram, faTrello, faTwitch, faTwitter, faUbuntu, faVk, faWindows, faWikipediaW, faWordpress, faXbox, faYahoo, faYandex, faYandexInternational, faYarn, faYoutube )

function App(props) {

  return (
    <ThemeProvider theme={theme}>
      <>
        <Header />
        <NavbarMain />
        <div className={style.AppContainer}>
          {props.children}
        </div>
        <Console />
      </>
    </ThemeProvider>
  )
}

export default App;
