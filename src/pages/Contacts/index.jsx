import React from 'react';
        import propTypes from 'prop-types'
        import style from './style.scss';

        class Contacts extends React.Component{
            constructor(props){
                super(props)
                this.state = {}
            }

            componentDidMount() {}

            componentWillUnmount() {}

            render() {
                return(
                    <div className={style.ContactsContainer}>
                        Contacts
                    </div>
                )
            }
        }

        Contacts.propTypes = {  };
        export default Contacts;
