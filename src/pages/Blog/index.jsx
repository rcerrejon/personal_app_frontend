import React from 'react';
        import propTypes from 'prop-types'
        import style from './style.scss';

        class Blog extends React.Component{
            constructor(props){
                super(props)
                this.state = {}
            }

            componentDidMount() {}

            componentWillUnmount() {}

            render() {
                return(
                    <div className={style.BlogContainer}>
                        Blog
                    </div>
                )
            }
        }

        Blog.propTypes = {  };
        export default Blog;
