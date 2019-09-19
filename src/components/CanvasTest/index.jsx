import React from 'react';

import style from './style.module.scss';
import Konva from 'konva'
import { Stage, Text, Star, Layer } from 'react-konva'

class CanvasTest extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

  handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  };
  handleDragEnd = e => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
  };
  getPosMouse = (e) => {
    console.log(`X: ${e.clientX}; Y: ${e.clientY}`)
  }

  render() {
    return (
      <Stage width={500} height={500} onMouseMove={this.getPosMouse} onMouseEnter={this.getPosMouse}>
        <Layer>
          <Text text="Try to drag a star" />
          {[...Array(10)].map((_, i) => (
            <Star
              key={i}
              x={Math.random() * 500}
              y={Math.random() * 500}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              fill="#89b717"
              opacity={0.8}
              draggable
              rotation={Math.random() * 180}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              onDragStart={this.handleDragStart}
              onDragEnd={this.handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}

export default CanvasTest;
