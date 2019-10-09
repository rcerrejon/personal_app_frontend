import Blog from '../../src/pages/Blog';
import * as BlogAction from '../../src/actions/BlogAction';
import * as CommonAction from '../../src/actions/CommonAction';
import {connect} from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import ArticlePage from '../../src/components/Blog/ArticlePage';

class Articlepage extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(context) {
    console.log(context)
    const actionsBlog = bindActionCreators(BlogAction, context.store.dispatch);

    await actionsBlog.getArticle(context.query.id)
    await actionsBlog.getBlog();
  }

  render() {
    return (
      <Blog>
        <ArticlePage/>
      </Blog>)
  }
}

export default connect(
  state => ({
    blog: state.blog,
    common: state.common
  })
)(Articlepage);
