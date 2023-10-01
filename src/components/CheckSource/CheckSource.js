import React from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import boxStyle from '../Styles/BoxStyle';
import paperStyle from '../Styles/PaperStyle';
import { Radio } from '@mui/material';
import { RadioGroup } from '@mui/material';
import { FormControl } from '@mui/material';
import { FormControlLabel } from '@mui/material';

function CheckSource ({source, setSource}) {
  return (
    <div>
        <Box
            sx={boxStyle}
        >

            <Paper
                sx={{...paperStyle}}
            ><div>Please Select Source of the files to be sorted :
                <br/>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        row
                        value={source ? source : null}
                        onChange={(e)=>setSource(e.target.value)}
                    >
                        <FormControlLabel value="mobileAndroid" control={<Radio />} label="Mobile Android" />
                        <FormControlLabel value="mobileIos" control={<Radio />} label="Mobile IOS" />
                        <FormControlLabel value="cxomputer" control={<Radio />} label="Computer" />
                    </RadioGroup>
                </FormControl>          
            </div>

            </Paper>

        </Box>
    </div>
  )
}

export default CheckSource