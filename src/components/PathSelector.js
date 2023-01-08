import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SelectorComp from "./SelectorComp/SelectorComp";

function PathSelector({ path, setPath, selectorContent }) {
  const driveLetters = [
    "A:",
    "B:",
    "C:",
    "D:",
    "E:",
    "F:",
    "G:",
    "H:",
    "I:",
    "J:",
    "K:",
    "L:",
    "M:",
    "N:",
    "O:",
    "P:",
    "Q:",
    "R:",
    "S:",
    "T:",
    "U:",
    "V:",
    "W:",
    "X:",
    "Y:",
    "Z:",
    "Select Drive",
  ];
  const handleChange = (e) => {
    const drive = e.target.value;
    setPath((cp) => [...cp, drive + "\\"]);
  };
  const getValue = (index) =>
    path[index]
      ? path[index].replace("\\", "")
      : selectorContent
      ? selectorContent[0]
      : "Select Drive";
  const arrowSrc = require("../images/arrow.png").default;
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
          },

          marginLeft: "auto",
          marginTop: "50px",
        }}
      >
        <Paper elevation={24}>
          <p style={{ color: "black", margin: "20px" }}>
            Please enter drive letter :{" "}
          </p>{" "}
          {["", ...path].map((n, index) => (
            <div style={{ display: "flex" }} key={index}>
              <img
                style={{
                  height: "50px",
                  width: "50px",
                  marginLeft:
                    index == 1 ? "20px" : (index - 1) * 70 + 20 + "px",
                  display: index != 0 ? "block" : "none",
                }}
                src={arrowSrc}
                alt="arrow"
              />
              <SelectorComp
                options={
                  index == 0
                    ? driveLetters
                    : path[index]
                    ? [path[index].replace("\\", "")]
                    : selectorContent
                }
                handleChange={handleChange}
                value={getValue(index)}
                inputLabel={index == 0 ? "Source Drive" : " Folders"}
                setDisabled={index == path.length ? false : true}
              />
            </div>
          ))}
        </Paper>
      </Box>
    </div>
  );
}

export default PathSelector;
