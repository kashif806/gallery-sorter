import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

function AlertComponent({ severity, message, onClose }) {
  return (
    <Alert severity={severity} {...(onClose ? (onClose = { onClose }) : null)}>
      <AlertTitle>{message.header}</AlertTitle>
      {message.statement}
    </Alert>
  );
}

export default AlertComponent;
