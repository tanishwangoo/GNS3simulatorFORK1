import React, { useState, useRef } from "react";
import {
  Stage,
  Layer,
  Line,
  Circle,
  Text,
  Image as KonvaImage,
} from "react-konva";
import useImage from "use-image";

const Workspace = ({
  elements,
  connections,
  addConnection,
  deleteConnection,
  isEraseMode,
}) => {
  const stageRef = useRef(null);

  // Element drop karne ke liye handleDrop function
  const handleDrop = (e) => {
    e.preventDefault();
    const stage = stageRef.current.getStage();
    const pointerPosition = stage.getPointerPosition();
    const tool = JSON.parse(e.dataTransfer.getData("tool"));

    if (!tool || !pointerPosition) {
      console.error("Invalid drop data:", { tool, pointerPosition });
      return;
    }

    // Device name prompt karna
    const name = prompt("Enter device name:");
    if (!name) {
      return;
    }

    const newElement = {
      ...tool,
      x: pointerPosition.x,
      y: pointerPosition.y,
      id: elements.length,
      name: name,
    };

    setElements((prevElements) => [...prevElements, newElement]);
  };

  // Drag over handle karne ke liye
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Connection ka start point handle karne ke liye
  const handleConnectionStart = (element, pointIndex) => {
    setStartConnection({ element, pointIndex });
    setIsConnecting(true);
  };

  // Connection ka end point handle karne ke liye
  const handleConnectionEnd = (element, pointIndex) => {
    if (isConnecting && startConnection) {
      const startElement = startConnection.element;
      const startPoint =
        getConnectionPoints(startElement)[startConnection.pointIndex];
      const endPoint = getConnectionPoints(element)[pointIndex];

      const points = [startPoint, { x: startPoint.x, y: endPoint.y }, endPoint];

      addConnection({
        start: startConnection,
        points: points,
        end: { element, pointIndex },
      });

      setStartConnection(null);
      setIsConnecting(false);
    }
  };

  const getConnectionPoints = (element) => [
    { x: element.x + 25, y: element.y }, // Top
    { x: element.x + 50, y: element.y + 25 }, // Right
    { x: element.x + 25, y: element.y + 50 }, // Bottom
    { x: element.x, y: element.y + 25 }, // Left
  ];

  const updateElementPosition = (id, newPosition) => {
    setElements((prevElements) =>
      prevElements.map((el) => (el.id === id ? { ...el, ...newPosition } : el))
    );
  };

  const handleLineClick = (index) => {
    if (isEraseMode) {
      deleteConnection(index);
    }
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(240, 240, 240)",
        overflow: "auto",
        position: "relative",
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={stageRef}
      >
        <Layer>
          {elements.map((element) => (
            <URLImage
              key={element.id}
              element={element}
              connectionPoints={getConnectionPoints(element)}
              onConnectionStart={(pointIndex) =>
                handleConnectionStart(element, pointIndex)
              }
              onConnectionEnd={(pointIndex) =>
                handleConnectionEnd(element, pointIndex)
              }
              onDragMove={(e) => {
                updateElementPosition(element.id, {
                  x: e.target.x(),
                  y: e.target.y(),
                });
              }}
            />
          ))}
          {connections.map((connection, index) => (
            <Line
              key={index}
              points={connection.points.flatMap(({ x, y }) => [x, y])}
              stroke="black"
              strokeWidth={2}
              lineCap="round"
              lineJoin="round"
              onClick={() => handleLineClick(index)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

const URLImage = ({
  element,
  connectionPoints,
  onConnectionStart,
  onConnectionEnd,
  onDragMove,
}) => {
  const [image] = useImage(element.src);

  return (
    <>
      <KonvaImage
        image={image}
        x={element.x}
        y={element.y}
        width={50}
        height={50}
        draggable
        onDragMove={onDragMove}
      />
      {connectionPoints.map((point, index) => (
        <Circle
          key={index}
          x={point.x}
          y={point.y}
          radius={5}
          fill="red"
          draggable={false}
          onMouseDown={() => onConnectionStart(index)}
          onMouseUp={() => onConnectionEnd(index)}
        />
      ))}
      <Text
        text={element.name || ""}
        x={element.x}
        y={element.y + 50}
        width={50}
        align="center"
        fontSize={12}
        fill="black"
      />
    </>
  );
};

export default Workspace;
