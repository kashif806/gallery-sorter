import React, { useEffect, useState } from "react";
import getApi from "../../api/api";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function Contents({ path, setPath }) {
  const [contents, setContents] = useState(null);

  const getContents = async () => {
    console.log("getting content");
    const content = await getApi(
      `macNMobileAndroid/getPathContent?path=${path.replace(/ /g, "%20")}/`
    );
    console.log(content);
    // setContents(content.replace(/\n/g, "<br>"));
    setContents(content);
  };

  useEffect(() => {
    getContents();
  }, [path]);

  const onFolderClick = (folderName) => {
    console.log(folderName);
    setPath((path) => `${path}/${folderName}`);
  };

  return (
    <div>
      {/* <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          "& > :not(style)": {
            m: 1,
            minWidth: "80%",
          },
          marginLeft: "auto",
          marginTop: "50px",
        }}
      > */}
      <div
        style={{
          padding: "1em",
          display: "flex",
          flexDirection: "column",
          border: "3px solid cadetblue",
          borderRadius: "10px",
          height: " 50vh",
          position: "relative",
        }}
      >
        {/* <Paper elevation={24}> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
          }}
        >
          <h5
            style={{
              color: "dodgerblue",
              fontWeight: "bolder",
            }}
          >
            Path : <span style={{ color: "tomato" }}>{path}</span>
          </h5>
          <button
            style={{
              border: "none",
              background: "none",
              textDecoration: "underline",
            }}
            onClick={() => {
              setPath((path) =>
                path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : path
              );
            }}
          >
            &larr; Back
          </button>
        </div>

        <h5
          style={{
            color: "dodgerblue",
            fontWeight: "bolder",
            alignSelf: "center",
          }}
        >
          Contents
        </h5>
        <div
          style={{ display: "flex", flexDirection: "column", overflow: "auto" }}
        >
          <div>
            {contents &&
              contents.map((c) => (
                <DisplayContent content={c} onFolderClick={onFolderClick} />
              ))}
          </div>
          {/* </ul> */}
        </div>
        {/* </Paper> */}
      </div>
    </div>
  );
}

const DisplayContent = ({ content, onFolderClick }) => {
  return (
    <span
      style={{
        textDecoration: content.isDirectory ? "underline" : "",
        lineHeight: "1.5em",
        cursor: content.isDirectory ? "pointer" : "",
      }}
      onClick={content.isDirectory ? () => onFolderClick(content.name) : null}
    >
      {content.name}
      <br />
    </span>
  );
};

export default Contents;
