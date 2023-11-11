import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { postApi } from "../../api/api";

function CopyConfirmation({ path, setPickPath, filesInfo }) {
  const [movingPath, setMovingPath] = useState({
    currentPath: path,
    levels: [],
  });
  const [folderName, setFolderName] = useState(
    "sorted " + movingPath.currentPath.split("/").pop().toString() + " files"
  );
  const [disableStart, setDisableStart] = useState(false);

  const copyingPath = () => movingPath.currentPath + "/" + folderName;

  const ANDROID_LAST_LEVEL = "sdcard";

  const copyFiles = async () => {
    setDisableStart(true);
    console.log(filesInfo);
    let res = await postApi(`macNMobileAndroid/CopyFiles/`, {
      folderName: folderName,
      path: path,
      movingPath: movingPath.currentPath,
      filesInfo: filesInfo,
    });
    if (!res) {
      console.log("something went wrong");
    }
    console.log(res);
    setDisableStart(false);
  };

  return (
    <div
      style={{
        minWidth: "90%",
        border: "2px solid black",
        borderRadius: "5px",
        padding: "20px 10px",
        display: "absolute",
        position: "absolute",
        background: "whitesmoke",
      }}
    >
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
        <IconButton
          onClick={() => {
            let pathArray = movingPath.currentPath.split("/");
            const currentFolder = pathArray.pop();
            setMovingPath((path) => ({
              currentPath: pathArray.join("/"),
              levels: [...path.levels, currentFolder],
            }));
          }}
          disabled={movingPath.currentPath == ANDROID_LAST_LEVEL}
          color="primary"
          aria-label="add an alarm"
        >
          <ArrowDownwardIcon />
        </IconButton>
        <IconButton
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
          color="primary"
          aria-label="add an alarm"
        >
          <ArrowUpwardIcon />
        </IconButton>
      </div>
      <div style={{ width: "50%" }}>
        {console.log(folderName)}
        {/* Name of the main folder created at selected Path */}
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            id="outlined-helperText"
            label="Name of the main folder created at selected Path"
            defaultValue={
              "sorted " +
              movingPath.currentPath.split("/").pop().toString() +
              " files"
            }
            onChange={({ target: { value } }) => setFolderName(value)}
          />
        </FormControl>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          variant="outlined"
          color="success"
          onClick={() => copyFiles()}
          disabled={folderName === "" || disableStart}
        >
          Start
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => setPickPath(false)}
        >
          GO Back
        </Button>
      </div>
    </div>
  );
}

export default CopyConfirmation;
