import Portfolio from '../../src/pages/Portfolio';
import AboutPage from '../../src/components/Blog/AboutPage'
import * as PortfolioAction from '../../src/actions/PortfolioActions';
import {connect} from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';

class AboutNext extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(context) {
    const actionsPortfolio = bindActionCreators(PortfolioAction, context.store.dispatch, context.store.getState);
    await actionsPortfolio.getFolders()

    return {
      pathname: context.pathname
    }
  }

  render() {
    return (
      <Portfolio pathname={this.props.pathname}>
        <AboutPage pathname={this.props.pathname}/>
      </Portfolio>)
  }
}

export default connect(
  state => ({
    portfolio: state.portfolio,
    common: state.common
  })
)(AboutNext);
