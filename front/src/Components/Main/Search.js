import React from "react";
import { Box ,Typography} from "@material-ui/core";
import { ClipLoader } from "react-spinners";
import Map from 'Components/Map/map'

export default  function Main(props) {
  return (
    <Box width={1}>
      {props.loading ? (
        <ClipLoader />
      ) : (
        <Box width={1} >
        {/* {props.data !== undefined && (<Map data = {props.data} address={props.address}></Map>)} */}
        <Map data = {props.data} address={props.address} posi={props.posi}></Map>
        <Typography>{props.address}</Typography>
      </Box>
      )}
    </Box>
  );
}
