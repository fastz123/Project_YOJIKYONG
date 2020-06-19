import React from "react";
import { Typography, Paper } from "@material-ui/core";
import Image from "material-ui-image";
import { useHistory } from "react-router-dom";

export default function Item(props) {
  const { category } = props;
  const history = useHistory();
  const onClickCategory = (event) => {
    history.push("/storelist/" + category.name);
  };
  return (
    <Paper className="MenuItem">
      <Image src={category.image} onClick={onClickCategory} />
      <Typography>{category.name}</Typography>
    </Paper>
  );
}
