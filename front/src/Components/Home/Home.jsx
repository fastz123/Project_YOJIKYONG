import React from "react";
import { Box, Typography, Button, Paper } from "@material-ui/core";
import "./Style.scss";
import ViewListIcon from "@material-ui/icons/ViewList";
import ExploreIcon from "@material-ui/icons/Explore";

export default function Home(props) {
  
  
  return (
    <Box className="Home">
      <Paper className="SelectPaper" onClick={()=> props.history.push("/main")}>
        <ExploreIcon className="HomeIcon" />
        <Box className="Blank"></Box>
        <Typography variant="h3">주소, 현재 위치</Typography>
        <Typography variant="h3">지도 기반</Typography>
      </Paper>
      
      <Paper className="SelectPaper" onClick={()=> props.history.push("/category/list")}>
        <ViewListIcon  className="HomeIcon"/>
        <Box className="Blank"></Box>
        <Typography variant="h3">카테고리</Typography>
        <Typography variant="h3">목록 기반</Typography>
      </Paper>
    </Box>
  );
}
