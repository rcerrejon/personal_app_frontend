import App from '../src/App'
import Contacts from '../src/pages/Contacts';
import * as ContactsActions from '../src/actions/ContactsAction';
import {connect} from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';

class ContactsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getInitialProps(context) {
    const actionsContacts = bindActionCreators(ContactsActions, context.store.dispatch);
    actionsContacts.getLinks()
  }

  render() {
    return <Contacts/>
  }
}

export default connect(
  state => state,
  ContactsActions
)(ContactsPage);
