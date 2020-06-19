import React from "react";
import { AppBar, Toolbar, Box } from "@material-ui/core";
import "./style.scss";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

export default function Header(props) {
  const history = useHistory();
  const onClickLogo = () => {
    history.push("/");
  };
  const onClickBack = () =>{
    history.goBack();
  }
  return (
    <div className="Header">
      <AppBar position="static">
        <Toolbar>
         <Box
         style={{flexGrow:1}}
         >

            <img
              src="/coin.png"
              className="Image"
              alt="logo"
              onClick={onClickLogo}
            />
         </Box>
         
          <IconButton edge="end" color="inherit" className="BackIcon" onClick={onClickBack}>
            <ArrowBackIcon fontSize="large"/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
