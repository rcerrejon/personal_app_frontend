import Blog from '../../src/pages/Blog';
import Articles from '../../src/components/Blog/Articles';
import * as BlogAction from '../../src/actions/BlogAction';
import {connect} from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(context) {
    const actionsBlog = bindActionCreators(BlogAction, context.store.dispatch, context.store.getState);
    await actionsBlog.getBlog()
  }

  render() {
    return (
      <Blog>
        <Articles/>
      </Blog>)
  }
}

export default connect(
  state => ({
    blog: state.blog,
    common: state.common
  })
)(BlogPage);
