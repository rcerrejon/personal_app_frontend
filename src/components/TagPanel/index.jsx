import React from 'react';
import propTypes from 'prop-types'
import style from './style.module.scss';

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
                {this.renderTags()}
              </div>
            </div>
        )
    }

    renderTags = () => {
      const { tag, hash } = style;

      return this.state.tags.map(el => {
        return (
          <div className={tag}
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
      let tags = [...this.state.tags]
      tags.forEach(item => {
        if (item.id === id) {
          item.chosen = !item.chosen;
        }
      })
      this.setState({tags})
    }
}

TagPanel.propTypes = {  };
export default TagPanel;
