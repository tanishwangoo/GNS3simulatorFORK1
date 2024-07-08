import React, { useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';


function Canvas({elements}){
    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            {elements.map((el, index) => (
              <Image
                width = "100"
                height = "100"
                key={index}
                x={el.x}
                y={el.y}
                image={el.image}
                draggable
              />
            ))}
          </Layer>
        </Stage>
      );
    }
export default Canvas;