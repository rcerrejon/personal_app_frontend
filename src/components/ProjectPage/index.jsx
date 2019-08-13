import React from 'react';
        import propTypes from 'prop-types'
        import style from './style.module.scss';

        class ProjectPage extends React.Component{
            constructor(props){
                super(props)
                this.state = {}
            }

            componentDidMount() {}

            componentWillUnmount() {}

            render() {
                return(
                    <div className={style.ProjectPageContainer}>
                        ProjectPage
                    </div>
                )
            }
        }

        ProjectPage.propTypes = {  };
        export default ProjectPage;
