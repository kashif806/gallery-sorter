import React,{useState,useEffect, useRef} from 'react'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import boxStyle from '../Styles/BoxStyle';
import paperStyle from '../Styles/PaperStyle';
import getApi from '../../api/api';


function Welcome({ready,setReady}) {

    let connectionInterval = useRef(null);
    const [attempts, setAttempts] = useState(0);
    useEffect(()=>{

        clearInterval(connectionInterval.current);
        if(!ready){
            connectionInterval.current = setInterval(async ()=>{
              let connectionAttempt = await getApi('checkConnection');

              connectionAttempt === true ? setReady(true) : setAttempts((attempt)=>attempt+1);
        },3000);
        }
        
    },[ready,setReady]);

  return (
    <div>
        <Box
            sx={boxStyle}
        >
            <Paper
                sx={{...paperStyle,justifyContent:"center"}}
            >Welcome to the Gallery Sorter App</Paper>
            <Paper
                sx={{...paperStyle}}
            ><div>{ready  ? 'Connection Established'  : `Trying to connect to the application server ... ${attempts ? attempts + ' attempts failed' :  '' }`}</div>
            </Paper>

        </Box>
    </div>
  )
}

export default Welcome