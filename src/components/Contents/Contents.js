import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function Contents({ path, contents }) {
  const { contents: all, folders } = contents;
  return (
    <div>
      <Box
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
      >
        <Paper elevation={24}>
          <h5
            style={{
              color: "dodgerblue",
              fontWeight: "bolder",
              marginLeft: "20px",
            }}
          >
            Path : <span style={{ color: "tomato" }}>{path}</span>
          </h5>

          <h5
            style={{
              color: "dodgerblue",
              fontWeight: "bolder",
              marginLeft: "20px",
            }}
          >
            Contents :
          </h5>
          <div style={{ display: "flex" }}>
            <ul
              style={{
                display: "flex",
                height: all.length > 0 ? all.length * 10 + "px" : "inherit",
                flexWrap: "wrap",
                flexDirection: "column",
                flexGrow: "2",
                listStyleType: "none",
                overflow: "auto",
              }}
            >
              {all.map((f) => (
                <li>{f}</li>
              ))}
            </ul>
          </div>
        </Paper>
      </Box>
    </div>
  );
}

export default Contents;
