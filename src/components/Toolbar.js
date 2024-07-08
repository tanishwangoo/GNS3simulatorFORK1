import React from 'react';
import Draggable from 'react-draggable';

const NetworkTools = [
  { toolid: "Router", NetworkToolsrc: "images/test1.png" },
  { toolid: "PC", NetworkToolsrc: "images/test2.png" },
  { toolid: "RasPi", NetworkToolsrc: "images/test3.png" },
  { toolid: "Switch", NetworkToolsrc: "images/test4.png" },
];

const DraggableToolbar = ({ onDragStop }) => {
  return (
    <div className="toolbar">
      {NetworkTools.map((tool, index) => (
        <Draggable
          key={index}
          onStop={(e, data) => onDragStop(e, data, tool)}
        >
          <div className="network-tool">
            <img src={tool.NetworkToolsrc} alt={tool.toolid} />
            <p>{tool.toolid}</p>
          </div>
        </Draggable>
      ))}
    </div>
  );
};

export default DraggableToolbar;
