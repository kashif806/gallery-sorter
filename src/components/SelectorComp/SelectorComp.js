import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function SelectorComp({
  options,
  value,
  handleChange,
  inputLabel,
  setDisabled,
}) {
  return (
    <div>
      <FormControl sx={{ width: "300px", margin: "20px" }}>
        <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
        <Select
          labelId="driveLetterLabel"
          id="driveLetter"
          value={value}
          label="driveLetter"
          onChange={handleChange}
          disabled={setDisabled}
        >
          {options.map((l) => (
            <MenuItem key={l} value={l}>
              {l}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectorComp;
