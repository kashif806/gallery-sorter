import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

function FolderSelect({
  contents,
  setContents,
  setPath,
  path,
  drive,
  setDrive,
  processFolder,
}) {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    setSelected(() => "");
  }, [contents]);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          "& > :not(style)": {
            m: 1,
            width: "80%",
            height: 300,
          },

          marginLeft: "auto",
          marginTop: "50px",
        }}
      >
        <Paper elevation={24}>
          <p style={{ color: "black", margin: "20px", marginTop: "20px" }}>
            Please Select desired folder :
          </p>{" "}
          <Grid container rowSpacing={1} columnSpacing={1}>
            {!selected ? (
              contents.folders.map((folder) => (
                <Grid item>
                  <Button
                    variant="text"
                    color="warning"
                    key={folder}
                    onClick={() => {
                      setSelected(folder);
                      setPath((path) => path + "\\" + folder);
                    }}
                  >
                    {folder}
                  </Button>
                </Grid>
                // </div>
              ))
            ) : (
              <div>
                <p>
                  You have selected "
                  {<Button color="warning">{selected}</Button>}" Folder
                  <br></br>
                </p>
              </div>
            )}
          </Grid>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
              justifyContent: "space-around",
              marginTop: "60px",
              overflow: "auto",
            }}
          >
            <Button
              onClick={() => {
                processFolder();
              }}
            >
              Select
            </Button>
            <Button
              onClick={() => {
                setContents({ folders: [], contents: [] });
                setPath("");
                setDrive("");
              }}
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                setPath("");
              }}
            >
              Back
            </Button>
          </div>
        </Paper>
      </Box>
      <div
        style={{
          margin: "auto",
          marginTop: "50px",
          border: "2px solid blue",
          overflow: "auto",
          width: "80%",
          height: "200px",
        }}
      >
        <h2>
          Complete contents of {drive}:\{path}{" "}
        </h2>
        <ul>
          {contents.contents.map((elem) => (
            <li>{elem}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FolderSelect;
