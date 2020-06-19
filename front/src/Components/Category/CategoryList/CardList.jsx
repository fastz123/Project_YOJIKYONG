import React from "react";
import Item from "./Item";
import { Box, Grid } from "@material-ui/core";
import food from "img/음식.png";
import conv from "img/편의점.png";
import leisure from "img/레저.png"
import hospital from "img/문화.png";
import trip from "img/술집.png";
import gas from "img/주유소.png"
import academy from "img/학원.png"
import etc from "img/기타.png"
import clothes from "img/옷.png"
import health from "img/보건위생.png"
import lodge from "img/숙박.png"

export default function CardList(props) {
  const categories = [
    { id: 0, name: "음식", image: food },
    { id: 1, name: "편 의 점", image: conv },
    { id: 2, name: "레저", image: leisure },
    { id: 3, name: "병원", image: hospital },
    { id: 4, name: "학원", image: academy },
    { id: 5, name: "주유소", image: gas },
    { id: 6, name: "보건위생", image: health },
    { id: 7, name: "숙박", image: lodge },
    { id: 8, name: "의류", image :clothes },
    { id: 9, name: "여행", image: trip },
    { id: 10, name: "기타", image :etc },
    
  ];
  return (
    <Box className="CardList">
      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid xs={3} style={{ textAlign: "center" }}>
            <Item key={index} category={category} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}