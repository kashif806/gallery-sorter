import "../../App.css";
import React, { useEffect, useState } from "react";
import PathSelector from "../PathSelector";
import Alert from "@mui/material/Alert";
import FolderSelect from "..//FolderSelect";
import SelectionBox from "../SelectionBox/SelectionBox";
import Contents from "../Contents/Contents";
// import arrow from "./images/arrow-right.png";

function Main() {
  useEffect(() => {
    getData();
  }, []);
  const [path, setPath] = useState([]);
  const [error, setError] = useState(false);
  const [contents, setContents] = useState({ folders: [], contents: [] });
  // const [drive, setDrive] = useState("");
  useEffect(() => {
    if (path.length > 0) {
      getDriveContents();
    }
  }, [path]);
  const getData = async () => {
    const res = await fetch("http://localhost:4000/");
    const data = await res.json();
    console.log(data);
  };
  const processFolder = async () => {
    const res = await fetch("http://localhost:4000/process", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        path: path,
      }),
    });
    const rep = await res.json();
    if (!rep) {
      setError(true);
    } else {
      console.log(rep);
      setContents({ folders: [], contents: [] });
      setPath("");
    }
  };
  const getDriveContents = async () => {
    console.log(getCurrentPath());
    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        path: getCurrentPath(),
      }),
    });
    const rep = await res.json();
    if (!rep) {
      setError(true);
    } else {
      console.log(rep);
      setError(false);
      setContents(() => ({ folders: rep.foldersOnly, contents: rep.contents }));
    }
  };

  const getCurrentPath = () => path.reduce((acc, cur) => acc + cur, "");

  return (
    <div className="App">
      {console.log(path)}
      {console.log(getCurrentPath())}
      <SelectionBox height={"100px"} aligncenter={true}>
        <p>
          <span
            style={{
              color: "dodgerblue",
              fontWeight: "bolder",
            }}
          >
            Current Path :{" "}
          </span>
          {getCurrentPath()}
        </p>
      </SelectionBox>
      {error && (
        <Alert
          onClose={() => setError(false)}
          severity="error"
          sx={{
            marginTop: "200px",
            marginLeft: "100px",
            position: "fixed",
            width: "80%",
          }}
        >
          Somethig went wrong, please make sure you have selected correct
          drive/folder
        </Alert>
      )}
      <div>
        <PathSelector
          path={path}
          setPath={setPath}
          selectorContent={contents.folders}
        />
      </div>
      <Contents path={path} contents={contents} />
    </div>
  );
}

export default Main;
