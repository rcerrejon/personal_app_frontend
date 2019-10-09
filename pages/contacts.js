import Contacts from '../src/pages/Contacts';
import * as ContactsActions from '../src/actions/ContactsAction';
import {connect} from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';

class ContactsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(context) {
    console.log(context)
    const actionsContacts = bindActionCreators(ContactsActions, context.store.dispatch);
    await actionsContacts.getLinks()
  }

  render() {
    return <Contacts/>
  }
}

export default connect(
  state => ({
    contacts: state.contacts,
    common: state.common
  })
)(ContactsPage);
