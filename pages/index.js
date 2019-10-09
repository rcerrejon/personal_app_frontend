import Home from '../src/pages/Home';
import {connect} from 'react-redux';
import React from 'react';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Home/>
  }
}

export default connect(
  state => state
)(HomePage);
