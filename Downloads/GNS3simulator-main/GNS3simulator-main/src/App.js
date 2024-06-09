import React, { useState } from "react";
import Toolbar from "./Toolbar";
import Workspace from "./Workspace";
import Summary from "./Summary";

function App() {
  // State to manage elements, connections, and erase mode
  const [elements, setElements] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isEraseMode, setIsEraseMode] = useState(false);

  // New element add karne ke liye function
  const addElement = (element) => {
    setElements((prevElements) => [...prevElements, element]);
  };

  // New connection add karne ke liye function
  const addConnection = (connection) => {
    setConnections((prevConnections) => [...prevConnections, connection]);
  };

  // Connection delete karne ke liye function
  const deleteConnection = (index) => {
    setConnections((prevConnections) => {
      // Filter out the connection to be deleted
      const updatedConnections = prevConnections.filter((_, i) => i !== index);

      // Elements ko check karo jinme abhi bhi connections hain
      const elementsWithConnections = updatedConnections.flatMap(
        (connection) => [connection.start.element.id, connection.end.element.id]
      );
      const uniqueElementsWithConnections = [
        ...new Set(elementsWithConnections),
      ];

      // Elements remove karo jinme koi connection nahi bacha
      const updatedElements = elements.filter((element) =>
        uniqueElementsWithConnections.includes(element.id)
      );

      // New elements aur connections ke state update karo
      setElements(updatedElements);

      return updatedConnections;
    });
  };

  // Erase mode toggle karne ke liye function
  const toggleEraseMode = () => {
    setIsEraseMode((prevMode) => !prevMode);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          padding: "10px",
          backgroundColor: "#e0e0e0",
          borderBottom: "1px solid #ccc",
          fontSize: "14px",
          color: "#333",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "20px",
          zIndex: "10",
          textAlign: "left",
        }}
      >
        IOT Security Lab
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "calc(100vh - 40px)",
          marginTop: "40px",
        }}
      >
        <Toolbar
          onDropElement={addElement}
          toggleEraseMode={toggleEraseMode}
          isEraseMode={isEraseMode}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "auto",
          }}
        >
          <Workspace
            elements={elements}
            connections={connections}
            addConnection={addConnection}
            deleteConnection={deleteConnection}
            isEraseMode={isEraseMode}
          />
        </div>
        <Summary />
      </div>
    </div>
  );
}

export default App;
