import React, { useState } from "react";
import Slider from "react-slick";
import { Typography, Paper, Modal } from "@material-ui/core";
import { makeImageURL } from "Utils/SliderList/makeImageURL";
import StoreDetail from "./StoreDetail";
import Image from "material-ui-image";

export default function SliderItem(props) {
  const { data, title, category } = props;
  const [open, setOpen] = useState(false);
  const [detailStore, setDetailStore] = useState("");
  const settings = {
    infinite: data.length > 6 ? true : false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: data.length > 70 ? 3 : data.length < 10 ? 1 : 2,
    lazyLoad: true,
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="SliderItem">
      <Typography variant="h3" align="left">
        {title} (검색결과 : {data.length}건)
      </Typography>
      <Slider {...settings}>
        {data.map((store, index) => (
          <div
            key={index}
            style={{ width: "8vw" }}
            onClick={(event) => {
              setDetailStore(store);
              setOpen(true);
            }}
          >
            <Paper
              className="ImagePaper"
              children={
                <Image
                  src={makeImageURL(category, title)}
                  imageStyle={{ width: "10vw", height: "8vw" }}
                  style={{padding : 0}}
                />
              }
              
            />
            <Paper className="TextPaper">
              <Typography variant="body1">{store.cmpnm_nm}</Typography>
            </Paper>
          </div>
        ))}
      </Slider>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <StoreDetail store={detailStore} />
      </Modal>
    </div>
  );
}
