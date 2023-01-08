import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function SelectionBox({ aligncenter = false, height, children }) {
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
            height: { height: height ? height : "300px" },
          },

          marginLeft: "auto",
          marginTop: "50px",
        }}
      >
        <Paper
          elevation={24}
          sx={{
            backgroundColor: "#f3f7f0",
            display: "flex",
            paddingLeft: "20px",
            alignItems: { alignItems: aligncenter ? "center" : "" },
          }}
        >
          {children}
        </Paper>
      </Box>
    </div>
  );
}

export default SelectionBox;
