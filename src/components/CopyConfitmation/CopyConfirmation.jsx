import React, { useState } from "react";

function CopyConfirmation({ path, setPickPath }) {
  const [movingPath, setMovingPath] = useState({
    currentPath: path,
    levels: [],
  });
  const ANDROID_LAST_LEVEL = "sdcard";

  const buttonStyle = {
    background: "lightblue",
    border: "1px solid",
    cursor: "pointer",
    // marginTop: "20px",
    padding: "5px",
    height: "30px",
    width: "30px",
    lineHeight: "2px",
  };

  return (
    <div
      style={{
        minWidth: "90%",
        border: "2px solid black",
        padding: "20px 10px",
        display: "absolute",
        position: "absolute",
        background: "whitesmoke",
      }}
    >
      {console.log(movingPath)}
      <div>Select Where you want the sorted files to be copied:</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            margin: "20px 0px",
            border: "1px solid black",
            width: "80%",
            padding: "5px 0px 5px 20px",
            color: "tomato",
          }}
        >
          {movingPath.currentPath}
        </div>
        <button
          onClick={() => {
            let pathArray = movingPath.currentPath.split("/");
            const currentFolder = pathArray.pop();
            setMovingPath((path) => ({
              currentPath: pathArray.join("/"),
              levels: [...path.levels, currentFolder],
            }));
          }}
          style={buttonStyle}
          disabled={movingPath.currentPath == ANDROID_LAST_LEVEL}
        >
          &darr;
        </button>
        <button
          onClick={() => {
            const newPath =
              movingPath.currentPath +
              "/" +
              movingPath.levels[movingPath.levels.length - 1];
            const newLevel = [...movingPath.levels];
            newLevel.pop();
            setMovingPath((path) => ({
              currentPath: newPath,
              levels: newLevel,
            }));
          }}
          disabled={movingPath.levels.length === 0}
          style={buttonStyle}
        >
          &uarr;
        </button>
      </div>
      <div>
        <button>Start</button>
        <button onClick={() => setPickPath(false)}>Go Back</button>
      </div>
    </div>
  );
}

export default CopyConfirmation;
