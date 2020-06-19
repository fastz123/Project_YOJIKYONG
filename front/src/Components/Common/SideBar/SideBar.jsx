import React from "react";
import {
  ListItem,
  ListItemText,
  List,
  SwipeableDrawer,
} from "@material-ui/core";
import "./style.scss"
import { useHistory } from "react-router-dom";
export default function SideBar(props) {
  const { open, setOpen } = props;
  const history = useHistory();
  const closeEvent = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(false);
  };
  const list = () => (
    <div className="SideBar" >
      <List className="MenuName">
        <ListItem button>
          <ListItemText>홈</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText>리뷰</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemText onClick={()=>{
            setOpen(false);
            history.push("/report")
          }}>신고</ListItemText>
        </ListItem>
      </List>
    </div>
  );
  return (
    <SwipeableDrawer
      open={open}
      onClose={closeEvent}
      onOpen={(event) => {
        return;
      }}
      
    >
      {list()}
    </SwipeableDrawer>
  );
}
