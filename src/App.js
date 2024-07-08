import React, { useState } from "react";
import DraggableToolbar from "./components/Toolbar";
import Workspace from "./components/Workspace";
import Summary from "./components/Summary";
import "./App.css";
import Canvas from "./components/Canvas";





function App() {
  const [elements, setElements] = useState([]);

  const handleDragStop = (e, data, tool) => {
    const img = new window.Image();
    img.src = tool.NetworkToolsrc;
    img.onload = () => {
      setElements((prevElements) => [
        ...prevElements,
        { x: data.x, y: data.y, image: img },
      ]);
    };
  };

  return (
    <div className="app-container">
      <div className="header">IOT Security Lab</div>
      <DraggableToolbar onDragStop={handleDragStop} />
      <Canvas elements={elements} />
    </div>
  );
};

export default App;
