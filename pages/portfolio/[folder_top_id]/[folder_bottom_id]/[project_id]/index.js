import Portfolio from '../../../../../src/pages/Portfolio';
import FoldersAndFiles from '../../../../../src/components/Portfolio/FoldersAndFiles'
import * as PortfolioAction from '../../../../../src/actions/PortfolioActions';
import {connect} from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import ProjectPage from '../../../../../src/components/Portfolio/ProjectPage';

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(context) {
    const actionsPortfolio = bindActionCreators(PortfolioAction, context.store.dispatch, context.store.getState);
    await actionsPortfolio.getFolders()

    return {
      pathname: context.pathname
        .replace('[folder_top_id]', `${context.query.folder_top_id}`)
        .replace('[folder_bottom_id]', `${context.query.folder_bottom_id}`)
        .replace('[project_id]', `${context.query.project_id}`)
    }
  }

  render() {
    return (
      <Portfolio pathname={this.props.pathname}>
        <ProjectPage pathname={this.props.pathname}/>
      </Portfolio>)
  }
}

export default connect(
  state => ({
    portfolio: state.portfolio,
    common: state.common
  })
)(PortfolioPage);
