import React, { useEffect, useState } from "react";
import getApi from "../../api/api";
import FilesProcessor from "../FilesProcessor/FilesProcessor";

function Contents({ path, setPath }) {
  const [contents, setContents] = useState(null);
  const [processFiles, setProcessFiles] = useState(false);

  const getContents = async () => {
    const content = await getApi(
      `macNMobileAndroid/getPathContent?path=${path.replace(/ /g, "%20")}/`
    );
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
            cursor: "pointer",
          }}
          disabled={!path.includes("/") || processFiles}
          onClick={() => {
            setPath((path) =>
              path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : path
            );
          }}
        >
          &larr; Back
        </button>
      </div>

      <h3
        style={{
          color: "dodgerblue",
          fontWeight: "bolder",
          alignSelf: "center",
        }}
      >
        {processFiles ? "Files Processor" : "Contents"}
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "83%",
        }}
      >
        {!processFiles ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            <div>
              {contents &&
                contents.map((c) => (
                  <DisplayContent content={c} onFolderClick={onFolderClick} />
                ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            {processFiles && <FilesProcessor contents={contents} path={path} />}
          </div>
        )}
        <button
          style={{
            marginTop: "20px",
            width: "fit-content",
            alignSelf: "center",
            fontSize: "1.1em",
            background: "none",
            border: "1px solid dodgerblue",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => setProcessFiles((p) => !p)}
        >
          {!processFiles
            ? "Process files in this folder"
            : "Go back to selecting Folder"}
        </button>
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
