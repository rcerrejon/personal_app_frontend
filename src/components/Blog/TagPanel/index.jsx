import React from 'react';
import style from './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as BlogAction from '../../../actions/BlogAction';
import color from '../../../constants/colors';

class TagPanel extends React.Component{
    constructor(props){
        super(props)
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
            <div className={style.TagPanelContainer}
                 style={{
                   backgroundColor: this.props.common.theme === 'dark' ? color.dark : color.grey2C_light,
                   color: this.props.common.theme === 'dark' ? color.light : color.text_secondary,
                 }}
            >
              <div className={title}>
                # {this.props.common.lang === 'en' ? 'Tags' : 'Теги'}
              </div>
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
               style={{textAlign: !el.chosen ? 'left' : 'right', padding: !el.chosen ? '0 0 0 50%' : '0 50% 0 0', }}
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
      this.props.history.push('/blog')
    }
}

const mapStateToProps = state => {
  return {
    common: {
      theme: state.common.theme,
      lang: state.common.lang
    },
    blog: {
      tags: state.blog.tags
    }
  }
}
export default compose(
  connect(mapStateToProps)
)(TagPanel);
