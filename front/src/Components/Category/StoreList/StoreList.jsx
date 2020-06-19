import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useFetch } from "Apis/gets";
import { Box, Typography } from "@material-ui/core";
import "./style.scss";
import SliderItem from "./SliderItem";
import { ClipLoader } from "react-spinners";
import { arrayTypes } from "Utils/SliderList/loadType";

export default function StoreList(props) {
  const { loaded, posi, addr } = useFetch();
  const { category } = useParams();
  const [storeData, setStoreData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [etcData, setEtcData] = useState([]);

  useEffect(() => {
    setDataLoading(false);
    let tempData = [];
    const dataFetch = async () => {
      if (category == "기타") {
        const response = await axios.post(
          process.env.REACT_APP_PUBLIC_API_URL + "/category/etc",
          { latitude: posi.latitude, longitude: posi.longitude }
        );
        setStoreData(response.data);
        setDataLoading(true);
      } else {
        const response = await axios.post(
          process.env.REACT_APP_PUBLIC_API_URL + "/nearfranchisee/" + category,
          { latitude: posi.latitude, longitude: posi.longitude }
        );
        setStoreData(response.data);
        setDataLoading(true);
        tempData = response.data;
        arrayTypes(category).forEach((element) => {
          tempData = tempData.filter(
            (store) => !store.indutpye_nm.includes(element)
          );
        });
        setEtcData(tempData);
      }
    };

    if (!loaded) {
      dataFetch();
    }
  }, [loaded]);

  return (
    <Box className="StoreListPaper">
      {!dataLoading ? (
        <Box className="Loading">
          <ClipLoader />
          <Typography variant="body2" className="LoadingText">
            데이터를 불러오는 중 입니다
          </Typography>
        </Box>
      ) : (
        <>
          {category != "기타" ? (
            <>
              <Typography variant="h3" className="AddrText">
                현재 위치는 {addr} 입니다
              </Typography>
              <Typography variant="h3" className="AddrText">
                반경 1 KM 내의 {category} 관련 서비스 목록입니다
              </Typography>
              {arrayTypes(category).map((type, index) => (
                <SliderItem
                  data={storeData.filter((store) =>
                    store.indutpye_nm.includes(type)
                  )}
                  title={type}
                  // key={index}
                  category={category}
                />
              ))}
              {etcData.length > 0 ? (
                <SliderItem data={etcData} title="기타" category={category} />
              ) : null}
            </>
          ) : (
            <SliderItem data={storeData} category={category} title="기타" />
          )}
        </>
      )}
    </Box>
  );
}
