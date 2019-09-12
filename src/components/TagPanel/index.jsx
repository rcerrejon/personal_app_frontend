import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as BlogAction from '../../actions/BlogAction';

class TagPanel extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          tags: [
            {
              id: 1,
              name: 'Frontend',
              chosen: false
            },
            {
              id: 2,
              name: 'Backend',
              chosen: false
            },
            {
              id: 3,
              name: 'Unity',
              chosen: false
            },
            {
              id: 4,
              name: 'ML',
              chosen: false
            },
          ]
        }
    }
    actionsBlog = bindActionCreators(BlogAction, this.props.dispatch);

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        const {
          title,
          taglist
        } = style;

          return(
            <div className={style.TagPanelContainer}>
              <div className={title}># Tags</div>
              <div className={taglist}>
                {this.props.blog.tags && this.renderTags()}
              </div>
            </div>
        )
    }

    renderTags = () => {
      const { tag, hash } = style;

      return this.props.blog.tags.map(el => {
        return (
          <div className={tag}
               key={el.id}
               style={{padding: !el.chosen ? '0 0 0 50%' : '0 50% 0 0', textAlign: !el.chosen ? 'left' : 'right'}}
          >
            <span onClick={() => this.chooseTag(el.id)}>
              <div className={hash}>#</div>
              {el.name}
            </span>
          </div>
        )
      })
    }

    chooseTag = (id) => {
      let tags = [...this.props.blog.tags]
      tags.forEach(item => {
        if (item.id === id) {
          item.chosen = !item.chosen;
        }
      })
      this.actionsBlog.chooseTags(tags)
      this.actionsBlog.getBlog();
    }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}
export default connect(mapStateToProps)(TagPanel);
