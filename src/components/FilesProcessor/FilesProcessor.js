import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { isValidDate } from "../../helpers/helpers";
import { months } from "../../helpers/helpers";
import FilesInfo from "../FilesInfo/FilesInfo";
import CopyConfirmation from "../CopyConfitmation/CopyConfirmation";

function FilesProcessor({ contents, path }) {
  const [filesInfo, setFilesInfo] = useState("");
  const [processing, setProcessing] = useState(false);
  const [pickPath, setPickPath] = useState(false);

  const getFilesInfo = () => {
    const info = contents
      .filter((c) => !c.isDirectory)
      .reduce(
        (acc, cur) => {
          let file = cur.name;
          const fileDate = isValidDate(file);
          if (fileDate) {
            const year = fileDate[0];
            const month = months[fileDate[1]];
            const day = fileDate[2];
            acc.noOfFiles++;
            if (!(year in acc.foldersToBeCreated)) {
              acc.foldersToBeCreated[year] = {};
            }
            if (!(month in acc.foldersToBeCreated[year])) {
              acc.foldersToBeCreated[year][month] = [];
            }
            acc.foldersToBeCreated[year][month].push(file);
          }
          return acc;
        },
        {
          noOfFiles: 0,
          foldersToBeCreated: {},
        }
      );
    setFilesInfo(info);
    setProcessing(false);
  };

  useEffect(() => {
    setProcessing(() => true);
    getFilesInfo();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {pickPath && <CopyConfirmation path={path} setPickPath={setPickPath} />}
      {processing && (
        <div style={{ marginTop: "30%" }}>
          <CircularProgress color="success" />
        </div>
      )}
      <button
        style={{
          border: "none",
          background: "transparent",
          fontWeight: "bold",
          color: "dodgerblue",
        }}
        onClick={() => setPickPath(true)}
      >
        Next &rarr;
      </button>
      <div
        style={{
          alignSelf: "flex-start",
          marginTop: "10px",
        }}
      >
        {filesInfo && <FilesInfo filesInfo={filesInfo} />}
      </div>
    </div>
  );
}

export default FilesProcessor;
