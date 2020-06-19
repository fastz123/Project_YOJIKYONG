import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { Paper, Typography, Box, Divider, Modal } from "@material-ui/core";
import { useEffect } from "react";
import axios from "axios";

export default function StoreDetail(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { store } = props;
  const [open, setOpen] = useState(false);
  const [similarStore, setSimilarStore] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const dataFetch = async () => {
      let response = await axios.get(
        process.env.REACT_APP_PUBLIC_API_URL + "/storeinfos/" + store.id
      );
      if (response.data == "") {
        setData({ store: store });
      } else {
        setData(response.data);
      }
      setLoading(false);
    };
    dataFetch();
  }, []);
  const handleOpen = async (event) => {
    setLoading(true);
    if (similarStore.length == 0) {
      let response = await axios.get(
        process.env.REACT_APP_PUBLIC_API_URL + "/similarstore/" + store.id
      );
      setSimilarStore(response.data);
      setLoading(false);
      setOpen(!open);
    } else {
      setLoading(false);
      setOpen(!open);
    }
  };

  return loading ? (
    <div className="ModalBox">
      <ClipLoader />
    </div>
  ) : (
    <Paper className="ModalBox">
      <Box className="TitleBox">
        <Typography variant="h4">{data.store.cmpnm_nm}</Typography>
      </Box>
      <Divider />
      <Box className="ContentBox">
        <Typography variant="body1" className="additionalInfo">
          주&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;소 :{" "}
          {data.store.refine_roadnm_addr}
          <a
            href={
              "https://map.kakao.com/link/to/" +
              data.store.cmpnm_nm +
              "," +
              data.store.refine_wgs84_lat +
              "," +
              data.store.refine_wgs84_logt
            }
          >
            [길찾기]
          </a>
        </Typography>
        <Typography variant="body1" className="additionalInfo">
          전화번호 : {data.store.telno}
        </Typography>
        <Typography variant="body1" className="additionalInfo">
          업&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;종 :{" "}
          {data.store.indutpye_nm}
        </Typography>
      </Box>
      <Box justifyContent="center" display="flex">
        {data.hashtag != null ||
        data.information != null ||
        data.menus != null ||
        data.octime != null ? (
          <Typography variant="caption" onClick={handleOpen}>
            {open ? "접기" : "펼치기"}
          </Typography>
        ) : null}
      </Box>
      {open ? (
        <Box display="flex" flexDirection="column">
          <Typography variant="caption" className="additionalInfo">
            {data.hashtag}
          </Typography>
          <Typography variant="caption" className="additionalInfo">
            {data.information}
          </Typography>
          <Typography variant="caption" className="additionalInfo">
            {data.menus}
          </Typography>
          <Typography variant="caption" className="additionalInfo">
            {data.octime}
          </Typography>
          {similarStore.map((store, index) =>
            index < 10 ? <Typography variant="caption" onClick={()=>{
              setDetailData(store);
              setModalOpen(true);
            }}
            >{store.cmpnm_nm} </Typography> : null
          )}
          <Modal
        open={modalOpen}
        onClose={()=>setModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <StoreDetail store={detailData} />
      </Modal>
        </Box>
        
      ) : null}
    </Paper>
  );
}
