import React from 'react';
import Konva from 'konva';
import { Stage, Text, Layer, Group, Rect } from 'react-konva';

class CanvasTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: 'RAFAL CERREJON',
      mappedWord: [],
    };
  }

  handleDragStart = e => {
    e.target.setAttrs({
      x: 15,
      shadowOffset: {
        x: 15,
        y: 15,
      },
      scaleX: 1.1,
      scaleY: 1.1,
    });
  };
  handleDragEnd = (e, id) => {
    // console.log(e)
    let letter = this.state.mappedWord[id];
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      x: letter.x,
      y: letter.y,
      shadowOffsetX: 5,
      shadowOffsetY: 5,
    });
  };

  componentDidMount() {
    let mappedWord = this.state.word.split('').map((el, i) => {
      return {
        id: i,
        content: el,
        x: 100,
        y: i * 30,
      };
    });

    this.setState({
      mappedWord: [...mappedWord],
    });
  }

  onEnterGroup = e => {
    console.log(e);
  };

  render() {
    return (
      <Stage
        border="1px solid red"
        width={500}
        height={500}
        onMouseMove={this.getPosMouse}
        onMouseEnter={this.getPosMouse}
      >
        <Layer>
          <Group draggable width="100" height="300" x={200} y={200} onMouseEnter={this.onEnterGroup}>
            {this.state.mappedWord.map(el => {
              return (
                <Text
                  text={el.content}
                  fontSize={30}
                  x={el.x}
                  y={el.y}
                  key={el.id}
                  fill="white"
                  draggable
                  onDragStart={this.handleDragStart}
                  onDragEnd={e => this.handleDragEnd(e, el.id)}
                />
              );
            })}
          </Group>
        </Layer>
      </Stage>
    );
  }
}

export default CanvasTest;
