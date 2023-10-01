import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import boxStyle from "../Styles/BoxStyle";
import paperStyle from "../Styles/PaperStyle";
import { Button } from "@mui/material";
import { useEffect } from "react";
import getApi from "../../api/api.js";
import AlertComponent from "../AlertComponent/AlertComponent";
import Contents from "../Contents/Contents";

function MacNMobileAndroid({ setSource }) {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState(null);
  const [path, setPath] = useState("sdcard");
  const [accessDevice, setAccessDevice] = useState(false);

  const getDevices = async () => {
    const devices = await getApi("macNMobileAndroid/getDevices/");
    console.log(devices);
    if (!devices) {
      setError({
        header: "Error",
        statement:
          "Unable to connect to your device, see if you have enabled debugging from your mobile.",
      });
      setConnected(false);
      return;
    }
    setDeviceDetails(() => devices[1] + " " + devices[2]);
  };
  useEffect(() => {
    console.log(deviceDetails);
    if (!connected || deviceDetails) return;
    getDevices();
  });

  return (
    <div>
      <Box sx={boxStyle}>
        <Paper sx={{ ...paperStyle }}>
          <div>
            Please connect mobile to the computer , enable file transfer and
            click the button below
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setConnected(true)}
              >
                Connected
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setSource(null)}
              >
                RESET
              </Button>
            </div>
            <br />
            {error && (
              <AlertComponent
                severity={"error"}
                message={error}
                onClose={() => setError(false)}
              />
            )}
            {connected && deviceDetails && (
              <AlertComponent
                severity={"success"}
                message={{
                  header: "Connected",
                  statement: "Connected to " + deviceDetails,
                }}
                onClose={false}
              />
            )}
          </div>
          <div style={{ width: "100%" }}>
            {deviceDetails && !accessDevice && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => setAccessDevice(true)}
              >
                Access Device Contents
              </Button>
            )}
            {accessDevice && <Contents path={path} setPath={setPath} />}
          </div>
        </Paper>
      </Box>
    </div>
  );
}

export default MacNMobileAndroid;
